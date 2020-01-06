import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import '../../_static/css/calendar-setup.css';
import { CalendarSetup } from './CalendarSetup';

export default class AcademicSettings extends React.Component {
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
                                Year Setting
                            </NavLink>
                        </NavItem>
                        <NavItem className="cursor-pointer">
                            <NavLink className={`vertical-nav-link ${activeTab === 1 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(1); }} >
                                Department Setup
                            </NavLink>
                        </NavItem>
                        <NavItem className="cursor-pointer">
                            <NavLink className={`vertical-nav-link ${activeTab === 2 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(2); }} >
                                Courses
                            </NavLink>
                        </NavItem>
                        <NavItem className="cursor-pointer">
                            <NavLink className={`vertical-nav-link ${activeTab === 3 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(3); }} >
                                Staff Setup
                            </NavLink>
                        </NavItem>
                        <NavItem className="cursor-pointer">
                            <NavLink className={`vertical-nav-link ${activeTab === 4 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(4); }} >
                                Subject Setup
                            </NavLink>
                        </NavItem>
                        <NavItem className="cursor-pointer">
                            <NavLink className={`vertical-nav-link ${activeTab === 5 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(5); }} >
                                Timetable Setup
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab} className="col-sm-9 border-left py-3">
                        <TabPane tabId={0}>
                            Test
                        </TabPane>
                        <TabPane tabId={1}>
                            Test
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
                        <TabPane tabId={5}>
                            <CalendarSetup />
                        </TabPane>
                    </TabContent>
                </section>
            </section>
        );
    }
}
