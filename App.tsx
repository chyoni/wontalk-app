import React, { useEffect, useState } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Operation, split, concat } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { persistCache } from "apollo-cache-persist";
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  EvilIcons
} from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "react-apollo-hooks";
import { AuthProvider } from "./AuthContext";
import NavigationController from "./src/NavigationRouter/NavigationController";

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [clientReady, setClientReady] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<any>(null);
  const preLoad = async () => {
    await Font.loadAsync({
      ...Ionicons.font,
      ...AntDesign.font,
      ...Feather.font,
      ...MaterialCommunityIcons.font,
      ...EvilIcons.font
    });
    await Asset.loadAsync([require("./assets/noPhoto.jpg")]);
    const cache = new InMemoryCache();
    await persistCache({
      cache,
      storage: AsyncStorage
    });
    const token = await AsyncStorage.getItem("jwt");

    const authMiddleware = new ApolloLink(
      (operation: Operation, forward: any) => {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return forward(operation);
      }
    );
    const httpLink = new HttpLink({
      uri: "http://192.168.219.101:4000/graphql"
    });
    const wsLink = new WebSocketLink({
      options: {
        reconnect: true
      },
      uri: `ws://192.168.219.101:4000`
    });
    const combinedLinks = split(
      ({ query }) => {
        const { kind, operation }: any = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httpLink
    );
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    });
    const client = new ApolloClient({
      link: ApolloLink.from([errorLink, concat(authMiddleware, combinedLinks)]),
      cache
    });
    const isLoggedInCheck = await AsyncStorage.getItem("isLoggedIn");
    if (isLoggedInCheck === null || isLoggedInCheck === "false") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
    setClientReady(client);
    setLoaded(true);
  };

  useEffect(() => {
    preLoad();
  }, []);

  if (loaded && clientReady && isLoggedIn !== null) {
    return (
      <ApolloProvider client={clientReady}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavigationController />
        </AuthProvider>
      </ApolloProvider>
    );
  } else {
    return <AppLoading />;
  }
}
