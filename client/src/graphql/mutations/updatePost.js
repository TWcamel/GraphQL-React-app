import gql from "graphql-tag";

export default gql`
    mutation updatePost($input: PostUpdateInput!){
    updatePost(input: $input){
        id
        createdAt
        updatedAt
        content
    }
}
`;