import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { AUTH_TYPE } from "aws-appsync";

import {
	ApolloProvider,
	ApolloClient,
	ApolloLink,
	InMemoryCache,
} from "@apollo/client";

/** Ant design */
import "antd/dist/antd.css";

/** AWS config */
import AppSyncConfig from "./aws-exports";
import DataList from "./components/DataList";

const config = {
	url: AppSyncConfig.aws_appsync_graphqlEndpoint,
	region: process.env.REACT_APP_REGION,
	auth: {
		type: AUTH_TYPE.API_KEY,
		apiKey: AppSyncConfig.aws_appsync_apiKey,
	},
};
const client = new ApolloClient({
	link: ApolloLink.from([
		createAuthLink(config),
		createSubscriptionHandshakeLink(config),
	]),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "cache-and-network",
		},
	},
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
