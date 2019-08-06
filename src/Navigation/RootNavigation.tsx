import { createStackNavigator, createAppContainer } from "react-navigation";
import MainNavigation from "./MainNavigation";
import Modal from "../Screen/UserModal/Modal";

const RootNavigation = createStackNavigator(
  {
    Main: {
      screen: MainNavigation
    },
    Modal: {
      screen: Modal
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default createAppContainer(RootNavigation);
