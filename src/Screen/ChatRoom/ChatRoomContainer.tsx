import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import ChatRoomPresenter from "./ChatRoomPresenter";
import { AntDesign } from "@expo/vector-icons";
import Theme from "../../../Theme";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    return <ChatRoomPresenter navigation={navigation} />;
  }
}

export default ChatRoomContainer;
