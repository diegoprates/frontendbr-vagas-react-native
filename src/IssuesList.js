import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
} from 'react-native';

 import IssueListItem from './IssueListItem';

 class IssuesList extends Component {
     constructor(props) {
         super(props);

         this.rowHasChanged = {rowHasChanged: (r1, r2) => r1 !== r2};

         this.state = {
             dataSource: new ListView.DataSource(this.rowHasChanged).cloneWithRows([]),
         };
     }

     componentWillReceiveProps(nextProps) {
         let cloneIssues = nextProps.data.repository.issues.edges.slice(0);

         this.setState({
             dataSource: new ListView.DataSource(this.rowHasChanged).cloneWithRows(cloneIssues.reverse()),
         });
     }

     render() {
         const { container } = styles;

         return (
             <View style={container}>
                 <ListView
                     style={container}
                     dataSource={this.state.dataSource}
                     renderRow={(rowData) => <IssueListItem onPress={this.props.navigation.navigate.bind(null, 'Issue', {number: rowData.node.number})} {...rowData} />}
                     enableEmptySections
                 />
             </View>
         );
     }
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

const getIssuesByRepository = gql`
    query allPosts {
        repository(owner: "frontendbr", name: "vagas") {
            issues(last: 25, states: OPEN) {
                edges {
                    node {
                        id
                        title
                        createdAt
                        number
                        author {
                            login
                        }
                        comments {
                            totalCount
                        }
                    }
                    cursor
                }
                pageInfo {
                    hasPreviousPage
                }
            }
        }
    }
`;

export default graphql(getIssuesByRepository)(IssuesList);
