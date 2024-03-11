import { gql } from "apollo-angular";


const GET_CATEGORIES = gql`
    query CategoriesData(
        $offset: Int,
        $limit: Int,
    ) {
        categories(
            page:$offset,
            first: $limit,
            id: {
                order: DESC,
                column: "id"
            }
        ) {
            data {
                id
                name
                code
                imageUrl
                price_start_from
                price_end_to
                status
            }
            paginatorInfo {
                currentPage
                perPage
                total
            }
        }
    }
`;

const GET_CATEGORY = gql`
    query GetCategoryQuery($id: ID!) {
        category(id: $id) {
            id
            name
            code
            price_start_from
            price_end_to
            status
            imageUrl
        }    
    }
`;

const CREATE_CATEGORY = gql`
    mutation CreateCategoryMutation(
        $name: String!,
        $code: String!,
        $price_start_from: Float!,
        $price_end_to: Float!,
        $status: String!,
        $image: Upload
    ) {
        createCategory(input: {
            name: $name,
            code: $code,
            price_start_from: $price_start_from,
            price_end_to: $price_end_to,
            status: $status,
            image: $image
        }) {
            success
            data
            message
        }
    }
`;

const REMOVE_CATEGORY = gql`
    mutation RemoveCategoryMutation($id: ID!) {
        deleteCategory(id: $id) {
            id
        }
    }
`;

const UPDATE_CATEGORY = gql`
    mutation UpdateCategoryMutations(
        $id: ID!
        $name: String,
        $code: String,
        $price_start_from: Float,
        $price_end_to: Float,
        $status: String,
        $image: Upload 
    ) {
        updateCategory(
            id: $id,
            input: {
                name: $name,
                code: $code,
                price_start_from: $price_start_from,
                price_end_to: $price_end_to,
                status: $status,
                image: $image
            }
        ) {
            id
            name
        }
    }
`

export { GET_CATEGORIES, CREATE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY }