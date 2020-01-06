import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import CollegeSettings from './CollegeSettings';
//import CollegeSettings from './CollegeSettings';
import AcademicSettings from './AcademicSettings';
import RolesPermission from './RolesPermission';

export class CollegeInfo extends React.Component {
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
    const {activeTab} = this.state;
    return (
      <section className="tab-container">
        <div>
          <h5>
          </h5>
        </div>
        <Nav tabs className="mb-2 bottom-box-shadow">
          <NavItem className="cursor-pointer">
            <NavLink className={`${activeTab === 0 ? 'active' : ''}`} onClick={() => { this.toggleTab(0); }} >
              College Settings
            </NavLink>
          </NavItem>
          <NavItem className="cursor-pointer">
            <NavLink className={`${activeTab === 1 ? 'active' : ''}`} onClick={() => { this.toggleTab(1); }} >
              Academic Settings
            </NavLink>
          </NavItem>
          <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 2 ? 'active' : ''}`}
              onClick={() => {
                this.toggleTab(2);
              }}
            >
              Roles &amp; Permissions
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="border-right">
          <TabPane tabId={0}>
            <CollegeSettings />
          </TabPane>
          <TabPane tabId={1}>
            <AcademicSettings />
          </TabPane>
          <TabPane tabId={2}>
            <RolesPermission />
          </TabPane>
        </TabContent>
      </section>
    );
  }
}
