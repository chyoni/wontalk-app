import { createAppContainer, createStackNavigator } from "react-navigation";
import AuthHome from "../Screen/Auth/AuthHome";
import LogIn from "../Screen/Auth/LogIn";
import SignUp from "../Screen/Auth/SignUp";
import Confirm from "../Screen/Auth/Confirm";
const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    LogIn,
    SignUp,
    Confirm
  },
  {
    headerMode: "none",
    mode: "card"
  }
);

export default createAppContainer(AuthNavigation);
