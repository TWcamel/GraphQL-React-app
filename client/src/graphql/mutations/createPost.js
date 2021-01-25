import gql from "graphql-tag";

export default gql`
    mutation createTodo($input: PostCreateInput!) {
        createPost(input: $input) {
            id
            createdAt
            updatedAt
            content
        }
    }
`;
