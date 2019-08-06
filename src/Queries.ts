import gql from "graphql-tag";

export const REQUEST_SECRET = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email) {
      ok
      error
    }
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($email: String!, $secret: String!) {
    confirmSecret(email: $email, secret: $secret) {
      ok
      error
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($email: String!, $username: String!) {
    createUser(email: $email, username: $username) {
      ok
      error
    }
  }
`;

export const SEE_ME = gql`
  query seeMe {
    seeMe {
      id
      username
      email
      avatar
      firstName
      lastName
      bio
      room {
        id
        entrant {
          id
          username
          avatar
        }
        messages {
          id
          text
          createdDate
          createdTime
        }
        createdDate
        createdTime
      }
      message {
        id
        text
        room {
          id
        }
      }
      friends {
        id
        username
        email
        avatar
        bio
        createdDate
        createdTime
      }
      createdDate
      createdTime
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation createRoom($you: [String!]!) {
    createRoom(you: $you) {
      ok
      error
      room {
        id
      }
    }
  }
`;

export const SEE_ROOM = gql`
  query seeRoom($roomId: String!) {
    seeRoom(roomId: $roomId) {
      ok
      error
      room {
        id
        entrant {
          id
          username
          avatar
        }
        messages {
          id
          text
          user {
            id
            username
            avatar
          }
          createdDate
          createdTime
        }
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($roomId: String!, $text: String!) {
    sendMessage(roomId: $roomId, text: $text) {
      ok
      error
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage($roomId: String!) {
    newMessage(roomId: $roomId) {
      id
      text
      user {
        id
        avatar
        username
      }
      createdDate
      createdTime
    }
  }
`;

export const SEARCH = gql`
  query searchUser($term: String!) {
    searchUser(term: $term) {
      ok
      error
      user {
        id
        username
        avatar
        bio
        email
        isFriends
        createdDate
        createdTime
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: String!) {
    addFriend(friendId: $friendId) {
      ok
      error
    }
  }
`;

export const SEE_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ok
      error
      user {
        id
        isSelf
        username
        email
        avatar
        bio
        isFriends
        createdDate
        createdTime
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser(
    $username: String!
    $avatar: String
    $firstName: String
    $lastName: String
    $bio: String
  ) {
    editUser(
      username: $username
      avatar: $avatar
      firstName: $firstName
      lastName: $lastName
      bio: $bio
    ) {
      ok
      error
    }
  }
`;
