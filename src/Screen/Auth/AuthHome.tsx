import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import styled from "styled-components/native";
import Theme from "../../../Theme";
import { AntDesign } from "@expo/vector-icons";
import Button from "../../Components/Button";
import constants from "../../../constants";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.yellowColor};
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${Theme.brownColor};
`;
const Horizontal = styled.View`
  display: flex;
  width: ${constants.width};
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const AuthHome: React.SFC<IProps> = ({ navigation }) => {
  return (
    <Container>
      <AntDesign name={"message1"} size={80} color={Theme.brownColor} />
      <Text>WonTalk</Text>
      <Horizontal>
        <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
          <Button color={Theme.brownColor} width={"80px"} text={"로그인"} />
        </TouchableOpacity>
      </Horizontal>
      <Horizontal>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Button color={Theme.brownColor} width={"80px"} text={"회원가입"} />
        </TouchableOpacity>
      </Horizontal>
    </Container>
  );
};

export default AuthHome;
