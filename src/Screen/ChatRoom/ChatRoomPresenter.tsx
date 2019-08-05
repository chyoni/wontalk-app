import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import {
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert
} from "react-native";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import { SEE_ROOM, SEND_MESSAGE, NEW_MESSAGE } from "../../Queries";
import {
  seeRoom,
  seeRoomVariables,
  sendMessage,
  sendMessageVariables,
  newMessage,
  newMessageVariables
} from "../../types/api";
import Loader from "../../Components/Loader";
import Theme from "../../../Theme";
import useInput from "../../Hooks/useInput";
import constants from "../../../constants";
import { AntDesign } from "@expo/vector-icons";
import Avatar from "../../Components/Avatar";

const SendContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  border-top-color: ${Theme.borderColor};
  border-top-width: 1px;
`;
const MessageHorizontal = styled<any>(View)`
  display: flex;
  flex-direction: ${props => (props.me ? "row-reverse" : "row")};
  margin-bottom: 15px;
`;
const TextBox = styled<any>(View)`
  background-color: ${props =>
    props.me ? Theme.greenColor : Theme.whiteColor};
  display: flex;
  justify-content: center;
  border-radius: 15px;
  margin-left: ${props => (props.me ? "0" : "10px")};
  margin-right: ${props => (props.me ? "10px" : "0")};
  padding: 2px 15px;
`;
const Text = styled.Text`
  font-size: 13px;
  color: ${Theme.blackColor};
`;
const Created = styled.Text`
  font-size: 10px;
  color: ${Theme.darkGreyColor};
  align-self: flex-end;
  margin: 0 8px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const ChatRoom: React.SFC<IProps> = ({ navigation }) => {
  const roomId = navigation.getParam("roomId");
  const to = navigation.getParam("to");
  const message = useInput("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data, loading: seeRoomLoading } = useQuery<seeRoom, seeRoomVariables>(
    SEE_ROOM,
    {
      variables: { roomId }
    }
  );
  const sendMessage = useMutation<sendMessage, sendMessageVariables>(
    SEND_MESSAGE,
    {
      variables: { roomId, text: message.value }
    }
  );
  const { data: subData } = useSubscription<newMessage, newMessageVariables>(
    NEW_MESSAGE,
    {
      variables: { roomId }
    }
  );
  const [prevMessages, setPrevMessages] = useState<any>(
    data!.seeRoom.room!.messages || []
  );
  const handleNewMessage = () => {
    if (subData !== undefined) {
      const { newMessage } = subData;
      setPrevMessages(previous => [...previous, newMessage]);
    }
  };
  const onClickSend = async () => {
    try {
      setLoading(true);
      const [sendMessageFn, { loading: mutationLoading }] = sendMessage;
      const { data } = await sendMessageFn();
      if (!mutationLoading && data && data.sendMessage) {
        if (data.sendMessage.ok) {
          message.setValue("");
        } else {
          Alert.alert(data.sendMessage.error!);
        }
      } else {
        Alert.alert("알수없는 오류입니다 😥");
      }
    } catch (e) {
      Alert.alert(e);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleNewMessage();
  }, [subData]);
  if (seeRoomLoading) {
    return <Loader />;
  } else if (!seeRoomLoading && data && data.seeRoom && data.seeRoom.room) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"padding"}
          keyboardVerticalOffset={80}
          enabled
        >
          <ScrollView
            style={{
              flex: 1,
              padding: 15,
              backgroundColor: Theme.yellowColor
            }}
          >
            {prevMessages.map(m => (
              <MessageHorizontal
                key={m.id}
                me={m.user.username !== to ? true : false}
              >
                <Avatar width={"40px"} radius={"16px"} uri={m.user.avatar} />
                <TextBox me={m.user.username !== to ? true : false}>
                  <Text>{m.text}</Text>
                </TextBox>
                <Created>{m.createdDate}</Created>
              </MessageHorizontal>
            ))}
          </ScrollView>

          <SendContainer>
            <TextInput
              style={{
                width: constants.width - 40,
                backgroundColor: Theme.whiteColor,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 20,
                borderColor: Theme.borderColor,
                borderWidth: 1,
                marginRight: 2
              }}
              placeholder={"메시지"}
              value={message.value}
              onChangeText={message.onChangeText}
              multiline
            />
            <TouchableOpacity
              disabled={message.value === "" ? true : false}
              style={{ opacity: message.value === "" ? 0.3 : 1 }}
              onPress={onClickSend}
            >
              {loading ? (
                <ActivityIndicator
                  color={"black"}
                  size={"small"}
                  style={{ marginLeft: 5 }}
                />
              ) : (
                <AntDesign
                  name={"upcircle"}
                  size={30}
                  color={Theme.yellowColor}
                />
              )}
            </TouchableOpacity>
          </SendContainer>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  } else {
    return null;
  }
};

export default ChatRoom;
