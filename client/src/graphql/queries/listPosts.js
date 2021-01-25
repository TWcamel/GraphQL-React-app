import gql from "graphql-tag";

export default gql`
query ListPosts {
        listPosts {
            id
            createdAt
            content
            updatedAt
        }
    }
`;