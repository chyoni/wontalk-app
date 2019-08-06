import React, { useEffect } from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { ScrollView } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { SEE_ME } from "../../Queries";
import Loader from "../../Components/Loader";
import styled from "styled-components/native";
import { seeMe } from "../../types/api";
import Theme from "../../../Theme";
import Avatar from "../../Components/Avatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../../constants";

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

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Friends: React.SFC<IProps> = ({ navigation }) => {
  const { data, loading, refetch } = useQuery<seeMe, null>(SEE_ME);
  useEffect(() => {
    refetch();
  }, []);
  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.seeMe) {
    const me = data.seeMe;
    return (
      <ScrollView>
        <Container>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Modal", { username: me.username })
            }
          >
            <My>
              <Avatar uri={me.avatar} width={"70px"} radius={"25px"} />
              <Info>
                <MyName>{me.username}</MyName>
                <MyBio>{me.bio}</MyBio>
              </Info>
            </My>
          </TouchableOpacity>
          <FriendLabel>{`친구 ${me.friends.length}`}</FriendLabel>
          {me.friends.map(fr => (
            <TouchableOpacity
              key={fr.id}
              onPress={() =>
                navigation.navigate("Modal", { username: fr.username })
              }
            >
              <Column>
                <Avatar uri={fr.avatar} width={"45px"} radius={"18px"} />
                <Info>
                  <Name>{fr.username}</Name>
                  <Bio>{fr.bio}</Bio>
                </Info>
              </Column>
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
