import { createStackNavigator } from "react-navigation";
import ChatRoom from "../Screen/ChatRoom";
import Theme from "../../Theme";

const ChatNavigation = createStackNavigator({
  ChatRoom: {
    screen: ChatRoom,
    navigationOptions: {
      headerStyle: {
        height: 55,
        backgroundColor: Theme.yellowColor
      }
    }
  }
});

export default ChatNavigation;
