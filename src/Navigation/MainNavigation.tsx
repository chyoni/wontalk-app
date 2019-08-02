import { createAppContainer, createStackNavigator } from "react-navigation";
import BottomTabNavigation from "./BottomTabNavigation";

const MainNavigation = createStackNavigator(
  {
    BottomTabNavigation
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(MainNavigation);
