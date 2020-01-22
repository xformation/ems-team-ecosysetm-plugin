import * as React from 'react';
import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import  AddStudent  from '../AddStudent/index';
import  StudentDetails  from '../StudentDetails/index';


export default class Student extends React.Component {
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
        <Nav tabs className="mb-2 bottom-box-shadow nav nav-tabs">
          <NavItem className="cursor-pointer">
            <NavLink className={`${activeTab === 0 ? 'active' : ''}`} onClick={() => {this.toggleTab(0);}}>
                Add Student
            </NavLink>
          </NavItem>
          <NavItem className="cursor-pointer">
            <NavLink className={`${activeTab === 1 ? 'active' : ''}`} onClick={() => {this.toggleTab(1);}}>
              Student Details
            </NavLink>
          </NavItem>
          <NavItem className="cursor-pointer">
            <NavLink className={`${activeTab === 2 ? 'active' : ''}`} onClick={() => {this.toggleTab(2);}}>
              Test 3
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="border-right">
          <TabPane tabId={0}>
            <AddStudent />
          </TabPane>
          <TabPane tabId={1}>
            <StudentDetails />
          </TabPane>
          <TabPane tabId={2}>
            Test3
          </TabPane>
        </TabContent>
      </section>
    );
  }
}
