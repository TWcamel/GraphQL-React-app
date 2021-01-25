import gql from "graphql-tag";

export default gql`
    mutation createTodo($id: ID!) {
        createPost(id: $id) {
            id
            createdAt
            updatedAt
            content
        }
    }
`;
