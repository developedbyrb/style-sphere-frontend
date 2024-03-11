import { gql } from "apollo-angular";

const GET_SHOPS = gql`
    query GetShopsQuery($offset: Int, $limit: Int) {
        shops(page: $offset, first: $limit, id: {order: DESC, column: "id"}) {
            data {
                id
                name
                email
                mobile_number
                productCount
            }
        }
    }
`;

const CREATE_SHOP = gql`
    mutation CreateShopMutation(
        $generalDetails: CreateGeneralDetails!,
        $addressDetails: [CreateShopAddress!]!,
        $productDetails: [CreateShopProduct!]!
    ) {
        createShop(input: {
            generalDetails: $generalDetails,
            addressDetails: $addressDetails,
            productDetails: $productDetails
        }) {
            id
            name
        }
    }
`;

export { GET_SHOPS, CREATE_SHOP };