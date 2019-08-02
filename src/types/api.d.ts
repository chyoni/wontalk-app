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
}

export interface seeMe_seeMe_room {
  __typename: "Room";
  id: string;
  entrant: seeMe_seeMe_room_entrant[];
  messages: seeMe_seeMe_room_messages[];
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
