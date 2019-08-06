import { createStackNavigator, createAppContainer } from "react-navigation";
import MainNavigation from "./MainNavigation";
import Modal from "../Screen/UserModal/Modal";
import FullAvatar from "../Screen/UserModal/FullAvatar";

const RootNavigation = createStackNavigator(
  {
    Main: {
      screen: MainNavigation
    },
    Modal: {
      screen: Modal
    },
    FullAvatar: {
      screen: FullAvatar
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default createAppContainer(RootNavigation);
