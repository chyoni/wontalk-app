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
