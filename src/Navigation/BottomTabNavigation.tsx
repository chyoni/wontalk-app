import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Friends from "../Screen/Tab/Friends";
import Chats from "../Screen/Tab/Chats";
import Search from "../Screen/Tab/Search";
import Setting from "../Screen/Tab/Setting";
import { Text } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Theme from "../../Theme";

const tabToStack = (initialRoute: React.FunctionComponent, navConfig?) =>
  createStackNavigator(
    {
      initialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...navConfig
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          height: 70,
          borderBottomColor: "#FFFFFF"
        }
      }
    }
  );
export default createBottomTabNavigator(
  {
    Friends: {
      screen: tabToStack(Friends, {
        headerLeft: () => (
          <Text style={{ fontSize: 23, paddingLeft: 20 }}>친구</Text>
        )
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={"account"}
            size={35}
            color={focused ? Theme.redColor : Theme.blackColor}
          />
        )
      }
    },
    Chats: {
      screen: tabToStack(Chats, {
        headerLeft: () => (
          <Text style={{ fontSize: 23, paddingLeft: 20 }}>채팅</Text>
        )
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={"ios-chatbubbles"}
            size={30}
            color={focused ? Theme.redColor : Theme.blackColor}
          />
        )
      }
    },
    Search: {
      screen: tabToStack(Search, {
        headerLeft: () => (
          <Text style={{ fontSize: 23, paddingLeft: 20 }}>친구 찾기</Text>
        )
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={"ios-add-circle"}
            size={30}
            color={focused ? Theme.redColor : Theme.blackColor}
          />
        )
      }
    },
    Setting: {
      screen: tabToStack(Setting, {
        headerLeft: () => (
          <Text style={{ fontSize: 23, paddingLeft: 20 }}>설정</Text>
        )
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={"ios-settings"}
            size={30}
            color={focused ? Theme.redColor : Theme.blackColor}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 55,
        paddingTop: 5
      }
    }
  }
);
