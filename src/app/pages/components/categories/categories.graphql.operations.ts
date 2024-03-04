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
                image
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
            id
            name
        }
    }
`;

export { GET_CATEGORIES, CREATE_CATEGORY }