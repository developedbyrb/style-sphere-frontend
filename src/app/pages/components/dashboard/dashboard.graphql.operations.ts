import { gql } from "apollo-angular";

const GET_PROFILE_DETAILS = gql`
    query{
        me {
            name
            email
        }
    }
`;

export { GET_PROFILE_DETAILS }