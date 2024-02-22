import { gql } from "apollo-angular";

const GET_USERS = gql`
    query Users($offset: Int, $limit: Int, $name: String) {
        users(page:$offset, first: $limit, name: $name, id: {order: DESC, column: "id"}) {
            data {
                id
                name
                email
                user_profile
                role {
                    name
                }
            }
            paginatorInfo {
                count
                currentPage
                firstItem
                hasMorePages
                lastItem
                lastPage
                perPage
                total
            }
        }
    }
`;

const GET_USER_DETAILS = gql`
    query Users($id: ID!) {
        user(id: $id) {
            id
            name
            email
            user_profile
            role {
                id
            }
        }
    }
`;

const CREATE_USERS = gql`
    mutation userCreate($email: String!, $password: String!, $name: String!, $roleId: ID!, $profile_pic: Upload) {
        createUser(input: {email: $email, password: $password, name: $name, role_id: $roleId, profile_pic: $profile_pic}) {
            id
            name
        }
    }
`;

const REMOVE_USER = gql`
    mutation userDelete($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;


const GET_FILE_PATH = gql`
  query GetFilePath($path: String!) {
    getFilePath(path: $path)
  }
`;

export { GET_USERS, CREATE_USERS, REMOVE_USER, GET_USER_DETAILS, GET_FILE_PATH }