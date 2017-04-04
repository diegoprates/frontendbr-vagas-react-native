import React, { Component } from 'react';
import {
    ApolloProvider,
    ApolloClient,
    createNetworkInterface,
 } from 'react-apollo';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
} from 'react-native';

import { login } from './githubLogin';
import { username, password } from './config';

let TOKEN = null;

const networkInterface = createNetworkInterface({
    uri: 'https://api.github.com/graphql'
});

const client = new ApolloClient({
    networkInterface: networkInterface.use([{
        applyMiddleware(req, next) {
            if (!req.options.headers) {
                req.options.headers = {};
            }

            req.options.headers.authorization = `Bearer ${TOKEN}`;
            next();
        }
    }])
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

function ConnectApolloProvider(WrappedComponent) {
    return class extends React.Component {
        static navigationOptions = {
            title: 'frontendbr/vagas',
        };

        constructor(props) {
            super(props);
            this.state = { login: false };
        }

        async componentDidMount() {
            if (username === 'xxx') {
                throw new Error('Please create a config.js your username and password.');
            }

            TOKEN = await login(username, password);

            this.setState({ login: true });
        }

        render() {
            return (
                <ApolloProvider client={client}>
                    <View style={styles.container}>
                        {this.state.login && <WrappedComponent data={this.state.data} {...this.props} />}
                    </View>
                </ApolloProvider>
            );
        }
    };
}

export default ConnectApolloProvider;
