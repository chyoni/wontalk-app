import React, { useState } from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { useQuery, useMutation } from "react-apollo-hooks";
import { SEE_ME, EDIT_USER } from "../../Queries";
import { seeMe, editUser, editUserVariables } from "../../types/api";
import Loader from "../../Components/Loader";
import constants from "../../../constants";
import Avatar from "../../Components/Avatar";
import Theme from "../../../Theme";
import TextInput from "../../Components/TextInput";
import useInput from "../../Hooks/useInput";
import Button from "../../Components/Button";
import { Alert } from "react-native";
import { API_KEY } from "../../../secret";
import axios from "axios";

const Container = styled.View`
  flex: 1;
`;
const Header = styled.View`
  padding: 0 15px;
  width: ${constants.width};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Body = styled.View`
  flex: 1;
  margin-top: 10px;
  width: ${constants.width};
  align-items: center;
  padding: 15px 0;
  background-color: ${Theme.yellowColor};
`;
const Horizontal = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 15px;
`;
const ConstantText = styled.Text`
  font-size: 20px;
  color: ${Theme.blackColor};
`;
const Footer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Setting: React.SFC<IProps> = ({ navigation }) => {
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>(null);
  const { data, loading } = useQuery<seeMe, null>(SEE_ME);
  const editUser = useMutation<editUser, editUserVariables>(EDIT_USER, {
    refetchQueries: () => [{ query: SEE_ME }]
  });
  const bio = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");

  const pickImage = async () => {
    let pickImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true
    });
    if (!pickImage.cancelled) {
      setSelected(pickImage);
    }
  };

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        pickImage();
      }
    } catch (e) {
      Alert.alert(e.message);
      console.log(e);
    }
  };
  const onClickEdit = async () => {
    if (data === undefined) {
      Alert.alert("잠시후 다시시도해 주세요 🙄");
      return;
    }
    try {
      setLoadingState(true);
      const [editFn, { loading: editLoading }] = editUser;
      if (selected === null) {
        const { data: editData } = await editFn({
          variables: {
            username: data.seeMe.username,
            firstName: firstName.value,
            lastName: lastName.value,
            bio: bio.value
          }
        });
        if (!editLoading && editData && editData.editUser) {
          if (editData.editUser.ok) {
            Alert.alert("수정이 완료되었어요 😍");
            setTimeout(() => {
              navigation.navigate("Friends");
            }, 1500);
          } else {
            Alert.alert(editData.editUser.error!);
          }
        } else {
          Alert.alert("알수없는 오류입니다 😰");
        }
      } else {
        const formData = new FormData();
        formData.append("file", {
          uri: selected.uri,
          type: selected.type,
          name: selected.uri
        } as any);
        formData.append("timestamp", ((Date.now() / 1000) | 0).toString());
        formData.append("api_key", API_KEY);
        formData.append("upload_preset", "bojlyeke");

        try {
          const {
            data: { secure_url }
          } = await axios.post(
            "https://api.cloudinary.com/v1_1/dctekasfv/image/upload",
            formData,
            {
              headers: {
                "content-type": "multipart/form-data"
              }
            }
          );
          if (secure_url) {
            const { data: editData } = await editFn({
              variables: {
                username: data.seeMe.username,
                avatar: secure_url,
                firstName: firstName.value,
                lastName: lastName.value,
                bio: bio.value
              }
            });
            if (!editLoading && editData && editData.editUser) {
              if (editData.editUser.ok) {
                Alert.alert("수정이 완료되었어요 😍");
                setTimeout(() => {
                  navigation.navigate("Friends");
                }, 1500);
              } else {
                Alert.alert(editData.editUser.error!);
              }
            } else {
              Alert.alert("알수없는 오류에요 😥");
            }
          } else {
            Alert.alert("secure_url error");
          }
        } catch (e) {
          Alert.alert(e.message);
          console.log(e);
        }
      }
    } catch (e) {
      Alert.alert(e);
      console.log(e);
    } finally {
      setLoadingState(false);
    }
  };

  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.seeMe) {
    const me = data.seeMe;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior={"padding"}>
          <Container>
            <Header>
              <TouchableOpacity onPress={askPermission}>
                <Avatar
                  width={"130px"}
                  radius={"50px"}
                  uri={selected !== null ? selected.uri : me.avatar}
                />
              </TouchableOpacity>
            </Header>
            <Body>
              <Horizontal>
                <ConstantText>{me.username}</ConstantText>
              </Horizontal>
              <Horizontal>
                <TextInput
                  width={constants.width - 60}
                  placeholder={me.bio ? me.bio : "상태 메세지"}
                  placeholderTextColor={Theme.blackColor}
                  value={bio.value}
                  onChangeText={bio.onChangeText}
                />
              </Horizontal>
              <Horizontal>
                <TextInput
                  width={constants.width - 60}
                  placeholder={me.firstName ? me.firstName : "성"}
                  placeholderTextColor={Theme.blackColor}
                  value={firstName.value}
                  onChangeText={firstName.onChangeText}
                />
              </Horizontal>
              <Horizontal>
                <TextInput
                  width={constants.width - 60}
                  placeholder={me.lastName ? me.lastName : "이름"}
                  placeholderTextColor={Theme.blackColor}
                  value={lastName.value}
                  onChangeText={lastName.onChangeText}
                />
              </Horizontal>
              <Footer>
                <TouchableOpacity onPress={onClickEdit}>
                  <Button
                    text={"완료"}
                    color={Theme.brownColor}
                    width={"80px"}
                    loading={loadingState}
                  />
                </TouchableOpacity>
              </Footer>
            </Body>
          </Container>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  } else {
    return null;
  }
};

export default Setting;
