import { gql } from "apollo-angular";

export const USER_LOGIN = gql`
    mutation userLogin($email: String!, $password: String!) {
        login(input: {email: $email, password: $password}) {
            token
            user {
                name
            }
        }
    }
`;