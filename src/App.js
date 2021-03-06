import React from 'react';
import { Router, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ConfigurePage from './ConfigurePage';
import { config } from './config';
import { history } from './_helpers';
import './_static/scripts/teamsapp';
import { CollegeInfo } from './CollegeInfo';
import Admission from './Admission';
import Students from './Students';
import EditStudent from './EditStudent';
import "./_static/css/tabs.css";
import { createGraphQLClient } from './createGraphQLClient';

const graphQLClient = createGraphQLClient();

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ApolloProvider client={graphQLClient} >
                <div className="">
                    <Router history={history}>
                        <div>
                            <Route exact path={`${config.basePath}configure`} component={ConfigurePage} />
                            <Route exact path={`${config.basePath}college-info`} component={CollegeInfo} />
                            <Route exact path={`${config.basePath}admission`} component={Admission} />
                            <Route exact path={`${config.basePath}students`} component={Students} />
                            <Route exact path={`${config.basePath}editstudent`} component={EditStudent} />
                        </div>
                    </Router>
                </div>
            </ApolloProvider>
        );
    }
}
