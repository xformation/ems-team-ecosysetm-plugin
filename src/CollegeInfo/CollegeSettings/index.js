import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import '../../_static/css/college-settings.css';
import { CollegeInfo } from './CollegeInfo';
import { CollegeBranches } from './CollegeBranches';

export default class CollegeSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
        };
        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab(tabNo) {
        this.setState({
            activeTab: tabNo,
        });
    }

    render() {
        const { activeTab } = this.state;
        return (
            <section className="container-fluid">
                <section className="tab-container row vertical-tab-container">
                    <Nav tabs className="my-2 col-sm-2 nav nav-tabs align-self-baseline">
                        <NavItem className="cursor-pointer">
                            <NavLink className={`vertical-nav-link ${activeTab === 0 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(0); }} >
                                College Info
                            </NavLink>
                        </NavItem>
                        <NavItem className="cursor-pointer">
                            <NavLink className={`vertical-nav-link ${activeTab === 1 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(1); }} >
                                College Branches
                            </NavLink>
                        </NavItem>
                        <NavItem className="cursor-pointer">
                            <NavLink className={`vertical-nav-link ${activeTab === 2 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(2); }} >
                                Legal Entities
                            </NavLink>
                        </NavItem>
                        <NavItem className="cursor-pointer">
                            <NavLink className={`vertical-nav-link ${activeTab === 3 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(3); }} >
                                File Import
                            </NavLink>
                        </NavItem>
                        <NavItem className="cursor-pointer">
                            <NavLink className={`vertical-nav-link ${activeTab === 4 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(4); }} >
                                Payment
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab} className="col-sm-9 border-left py-3">
                        <TabPane tabId={0}>
                            <CollegeInfo />
                        </TabPane>
                        <TabPane tabId={1}>
                            <CollegeBranches />
                        </TabPane>
                        <TabPane tabId={2}>
                            Test
                        </TabPane>
                        <TabPane tabId={3}>
                            Test
                        </TabPane>
                        <TabPane tabId={4}>
                            Test
                        </TabPane>
                    </TabContent>
                </section>
            </section>
        );
    }
}
