import { gql } from "apollo-angular";

const GET_PRODUCTS = gql`
    query Products($offset: Int, $limit: Int) {
        products(page:$offset, first: $limit, id: {order: DESC, column: "id"}) {
            data {
                id
                name
                description
                selling_price
            }
            paginatorInfo {
                currentPage
                perPage
                total
            }
        }
    }
`;

const GET_PRODUCT_DETAILS = gql`
    query GetProductDetails($id: ID!) {
        product(id: $id) {
            id
            name
            code
            category_id
            description
            tags
            purchase_price
            selling_price
            status
            current_stock_qty
            low_stock_alert_qty
        }
    }
`;

const CREATE_PRODUCTS = gql`
    mutation CreateProductMutation(
        $name: String!
        $code: String!
        $category_id: ID!
        $description: String!
        $tags: String!
        $purchase_price: Float!
        $selling_price: Float!
        $status: String!
        $current_stock_qty: Int!
        $low_stock_alert_qty: Int!
    ) {
        createProduct(input: {
            name: $name,
            code: $code,
            category_id: $category_id,
            description: $description,
            tags: $tags,
            purchase_price: $purchase_price,
            selling_price: $selling_price,
            status: $status,
            current_stock_qty: $current_stock_qty,
            low_stock_alert_qty: $low_stock_alert_qty,
        }) {
            id
            name
        }
    }
`;

const REMOVE_PRODUCT = gql`
    mutation RemoveProductMutation($id: ID!) {
        deleteProduct (id: $id) {
            id
        }
    }
`;

const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            data {
                id
                name
            }
        }
    }
`;

const UPDATE_PRODUCT = gql`
    mutation UpdateProductMutation(
        $id: ID!
        $name: String
        $code: String
        $category_id: ID
        $description: String
        $tags: String
        $purchase_price: Float
        $selling_price: Float
        $status: String
        $current_stock_qty: Int
        $low_stock_alert_qty: Int
    ) {
        updateProduct(
            id: $id,
            input: {
                name: $name,
                code: $code,
                category_id: $category_id,
                description: $description,
                tags: $tags,
                purchase_price: $purchase_price,
                selling_price: $selling_price,
                status: $status,
                current_stock_qty: $current_stock_qty,
                low_stock_alert_qty: $low_stock_alert_qty,
            }
        ) {
            id
            name
        }
    }
`

export { GET_PRODUCTS, CREATE_PRODUCTS, REMOVE_PRODUCT, GET_PRODUCT_DETAILS, GET_CATEGORIES, UPDATE_PRODUCT }