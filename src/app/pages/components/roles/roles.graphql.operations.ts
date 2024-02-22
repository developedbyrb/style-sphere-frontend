import { gql } from "apollo-angular";

const GET_ROLES = gql`
    query {
        roles {
            data {
                id
                name
                created_at
            }
        }
    }
`;

const GET_ROLES_FOR_FILTER = gql`
    query {
        roles {
            data {
                id
                name
            }
        }
    }
`;

export { GET_ROLES, GET_ROLES_FOR_FILTER };