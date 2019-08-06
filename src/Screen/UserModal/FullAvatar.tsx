import React from "react";
import { ImageBackground, View } from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { useQuery } from "react-apollo-hooks";
import { SEE_USER } from "../../Queries";
import { seeUser, seeUserVariables } from "../../types/api";
import Loader from "../../Components/Loader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import Theme from "../../../Theme";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const FullAvatar: React.SFC<IProps> = ({ navigation }) => {
  const username = navigation.getParam("username");
  const { data, loading } = useQuery<seeUser, seeUserVariables>(SEE_USER, {
    variables: { username }
  });
  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.seeUser.user) {
    const user = data.seeUser.user;
    return (
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={{ uri: user.avatar! }}
        resizeMode={"contain"}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              display: "flex",
              padding: 20,
              marginTop: 15
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <EvilIcons name={"close"} color={Theme.blackColor} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  } else {
    return null;
  }
};

export default FullAvatar;
