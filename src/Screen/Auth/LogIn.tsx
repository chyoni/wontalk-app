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
import { REQUEST_SECRET } from "../../Queries";
import { requestSecret, requestSecretVariables } from "../../types/api";

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
const ButtonColumn = styled.View`
  width: ${constants.width - 40};
  margin-top: 15px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const LogIn: React.SFC<IProps> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const email = useInput("");
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const requestSecret = useMutation<requestSecret, requestSecretVariables>(
    REQUEST_SECRET,
    {
      variables: {
        email: email.value
      }
    }
  );
  const onClickRequestSecret = async () => {
    if (email.value === "" || !emailRegex.test(email.value)) {
      Alert.alert("이메일을 확인해주세요 😅");
      return;
    }
    try {
      setLoading(true);
      const [requestFn, { loading: mutationLoading }] = requestSecret;
      const { data } = await requestFn();
      if (!mutationLoading && data && data.requestSecret) {
        if (data.requestSecret.ok) {
          Alert.alert("시크릿 키를 보냈어요😊", "이메일을 확인하세요 😊");
          navigation.navigate("Confirm", { email: email.value });
        } else {
          Alert.alert(data.requestSecret.error!);
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
            <TextInput
              placeholder={"이메일(Email)"}
              value={email.value}
              onChangeText={email.onChangeText}
              width={constants.width - 40}
              returnKeyType={"done"}
            />
            <ButtonColumn>
              <TouchableOpacity onPress={onClickRequestSecret}>
                <Button
                  text={"시크릿 키 요청"}
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

export default LogIn;
