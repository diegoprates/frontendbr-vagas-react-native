import React, { Component } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

class IssueListItem extends Component {
    render() {
        const {
            listItemContainer,
            listItemMetaInfoContainer,
            listItemMetaInfoTitle,
            listItemMetaDataContainer,
            listItemMetaDataTimeContainer,
            listItemMetaInfoMessage,
            listItemMetaDataTime
        } = styles;

        const {
             author,
             title,
             number,
             createdAt,
             comments
         } = this.props.node;

        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor="#3d3d3d">
                <View style={listItemContainer}>
                    <View style={listItemMetaInfoContainer}>
                        <View>
                            <Text style={listItemMetaInfoTitle}>{title}</Text>
                        </View>
                        <View>
                            <Text style={listItemMetaInfoMessage}>#{number} opened {moment(createdAt).fromNow()} by {author.login}</Text>
                        </View>
                    </View>
                    <View style={listItemMetaDataContainer}>
                        <View style={listItemMetaDataTimeContainer}>
                            <Text style={listItemMetaDataTime}>{comments.totalCount} comments</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    listItemContainer:{
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#cecece',
        padding: 5
    },
    listItemMetaInfoContainer:{
        flex: 3,
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    listItemMetaInfoTitle:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
    },
    listItemMetaInfoMessage:{
        color: '#3d3d3d'
    },
    listItemMetaDataContainer:{
        flex: 0.5,
        padding: 5
    },
    listItemMetaDataTimeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    listItemMetaDataTime:{
        color: '#2C9631',
        fontSize: 12
    }
});

export default IssueListItem;
