import React, { useState } from "react";
import styled from "styled-components/native";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
  Modal,
  ImageBackground
} from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";
import constants from "../../../constants";
import Theme from "../../../Theme";
import TextInput from "../../Components/TextInput";
import { useQuery, useMutation } from "react-apollo-hooks";
import { SEARCH, CREATE_ROOM, ADD_FRIEND, SEE_ME } from "../../Queries";
import {
  searchUser,
  searchUserVariables,
  createRoom,
  createRoomVariables,
  addFriend,
  addFriendVariables
} from "../../types/api";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import { Ionicons, EvilIcons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
`;
const SearchContainer = styled.View`
  width: ${constants.width};
  background-color: ${Theme.yellowColor};
  border-bottom-color: ${Theme.borderColor};
  border-bottom-width: 1px;
  padding: 10px;
`;
const ScrollContainer = styled.View`
  flex: 1;
  padding: 10px;
  min-height: ${constants.height / 2};
`;
const UserCard = styled.View`
  display: flex;
  flex-direction: row;
  width: ${constants.width - 20};
  margin-bottom: 15px;
`;
const InfoColumn = styled.View`
  display: flex;
  margin-left: 20px;
  justify-content: center;
`;
const Username = styled.Text`
  color: ${Theme.blackColor};
  font-size: 17px;
  font-weight: 600;
`;
const Bio = styled.Text`
  color: ${Theme.darkGreyColor};
  font-size: 15px;
`;
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

const Search: React.SFC<IProps> = ({ navigation }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [seeModal, setSeeModal] = useState<boolean>(false);
  const createRoom = useMutation<createRoom, createRoomVariables>(CREATE_ROOM);
  const addFriend = useMutation<addFriend, addFriendVariables>(ADD_FRIEND, {
    refetchQueries: () => [
      { query: SEARCH, variables: { term: searchTerm } },
      { query: SEE_ME }
    ]
  });
  const { data, loading } = useQuery<searchUser, searchUserVariables>(SEARCH, {
    variables: { term: searchTerm },
    skip: !shouldFetch,
    fetchPolicy: "network-only"
  });
  const toggleModal = () => {
    setSeeModal(!seeModal);
  };
  const onChangeText = text => {
    setShouldFetch(false);
    setSearchTerm(text);
  };
  const onSubmitEditing = () => {
    if (searchTerm === "") {
      Alert.alert("검색어를 입력해주세요 🙄🙄");
      return;
    }
    setShouldFetch(true);
  };
  console.log(data, loading);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <SearchContainer>
          <TextInput
            width={constants.width - 20}
            placeholder={"이메일 혹은 닉네임"}
            value={searchTerm}
            onChangeText={onChangeText}
            returnKeyType={"search"}
            onSubmitEditing={onSubmitEditing}
          />
        </SearchContainer>
        <ScrollView>
          <ScrollContainer>
            {loading && <Loader />}
            {shouldFetch &&
              !loading &&
              data &&
              data.searchUser.user &&
              data.searchUser.user.map(u => {
                if (u) {
                  return (
                    <TouchableOpacity key={u.id} onPress={toggleModal}>
                      <UserCard>
                        <Avatar width={"90px"} radius={"33px"} uri={u.avatar} />
                        <InfoColumn>
                          <Username>{u.username}</Username>
                          <Bio>{u.bio}</Bio>
                        </InfoColumn>
                      </UserCard>
                      <Modal
                        animationType={"slide"}
                        visible={seeModal}
                        transparent={false}
                      >
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
                              <TouchableOpacity onPress={toggleModal}>
                                <EvilIcons
                                  name={"close"}
                                  color={Theme.whiteColor}
                                  size={40}
                                />
                              </TouchableOpacity>
                            </ModalHeader>
                            <ModalBody>
                              <ModalUserColumn>
                                <Avatar
                                  uri={u.avatar}
                                  width={"90px"}
                                  radius={"33px"}
                                />
                              </ModalUserColumn>
                              <ModalUserColumn>
                                <ModalUserName>{u.username}</ModalUserName>
                              </ModalUserColumn>
                              {u.bio && (
                                <ModalUserColumn>
                                  <ModalUserBio>{u.bio}</ModalUserBio>
                                </ModalUserColumn>
                              )}
                            </ModalBody>
                            <ModalFooter>
                              {u.isFriends && (
                                <>
                                  <TouchableOpacity
                                    onPress={async () => {
                                      const [
                                        createRoomFn,
                                        { loading: mutationLoading }
                                      ] = createRoom;
                                      try {
                                        const { data } = await createRoomFn({
                                          variables: {
                                            you: [u.id]
                                          }
                                        });
                                        if (
                                          !mutationLoading &&
                                          data &&
                                          data.createRoom
                                        ) {
                                          if (data.createRoom.ok) {
                                            await setSeeModal(false);
                                            navigation.navigate("ChatRoom", {
                                              roomId: data.createRoom.room!.id,
                                              to: u.username
                                            });
                                          } else {
                                            Alert.alert(data.createRoom.error!);
                                          }
                                        } else {
                                          Alert.alert("알수없는 오류입니다 😰");
                                        }
                                      } catch (e) {
                                        Alert.alert(e.message);
                                      }
                                    }}
                                  >
                                    <Ionicons
                                      name={"ios-chatbubbles"}
                                      size={40}
                                      color={Theme.whiteColor}
                                    />
                                  </TouchableOpacity>
                                  <Label>1:1 채팅하기</Label>
                                </>
                              )}
                              {!u.isFriends && (
                                <>
                                  <TouchableOpacity
                                    onPress={async () => {
                                      const [
                                        addFriendFn,
                                        { loading: mutationLoading }
                                      ] = addFriend;
                                      try {
                                        const { data } = await addFriendFn({
                                          variables: {
                                            friendId: u.id
                                          }
                                        });
                                        if (
                                          !mutationLoading &&
                                          data &&
                                          data.addFriend
                                        ) {
                                          if (data.addFriend.ok) {
                                            await setSeeModal(false);
                                            navigation.navigate("Friends");
                                          } else {
                                            Alert.alert(data.addFriend.error!);
                                          }
                                        } else {
                                          Alert.alert("알수없는 오류에요 😥");
                                        }
                                      } catch (e) {
                                        console.log(e);
                                        Alert.alert(e.message);
                                      }
                                    }}
                                  >
                                    <Ionicons
                                      name={"md-person-add"}
                                      size={40}
                                      color={Theme.whiteColor}
                                    />
                                  </TouchableOpacity>
                                  <Label>친구 추가하기</Label>
                                </>
                              )}
                            </ModalFooter>
                          </ModalView>
                        </ImageBackground>
                      </Modal>
                    </TouchableOpacity>
                  );
                } else {
                  return;
                }
              })}
          </ScrollContainer>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Search;
