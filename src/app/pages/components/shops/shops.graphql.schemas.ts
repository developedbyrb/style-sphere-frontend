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

const GET_SHOP_DETAILS = gql`
    query GetShopDetails($id: ID!) {
        shopDetails(id: $id) {
            email
            name
            mobile_number
            description
            status
            productCount
            products {
                id
                available_qty
                selling_price
                product {
                    id
                    name
                }
                shop {
                    id
                }
            }
            addresses {
                id
                address_line_1
                address_line_2
                city {
                    id
                    name
                }
                state {
                    name
                }
                country {
                    name
                }
            }
        }
    }
`

export { GET_SHOPS, GET_SHOP_DETAILS, CREATE_SHOP };