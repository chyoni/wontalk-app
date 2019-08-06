import { createStackNavigator } from "react-navigation";
import BottomTabNavigation from "./BottomTabNavigation";
import ChatNavigation from "./ChatNavigation";

const MainNavigation = createStackNavigator(
  {
    BottomTabNavigation,
    ChatNavigation
  },
  {
    headerMode: "none"
  }
);

export default MainNavigation;
