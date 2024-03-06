import { gql } from "apollo-angular";

const GET_DASHBOARD_ANALYTICS = gql`
    query GetDashboardDetails{
        dashboardData {
            usersCount
            categoriesCount
            productsCount
            shopsCount
        }
    }
`;

export { GET_DASHBOARD_ANALYTICS }