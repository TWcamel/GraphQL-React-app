import './App.css';

import PropTypes from 'prop-types'

import React from "react";
import styled from "styled-components";

import { Spin } from "antd";
import { useQuery } from "@apollo/client";
import { LoadingOutlined } from "@ant-design/icons";

/** Presentational */
import DataList from "./components/DataList";

/** App theme */
import Colors from "./theme/colors";

/** GraphQL Queries */
import listPosts from "./graphql/queries/listPosts";

const BodyContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${Colors.grey};
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const CenterContent = styled.div`
  display: flex;
  flex: 1;
`;

DataList.propTypes = {
	data: PropTypes.array.isRequired,
}

const App = () => {
	const { loading, error, data } = useQuery(listPosts);
	const Loader = <LoadingOutlined style={{ fontSize: 50 }} spin />;

	if (loading)
		return (
			<CenterContent>
				<Spin indicator={Loader} />
			</CenterContent>
		);
	if (error) return `Error! ${error.message}`;

	return (
		<BodyContainer>
			<div style={{ backgroundColor: "white" }}>
				<DataList data={data.listPosts} />
			</div>
		</BodyContainer>
	);
};


export default App;
