/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestSecret
// ====================================================

export interface requestSecret_requestSecret {
  __typename: "RequestSecretResponse";
  ok: boolean;
  error: string | null;
}

export interface requestSecret {
  requestSecret: requestSecret_requestSecret;
}

export interface requestSecretVariables {
  email: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: confirmSecret
// ====================================================

export interface confirmSecret_confirmSecret {
  __typename: "ConfirmSecretResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface confirmSecret {
  confirmSecret: confirmSecret_confirmSecret;
}

export interface confirmSecretVariables {
  email: string;
  secret: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser {
  __typename: "CreateUserResponse";
  ok: boolean;
  error: string | null;
}

export interface createUser {
  createUser: createUser_createUser;
}

export interface createUserVariables {
  email: string;
  username: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeMe
// ====================================================

export interface seeMe_seeMe_room_entrant {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
}

export interface seeMe_seeMe_room_messages {
  __typename: "Message";
  id: string;
  text: string;
  createdDate: string | null;
  createdTime: string | null;
}

export interface seeMe_seeMe_room {
  __typename: "Room";
  id: string;
  entrant: seeMe_seeMe_room_entrant[];
  messages: seeMe_seeMe_room_messages[];
  createdDate: string | null;
  createdTime: string | null;
}

export interface seeMe_seeMe_message_room {
  __typename: "Room";
  id: string;
}

export interface seeMe_seeMe_message {
  __typename: "Message";
  id: string;
  text: string;
  room: seeMe_seeMe_message_room;
}

export interface seeMe_seeMe_friends {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  createdDate: string | null;
  createdTime: string | null;
}

export interface seeMe_seeMe {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  room: seeMe_seeMe_room[];
  message: seeMe_seeMe_message[];
  friends: seeMe_seeMe_friends[];
  createdDate: string | null;
  createdTime: string | null;
}

export interface seeMe {
  seeMe: seeMe_seeMe;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createRoom
// ====================================================

export interface createRoom_createRoom_room {
  __typename: "Room";
  id: string;
}

export interface createRoom_createRoom {
  __typename: "CreateRoomResponse";
  ok: boolean;
  error: string | null;
  room: createRoom_createRoom_room | null;
}

export interface createRoom {
  createRoom: createRoom_createRoom;
}

export interface createRoomVariables {
  you: string[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRoom
// ====================================================

export interface seeRoom_seeRoom_room_entrant {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
}

export interface seeRoom_seeRoom_room_messages_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
}

export interface seeRoom_seeRoom_room_messages {
  __typename: "Message";
  id: string;
  text: string;
  user: seeRoom_seeRoom_room_messages_user;
  createdDate: string | null;
  createdTime: string | null;
}

export interface seeRoom_seeRoom_room {
  __typename: "Room";
  id: string;
  entrant: seeRoom_seeRoom_room_entrant[];
  messages: seeRoom_seeRoom_room_messages[];
}

export interface seeRoom_seeRoom {
  __typename: "SeeRoomResponse";
  ok: boolean;
  error: string | null;
  room: seeRoom_seeRoom_room | null;
}

export interface seeRoom {
  seeRoom: seeRoom_seeRoom;
}

export interface seeRoomVariables {
  roomId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendMessage
// ====================================================

export interface sendMessage_sendMessage {
  __typename: "SendMessageResponse";
  ok: boolean;
  error: string | null;
}

export interface sendMessage {
  sendMessage: sendMessage_sendMessage;
}

export interface sendMessageVariables {
  roomId: string;
  text: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: newMessage
// ====================================================

export interface newMessage_newMessage_user {
  __typename: "User";
  id: string;
  avatar: string | null;
  username: string;
}

export interface newMessage_newMessage {
  __typename: "Message";
  id: string;
  text: string;
  user: newMessage_newMessage_user;
  createdDate: string | null;
  createdTime: string | null;
}

export interface newMessage {
  newMessage: newMessage_newMessage | null;
}

export interface newMessageVariables {
  roomId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchUser
// ====================================================

export interface searchUser_searchUser_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
  bio: string | null;
  email: string;
  isFriends: boolean;
  createdDate: string | null;
  createdTime: string | null;
}

export interface searchUser_searchUser {
  __typename: "SearchUserResponse";
  ok: boolean;
  error: string | null;
  user: (searchUser_searchUser_user | null)[] | null;
}

export interface searchUser {
  searchUser: searchUser_searchUser;
}

export interface searchUserVariables {
  term: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addFriend
// ====================================================

export interface addFriend_addFriend {
  __typename: "AddFriendResponse";
  ok: boolean;
  error: string | null;
}

export interface addFriend {
  addFriend: addFriend_addFriend;
}

export interface addFriendVariables {
  friendId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
