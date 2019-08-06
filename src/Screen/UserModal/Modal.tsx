import React, { useState } from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  MaterialCommunityIcons,
  EvilIcons,
  Ionicons
} from "@expo/vector-icons";
import { Alert, ImageBackground, ActivityIndicator } from "react-native";
import Theme from "../../../Theme";
import Avatar from "../../Components/Avatar";
import constants from "../../../constants";
import { useQuery, useMutation } from "react-apollo-hooks";
import { SEE_USER, CREATE_ROOM, ADD_FRIEND, SEE_ME } from "../../Queries";
import {
  seeUser,
  seeUserVariables,
  createRoom,
  createRoomVariables,
  addFriend,
  addFriendVariables
} from "../../types/api";
import Loader from "../../Components/Loader";
const ModalView = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ModalHeader = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  padding: 15px;
  width: ${constants.width - 30};
`;
const ModalBody = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-top: 40px;
  padding: 15px;
  padding-bottom: 40px;
`;
const ModalUserColumn = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${constants.width - 30};
`;
const ModalUserName = styled.Text`
  font-size: 20px;
  color: ${Theme.whiteColor};
  font-weight: 600;
  margin-top: 10px;
`;
const ModalUserBio = styled.Text`
  font-size: 15px;
  color: ${Theme.whiteColor};
`;
const ModalFooter = styled.View`
  width: ${constants.width};
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100px;
  border-top-color: ${Theme.borderColor};
  border-top-width: 1px;
`;
const Label = styled.Text`
  font-size: 15px;
  color: ${Theme.whiteColor};
`;
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const Modal: React.SFC<IProps> = ({ navigation }) => {
  const username = navigation.getParam("username");
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const { data, loading } = useQuery<seeUser, seeUserVariables>(SEE_USER, {
    variables: { username }
  });
  const createRoom = useMutation<createRoom, createRoomVariables>(CREATE_ROOM, {
    refetchQueries: () => [{ query: SEE_ME }]
  });
  const addFriend = useMutation<addFriend, addFriendVariables>(ADD_FRIEND, {
    refetchQueries: () => [
      { query: SEE_USER, variables: { username } },
      { query: SEE_ME }
    ]
  });
  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.seeUser.user) {
    const user = data.seeUser.user;
    return (
      <ImageBackground
        source={require("../../../assets/puppy.jpg")}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: Theme.blackColor
        }}
      >
        <ModalView>
          <ModalHeader>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <EvilIcons name={"close"} color={Theme.whiteColor} size={40} />
            </TouchableOpacity>
          </ModalHeader>
          <ModalBody>
            <ModalUserColumn>
              <Avatar uri={user.avatar} width={"90px"} radius={"33px"} />
            </ModalUserColumn>
            <ModalUserColumn>
              <ModalUserName>{user.username}</ModalUserName>
            </ModalUserColumn>
            {user.bio && (
              <ModalUserColumn>
                <ModalUserBio>{user.bio}</ModalUserBio>
              </ModalUserColumn>
            )}
          </ModalBody>
          <ModalFooter>
            {user.isSelf ? (
              <>
                <TouchableOpacity onPress={() => Alert.alert("soon")}>
                  <MaterialCommunityIcons
                    name={"pencil"}
                    size={40}
                    color={Theme.whiteColor}
                  />
                </TouchableOpacity>
                <Label>프로필 수정</Label>
              </>
            ) : user.isFriends ? (
              <>
                <TouchableOpacity
                  onPress={async () => {
                    const [
                      createRoomFn,
                      { loading: mutationLoading }
                    ] = createRoom;
                    try {
                      setLoadingState(true);
                      const { data } = await createRoomFn({
                        variables: {
                          you: [user.id]
                        }
                      });
                      if (!mutationLoading && data && data.createRoom) {
                        if (data.createRoom.ok) {
                          navigation.navigate("ChatRoom", {
                            roomId: data.createRoom.room!.id,
                            to: user.username
                          });
                        } else {
                          Alert.alert(data.createRoom.error!);
                        }
                      } else {
                        Alert.alert("알수없는 오류입니다 😰");
                      }
                    } catch (e) {
                      Alert.alert(e.message);
                    } finally {
                      setLoadingState(false);
                    }
                  }}
                >
                  {loadingState ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                  ) : (
                    <Ionicons
                      name={"ios-chatbubbles"}
                      size={40}
                      color={Theme.whiteColor}
                    />
                  )}
                </TouchableOpacity>
                <Label>1:1 채팅하기</Label>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={async () => {
                    const [addFriendFn, { loading: addFriendLoad }] = addFriend;
                    try {
                      setLoadingState(true);
                      const { data } = await addFriendFn({
                        variables: {
                          friendId: user.id
                        }
                      });
                      if (!addFriendLoad && data && data.addFriend) {
                        if (data.addFriend.ok) {
                          return;
                        } else {
                          Alert.alert(data.addFriend.error!);
                        }
                      } else {
                        Alert.alert("알수없는 오류에요 😥");
                      }
                    } catch (e) {
                      console.log(e);
                      Alert.alert(e.message);
                    } finally {
                      setLoadingState(false);
                    }
                  }}
                >
                  {loadingState ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                  ) : (
                    <Ionicons
                      name={"md-person-add"}
                      size={40}
                      color={Theme.whiteColor}
                    />
                  )}
                </TouchableOpacity>
                <Label>친구 추가하기</Label>
              </>
            )}
          </ModalFooter>
        </ModalView>
      </ImageBackground>
    );
  } else {
    return null;
  }
};

export default Modal;
