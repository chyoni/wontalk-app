import React from "react";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView
} from "react-navigation";
import { useQuery } from "react-apollo-hooks";
import { SEE_ME } from "../../Queries";
import { seeMe } from "../../types/api";
import Loader from "../../Components/Loader";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../../Components/Avatar";
import Theme from "../../../Theme";
import constants from "../../../constants";

const Container = styled.View`
  display: flex;
  padding: 0 15px;
  margin-bottom: 10px;
  flex-direction: row;
`;
const Vertical = styled.View`
  display: flex;
  margin-left: 20px;
  width: ${constants.width - 180};
  overflow: hidden;
`;
const Username = styled.Text`
  font-size: 20px;
  color: ${Theme.blackColor};
`;
const PrevMessage = styled.Text`
  font-size: 15px;
  margin-top: 5px;
  color: ${Theme.darkGreyColor};
`;
const CreateView = styled.View`
  display: flex;
  justify-content: center;
`;
const Created = styled.Text`
  font-size: 13px;
  color: ${Theme.darkGreyColor};
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Rooms: React.SFC<IProps> = ({ navigation }) => {
  const { data, loading } = useQuery<seeMe, null>(SEE_ME);
  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.seeMe) {
    const rooms = data.seeMe.room;
    const myName = data.seeMe.username;
    return (
      <ScrollView>
        {rooms.map(room => {
          const notMe = room.entrant.filter(
            entrant => entrant.username !== myName
          );
          const lastIndex = room.messages.length;
          const you = notMe[0];
          return (
            <TouchableOpacity
              key={room.id}
              onPress={() =>
                navigation.navigate("ChatRoom", {
                  roomId: room.id,
                  to: you.username
                })
              }
            >
              <Container>
                <Avatar width={"60px"} radius={"23px"} uri={you.avatar} />
                <Vertical>
                  <Username>{you.username}</Username>
                  <PrevMessage>{room.messages[lastIndex - 1].text}</PrevMessage>
                </Vertical>
                <CreateView>
                  <Created>{room.messages[lastIndex - 1].createdDate}</Created>
                </CreateView>
              </Container>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    return null;
  }
};

export default Rooms;
