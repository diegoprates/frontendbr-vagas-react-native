import { StackNavigator } from 'react-navigation';

import ConnectApolloProvider from './ConnectApolloProvider';
import IssuesList from './IssuesList';
import Issue from './Issue';

const AppViews = StackNavigator({
    IssuesList: { screen: ConnectApolloProvider(IssuesList) },
    Issue: { screen: ConnectApolloProvider(Issue) }
});

export default AppViews;
