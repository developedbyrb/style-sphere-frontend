import { gql } from "apollo-angular";

const GET_COUNTRIES = gql`
    query GetCountiesQuery {
        countries {
            id
            name
        }
    }
`;

const GET_STATES = gql`
    query GetCountryWiseStatesQuery($countryId: String!) {
        stateByCountryId(countryId: $countryId) {
            id
            name
        }
    }
`;

const GET_CITIES = gql`
    query GetStateWiseCitiesQuery($stateId: String!) {
        citiesByStateId(stateId: $stateId) {
            id
            name
        }
    }
`;

export { GET_COUNTRIES, GET_STATES, GET_CITIES };