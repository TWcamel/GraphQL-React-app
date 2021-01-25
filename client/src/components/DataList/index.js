import React from "react";
import styled from "styled-components";
import { List, Checkbox, Input, Button, Popconfirm, message } from "antd";
import { useMutation } from "@apollo/client";

/** App theme */
import Colors from "../../theme/colors";

/** GraphQL Queries */
import updatePost from "../../graphql/mutations/updatePost";
import createPost from "../../graphql/mutations/createPost";
import deletePost from "../../graphql/mutations/deletePost";
import getPost from "../../graphql/queries/getPost";
import listPosts from "../../graphql/queries/listPosts";

const ListContainer = styled.div`
  max-height: 50vh;
  overflow: scroll;
  background-color: ${Colors.white};
`;

const DeleteAction = styled.span`
  color: #1890ff;
  &:hover {
    cursor: pointer;
  }
`;

const DataList = (props) => {
    const [content, updateContent] = React.useState("");
    const [updatePostMutation] = useMutation(updatePost);
    const [createPostMutation] = useMutation(createPost);
    const [deletePostMutation] = useMutation(deletePost);


    const { data } = props;

    function handleSubmit(event, item) {
        event.preventDefault();

        createPostMutation({
            variables: { input: { content } },
            refetchQueries: [
                {
                    query: listPosts,
                },
            ],
        })
            .then((res) => message.success("Item created successfully"))
            .catch((err) => {
                message.error("Error occurred while creating item");
                console.log(err);
            });
    }

    function handleKeyPress(event) {
        if (event.keyCode === 13) {
            // user pressed enter
            createPostMutation({
                variables: { input: { content } },
                refetchQueries: [
                    {
                        query: listPosts,
                    },
                ],
            })
                .then((res) => {
                    message.success("Item created successfully");
                })
                .catch((err) => {
                    message.error("Error occurred while creating item");
                    console.log(err);
                });
        }
    }

    function handleDelete(event, item) {
        deletePostMutation({
            variables: { id: item.id },
            refetchQueries: [
                {
                    query: listPosts,
                },
            ],
        })
            .then((res) => {
                message.success("Deleted successfully");
            })
            .catch((err) => {
                message.error("Error occurred while deleting item");
                console.log(err);
            });
    }

    return (
        <ListContainer>
            <List
                header={
                    <div style={{ display: "flex" }}>
                        <Input
                            placeholder="Enter post name"
                            value={content}
                            onChange={(event) => updateContent(event.target.value)}
                            style={{ marginRight: "10px" }}
                            onKeyDown={handleKeyPress}
                        />
                        <Button name="add" onClick={handleSubmit}>
                            add
                        </Button>
                    </div>
                }
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Popconfirm
                            title="Are you sure to delete this item?"
                            onConfirm={(event) => handleDelete(event, item)}
                            okText="Yes"
                            cancelText="No"
                        >
                            { item.content }  <DeleteAction>Delete</DeleteAction>
                        </Popconfirm>
                    </List.Item>
                )}
            />
        </ListContainer>
    );
};

export default DataList;