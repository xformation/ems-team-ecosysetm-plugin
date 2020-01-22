import * as React from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import  AddAdmission  from './AddAdmission';
import  AdmissionInfo  from './AdmissionInfo';


export default class Admission extends React.Component {
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
                Admission Info
            </NavLink>
          </NavItem>
          <NavItem className="cursor-pointer">
            <NavLink className={`${activeTab === 1 ? 'active' : ''}`} onClick={() => {this.toggleTab(1);}}>
              Add Admission
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="border-right">
          <TabPane tabId={0}>
            <AdmissionInfo />
          </TabPane>
          <TabPane tabId={1}>
            <AddAdmission />
          </TabPane>
        </TabContent>
      </section>
    );
  }
}
