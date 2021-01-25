import gql from "graphql-tag";

export default gql`
    query getPost($id: ID){
	getPost(id: $id){
        id
        createdAt
        updatedAt
        content
    }  
}

`;