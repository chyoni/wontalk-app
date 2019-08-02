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
import { CONFIRM_SECRET } from "../../Queries";
import { confirmSecret, confirmSecretVariables } from "../../types/api";
import { useLogIn } from "../../../AuthContext";

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
const Confirm: React.SFC<IProps> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const secret = useInput("");
  const logIn = useLogIn();
  const confirmSecret = useMutation<confirmSecret, confirmSecretVariables>(
    CONFIRM_SECRET,
    {
      variables: {
        email: navigation.getParam("email"),
        secret: secret.value
      }
    }
  );
  const onClickLogIn = async () => {
    if (secret.value === "" || !secret.value.includes(" ")) {
      Alert.alert("시크릿키를 다시 확인해주세요 😰");
      return;
    }
    try {
      setLoading(true);
      const [confirmFn, { loading: mutationLoading }] = confirmSecret;
      const { data } = await confirmFn();
      if (!mutationLoading && data && data.confirmSecret) {
        if (data.confirmSecret.ok && data.confirmSecret.token) {
          logIn(data.confirmSecret.token);
        } else {
          Alert.alert(data.confirmSecret.error!);
        }
      } else {
        Alert.alert("알수 없는 오류에요 😰");
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
              placeholder={"시크릿키(Secret Key)"}
              value={secret.value}
              onChangeText={secret.onChangeText}
              width={constants.width - 40}
              returnKeyType={"done"}
            />
            <ButtonColumn>
              <TouchableOpacity onPress={onClickLogIn}>
                <Button
                  text={"로그인"}
                  color={Theme.greenColor}
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

export default Confirm;
