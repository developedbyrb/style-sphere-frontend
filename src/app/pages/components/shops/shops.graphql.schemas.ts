import { gql } from "apollo-angular";

const GET_SHOPS = gql`
    query GetShopsQuery($offset: Integer!, $limit: Integer!) {
        shops(page: $offset, first: $limit, id: {order: DESC, column: "id"}) {
            data {
                id
                name
                email
                mobile
                imageUrl
                productCount
            }
        }
    }
`;