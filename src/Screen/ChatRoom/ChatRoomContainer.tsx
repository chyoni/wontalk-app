import React, { Suspense } from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import ChatRoomPresenter from "./ChatRoomPresenter";
import { AntDesign } from "@expo/vector-icons";
import Theme from "../../../Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
class ChatRoomContainer extends React.Component<IProps, any> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("to"),
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Rooms")}>
        <AntDesign name={"left"} size={25} color={Theme.blackColor} />
      </TouchableOpacity>
    )
  });
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    const roomId = navigation.getParam("roomId");
    const to = navigation.getParam("to");
    return (
      <Suspense
        fallback={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ActivityIndicator size={"small"} color={"black"} />
          </View>
        }
      >
        <ChatRoomPresenter navigation={navigation} roomId={roomId} to={to} />
      </Suspense>
    );
  }
}

export default ChatRoomContainer;
