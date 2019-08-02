import React, { useState } from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert
} from "react-native";
import styled from "styled-components/native";
import Theme from "../../../Theme";
import constants from "../../../constants";
import { AntDesign } from "@expo/vector-icons";
import useInput from "../../Hooks/useInput";
import TextInput from "../../Components/TextInput";
import Button from "../../Components/Button";
import { useMutation } from "react-apollo-hooks";
import { CREATE_USER } from "../../Queries";
import { createUser, createUserVariables } from "../../types/api";

const Container = styled.View`
  background-color: ${Theme.yellowColor};
  flex: 1;
  padding: 20px;
`;
const LogoView = styled.View`
  width: ${constants.width - 40};
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;
const LogoText = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: ${Theme.brownColor};
  margin-left: 10px;
`;
const BodyView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const TextColumn = styled.View`
  width: ${constants.width - 40};
  margin-bottom: 10px;
`;
const ButtonColumn = styled.View`
  width: ${constants.width - 40};
  margin-top: 15px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const SignUp: React.SFC<IProps> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const email = useInput("");
  const username = useInput("");
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const createUser = useMutation<createUser, createUserVariables>(CREATE_USER, {
    variables: {
      email: email.value,
      username: username.value
    }
  });
  const onClickSignUp = async () => {
    if (email.value === "" || username.value === "") {
      Alert.alert("이메일과 닉네임은 필수사항이에요 😯");
      return;
    } else if (!emailRegex.test(email.value)) {
      Alert.alert("이메일 형식을 다시 확인해주세요 😯");
      return;
    }
    try {
      setLoading(true);
      const [createUserFn, { loading: mutationLoading }] = createUser;
      const { data } = await createUserFn();
      if (!mutationLoading && data && data.createUser) {
        if (data.createUser.ok) {
          Alert.alert("회원가입이 성공적으로 완료되었어요 😍");
          email.setValue("");
          username.setValue("");
          navigation.navigate("LogIn");
        } else {
          Alert.alert(data.createUser.error!);
        }
      } else {
        Alert.alert("알수없는 오류에요 😰");
      }
    } catch (e) {
      console.log(e);
      Alert.alert(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior={"height"}>
        <Container>
          <LogoView>
            <AntDesign name={"message1"} size={35} color={Theme.brownColor} />
            <LogoText>WonTalk</LogoText>
          </LogoView>
          <BodyView>
            <TextColumn>
              <TextInput
                placeholder={"이메일(Email)"}
                value={email.value}
                onChangeText={email.onChangeText}
                width={constants.width - 40}
                returnKeyType={"done"}
              />
            </TextColumn>
            <TextColumn>
              <TextInput
                placeholder={"닉네임(Username)"}
                value={username.value}
                onChangeText={username.onChangeText}
                width={constants.width - 40}
                returnKeyType={"done"}
              />
            </TextColumn>
            <ButtonColumn>
              <TouchableOpacity onPress={onClickSignUp}>
                <Button
                  text={"회원가입"}
                  color={Theme.brownColor}
                  width={constants.width - 40}
                  loading={loading}
                />
              </TouchableOpacity>
            </ButtonColumn>
          </BodyView>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
