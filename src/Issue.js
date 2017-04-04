import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

class Issue extends Component {
    renderIssue() {
        if (this.props.data.loading) {
            return (
                <Text>Loading</Text>
            );
        }

        const { container } = styles;

        const {
            title,
            body,
            comments
        } = this.props.data.repository.issue;

        return (
            <View style={container}>
                <ScrollView
                  automaticallyAdjustContentInsets={false}
                  scrollEventThrottle={200}>
                      <Text>{title}</Text>
                      <Text>{body}</Text>
                </ScrollView>
            </View>
        );
    }

    render() {
        return this.renderIssue();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    }
});

const getIssueByNumber = gql`
    query getIssue($number: Int!) {
        repository(owner: "frontendbr", name: "vagas") {
            issue(number: $number) {
                title,
                body,
                comments(first: 50) {
                    nodes {
                        author {
                            login
                        },
                        body
                    },
                    totalCount
                }
            }
        }
    }
`;

export default graphql(getIssueByNumber, {
    options: ({ navigation }) => ({
        variables: {
            number: navigation.state.params.number
        }
    })
})(Issue);
