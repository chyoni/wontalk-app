import React, { useState } from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { ScrollView, Modal, ImageBackground } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { SEE_ME } from "../../Queries";
import Loader from "../../Components/Loader";
import styled from "styled-components/native";
import { seeMe } from "../../types/api";
import Theme from "../../../Theme";
import Avatar from "../../Components/Avatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../../constants";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  EvilIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`;
const My = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${Theme.borderColor};
  border-bottom-width: 1px;
  padding-bottom: 20px;
`;
const Info = styled.View`
  display: flex;
  margin-left: 15px;
`;
const MyName = styled.Text`
  font-size: 18px;
  color: ${Theme.blackColor};
`;
const MyBio = styled.Text`
  font-size: 13px;
  color: ${Theme.darkGreyColor};
`;
const FriendLabel = styled.Text`
  font-size: 12px;
  color: ${Theme.darkGreyColor};
  margin: 10px 0;
  width: ${constants.width - 40};
`;
const Column = styled.View`
  width: ${constants.width - 40};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 15px;
`;
const Name = styled.Text`
  font-size: 15px;
  color: ${Theme.blackColor};
`;
const Bio = styled.Text`
  font-size: 13px;
  color: ${Theme.darkGreyColor};
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

const Friends: React.SFC<IProps> = ({ navigation }) => {
  const [seeYourModal, setseeYourModal] = useState<boolean>(false);
  const [seeMyModal, setSeeMyModal] = useState<boolean>(false);
  const { data, loading } = useQuery<seeMe, null>(SEE_ME);
  const toggleYourModal = () => {
    setseeYourModal(!seeYourModal);
  };
  const toggleMyModal = () => {
    setSeeMyModal(!seeMyModal);
  };
  console.log(data, loading);
  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.seeMe) {
    const me = data.seeMe;
    return (
      <ScrollView>
        <Container>
          <TouchableOpacity onPress={toggleMyModal}>
            <My>
              <Avatar uri={me.avatar} width={"70px"} radius={"25px"} />
              <Info>
                <MyName>{me.username}</MyName>
                <MyBio>{me.bio}</MyBio>
              </Info>
            </My>
            <Modal
              animationType={"slide"}
              visible={seeMyModal}
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
                    <TouchableOpacity onPress={toggleMyModal}>
                      <EvilIcons
                        name={"close"}
                        color={Theme.whiteColor}
                        size={40}
                      />
                    </TouchableOpacity>
                  </ModalHeader>
                  <ModalBody>
                    <ModalUserColumn>
                      <Avatar uri={me.avatar} width={"90px"} radius={"33px"} />
                    </ModalUserColumn>
                    <ModalUserColumn>
                      <ModalUserName>{me.username}</ModalUserName>
                    </ModalUserColumn>
                    {me.bio && (
                      <ModalUserColumn>
                        <ModalUserBio>{me.bio}</ModalUserBio>
                      </ModalUserColumn>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name={"pencil"}
                        size={40}
                        color={Theme.whiteColor}
                      />
                    </TouchableOpacity>
                    <Label>프로필 수정</Label>
                  </ModalFooter>
                </ModalView>
              </ImageBackground>
            </Modal>
          </TouchableOpacity>
          <FriendLabel>{`친구 ${me.friends.length}`}</FriendLabel>
          {me.friends.map(fr => (
            <TouchableOpacity key={fr.id} onPress={toggleYourModal}>
              <Column>
                <Avatar uri={fr.avatar} width={"45px"} radius={"18px"} />
                <Info>
                  <Name>{fr.username}</Name>
                  <Bio>{fr.bio}</Bio>
                </Info>
              </Column>
              <Modal
                animationType={"slide"}
                visible={seeYourModal}
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
                      <TouchableOpacity onPress={toggleYourModal}>
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
                          uri={fr.avatar}
                          width={"90px"}
                          radius={"33px"}
                        />
                      </ModalUserColumn>
                      <ModalUserColumn>
                        <ModalUserName>{fr.username}</ModalUserName>
                      </ModalUserColumn>
                      {fr.bio && (
                        <ModalUserColumn>
                          <ModalUserBio>{fr.bio}</ModalUserBio>
                        </ModalUserColumn>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <TouchableOpacity>
                        <Ionicons
                          name={"ios-chatbubbles"}
                          size={40}
                          color={Theme.whiteColor}
                        />
                      </TouchableOpacity>
                      <Label>1:1 채팅하기</Label>
                    </ModalFooter>
                  </ModalView>
                </ImageBackground>
              </Modal>
            </TouchableOpacity>
          ))}
        </Container>
      </ScrollView>
    );
  } else {
    return null;
  }
};

export default Friends;
