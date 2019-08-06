import React, { useState } from "react";
import styled from "styled-components/native";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity
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
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "../../Queries";
import { searchUser, searchUserVariables } from "../../types/api";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";

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
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Search: React.SFC<IProps> = ({ navigation }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, loading } = useQuery<searchUser, searchUserVariables>(SEARCH, {
    variables: { term: searchTerm },
    skip: !shouldFetch,
    fetchPolicy: "network-only"
  });
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
                    <TouchableOpacity
                      key={u.id}
                      onPress={() =>
                        navigation.navigate("Modal", { username: u.username })
                      }
                    >
                      <UserCard>
                        <Avatar width={"90px"} radius={"33px"} uri={u.avatar} />
                        <InfoColumn>
                          <Username>{u.username}</Username>
                          <Bio>{u.bio}</Bio>
                        </InfoColumn>
                      </UserCard>
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
