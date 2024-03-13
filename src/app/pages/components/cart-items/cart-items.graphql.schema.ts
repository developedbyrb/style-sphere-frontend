import { gql } from "apollo-angular";

const GET_CART_COUNT = gql`
    query GetCartCounts {
        getCartCount {
            cartCount
        }
    }
`;

const ADD_PRODUCT_TO_CART = gql`
    mutation AddToCart(
        $shop: ID!,
        $product: ID!,
        $qty: String!,
        $price: String!
    ) {
        addToCart(input: {
            shop: $shop,
            product: $product,
            qty: $qty,
            price: $price
        }) {
            cartCount
        }
    }
`;

const GET_CART_ITEMS = gql`
    query GetCartItems {
        cartItems {
            id
            qty
            price
            total_amount
            user {
                id
            }
            product {
                id
                name
            }
            shop {
                id
                name
            }
        }
    }
`;

const UPDATE_CART_ITEMS_QTY = gql`
    mutation UpdateCartItems($id: ID!, $qty: Int!) {
        updateCartItems(
            id: $id,
            input: {
                qty: $qty
            }
        ) {
            cartCount
        }
    }
`;

const REMOVE_CART_ITEM = gql`
    mutation RemoveCartItem($id: ID!) {
        removeCartItem(id: $id) {
            cartCount
        }
    }
`;

export { GET_CART_COUNT, ADD_PRODUCT_TO_CART, GET_CART_ITEMS, UPDATE_CART_ITEMS_QTY, REMOVE_CART_ITEM };