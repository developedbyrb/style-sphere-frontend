import { gql } from "apollo-angular";

const GET_PRODUCTS = gql`
    query Products($offset: Int, $limit: Int, $name: String) {
        products(page:$offset, first: $limit, name: $name, id: {order: DESC, column: "id"}) {
            data {
                id
                name
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
    query Products($id: ID!) {
        product(id: $id) {
            id
            name
            email
            image_url
        }
    }
`;

const CREATE_PRODUCTS = gql`
    mutation productCreate($email: String!, $password: String!, $name: String!, $roleId: ID!, $profile_pic: Upload) {
        createProduct(input: {email: $email, password: $password, name: $name, role_id: $roleId, profile_pic: $profile_pic}) {
            id
            name
        }
    }
`;

const REMOVE_PRODUCT = gql`
    mutation productDelete($id: ID!) {
        deleteProduct
        
        (id: $id) {
            id
        }
    }
`;


const GET_FILE_PATH = gql`
  query GetFilePath($path: String!) {
    getFilePath(path: $path)
  }
`;

export { GET_PRODUCTS, CREATE_PRODUCTS, REMOVE_PRODUCT, GET_PRODUCT_DETAILS, GET_FILE_PATH }