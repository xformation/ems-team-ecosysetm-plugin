import * as React from 'react';
import { Link } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import '../_static/css/custom.css';

export class StudentProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
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
        const { student } = this.props;
        const { activeTab } = this.state;
        return (
            <section className="xform-container">
                <div className="row">
                    <div className="col-12 profile-header">
                        <h3 className="bg-heading p-1 mb-0">
                            <i className="fa fa-university mr-1"></i>
                            Admin - Student Management
                        </h3>
                    </div>
                </div>
                <div className="student-profile-container">
                    <div className="my-2 px-3 profile-header">
                        <div className="d-inline-block float-left heading">Student Profile</div>
                        <div className="d-inline-block float-right">
                            <div className="dont-print">
                                <Link className="btn btn-primary mr-1" to={`/students`}>
                                    Back
                                </Link>
                                <button className="btn btn-primary mr-1" onClick={() => window.print()}>
                                    Print
                                </button>
                                <Link className="btn btn-primary" to={`/editstudent?id=${student.id}`}>
                                    Edit Student
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border mt-2">
                    <div className="student-photo-container row p-2">
                        <div className="col-md-2 mt-2 text-center">
                            <div className="profile-photo border w-100">
                                <img className="photo" id="stPhoto" src={student.uploadPhoto} />
                            </div>
                        </div>
                        <div className="col-md-10 mt-2">
                            {/* <div className="row">
                                <div className="col-md-12">
                                    <h1 className="dblue-text">{student.studentName} {student.studentMiddleName} {student.studentLastName}</h1>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-md-4 mb-2">
                                    <span className="profile-label">Contact No: </span>
                                    <span>{student.emergencyContactNo}</span>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <span className="profile-label">Primary Contact No: </span>
                                    <span>{student.studentContactNumber}</span>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <span className="profile-label">Admission No:</span>
                                    <span>{student.admissionNo}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-2">
                                    <span className="profile-label">Roll No: </span>
                                    <span>{student.rollNo}</span>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <span className="profile-label">Class: </span>
                                    <span>{student.batch.batch}</span>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <span className="profile-label">Section: </span>
                                    <span>{student.section.section}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-2">
                                    <span className="profile-label">Student Id: </span>
                                    <span>{student.id}</span>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <span className="profile-label">Department: </span>
                                    <span>{student.department.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="buttons-container dont-print pt-2">
                        <Nav tabs className="mb-2 bottom-box-shadow nav nav-tabs">
                            <NavItem className="cursor-pointer">
                                <NavLink className={`${activeTab === 0 ? 'active' : ''}`} onClick={() => { this.toggleTab(0); }}>
                                    Profile <br /> <span class="uparrow"></span>
                                </NavLink>
                            </NavItem>
                            <NavItem className="cursor-pointer">
                                <NavLink className={`${activeTab === 1 ? 'active' : ''}`} onClick={() => { this.toggleTab(1); }} disabled>
                                    Details
                                </NavLink>
                            </NavItem>
                            <NavItem className="cursor-pointer">
                                <NavLink className={`${activeTab === 2 ? 'active' : ''}`} onClick={() => { this.toggleTab(2); }} disabled>
                                    Academic
                                </NavLink>
                            </NavItem>
                            <NavItem className="cursor-pointer">
                                <NavLink className={`${activeTab === 3 ? 'active' : ''}`} onClick={() => { this.toggleTab(3); }}>
                                    Fee <br /> <span class="uparrow"></span>
                                </NavLink>
                            </NavItem>
                            <NavItem className="cursor-pointer">
                                <NavLink className={`${activeTab === 4 ? 'active' : ''}`} onClick={() => { this.toggleTab(4); }} disabled>
                                    Reports
                                </NavLink>
                            </NavItem>
                            <NavItem className="cursor-pointer">
                                <NavLink className={`${activeTab === 5 ? 'active' : ''}`} onClick={() => { this.toggleTab(5); }} disabled>
                                    ID Card
                                </NavLink>
                            </NavItem>
                            <NavItem className="cursor-pointer">
                                <NavLink className={`${activeTab === 6 ? 'active' : ''}`} onClick={() => { this.toggleTab(6); }} disabled>
                                    Documents
                                </NavLink>
                            </NavItem>
                            <NavItem className="cursor-pointer">
                                <NavLink className={`${activeTab === 7 ? 'active' : ''}`} onClick={() => { this.toggleTab(7); }}>
                                    Facility <br /> <span class="uparrow"></span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab} className="border-right">
                            <TabPane tabId={0}>
                                <div className="main-details m-1 p-3 border">
                                    <div className="details-container">
                                        <div className="row">
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Fathers Name:</span>
                                                <span>{student.fatherName}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Fathers Contact:</span>
                                                <span>{student.emergencyContactNo}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Email Address</span>
                                                <span>{student.alternateEmailAddress}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Mothers Name:</span>
                                                <span>{student.motherName}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Mothers Contact:</span>
                                                <span>{student.alternateContactNumber}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Email Address:</span>
                                                <span>{student.alternateEmailAddress}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="details-container pt-3">
                                        <div className="row">
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Address Line 1:</span>
                                                <span>{student.addressLineOne}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Address Line 2:</span>
                                                <span>{student.addressLineTwo}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Town:</span>
                                                <span>{student.town}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">State:</span>
                                                <span>{student.state}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Country:</span>
                                                <span>{student.country}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Pin Code:</span>
                                                <span>{student.pincode}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="details-container pt-3">
                                        <div className="row">
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Adhar No:</span>
                                                <span>{student.aadharNo}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Date Of Birth:</span>
                                                <span>{student.strDateOfBirth}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Place Of Birth:</span>
                                                <span>{student.placeOfBirth}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Religion:</span>
                                                <span>{student.religion}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Cast:</span>
                                                <span>{student.caste}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Sub Cast:</span>
                                                <span>{student.subCaste}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Blood Group:</span>
                                                <span>{student.bloodGroup}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Sex:</span>
                                                <span>{student.sex}</span>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <span className="profile-label">Student Type:</span>
                                                <span>{student.studentType}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId={1}>
                                <div className="main-details m-1 p-3 border">
                                    Test 2
                                </div>
                            </TabPane>
                            <TabPane tabId={2}>
                                <div className="main-details m-1 p-3 border">
                                    Test 3
                                </div>
                            </TabPane>
                            <TabPane tabId={3}>
                                <div className="main-details m-1 p-3 border">
                                    <div className="details-container m-b-2">
                                        <div className="d-flex bdr-bpttom">
                                            <div className="w-75 d-flex">
                                                <div className="w-100">
                                                    <div className="profile-label">Total Fee</div>
                                                    <div className="box-text">1,25,000</div>
                                                </div>
                                                <div className="w-100">
                                                    <div className="profile-label">Fees Paid</div>
                                                    <div className="box-text ">25,000</div>
                                                </div>
                                                <div className="w-100">
                                                    <div className="profile-label">Fees Due</div>
                                                    <div className="box-text">50,000</div>
                                                </div>
                                                <div className="w-100">
                                                    <div className="profile-label">Due Date</div>
                                                    <div className="box-text">01/03/2019</div>
                                                </div>
                                                <div className="w-100">
                                                    <div className="profile-label">Total Remaining</div>
                                                    <div className="box-text">35,000</div>
                                                </div>
                                            </div>
                                            <div className="w-25 d-flex">
                                                <div className="w-100">
                                                    <div className="profile-label">Send Notification</div>
                                                    <button className="btn btn-primary btn-cust-width">Send SMS</button>
                                                </div>
                                                <div className="w-100">
                                                    <div className="profile-label">Take Payment</div>
                                                    <button className="btn btn-primary btn-cust-width">Take Payment</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex mt-2">
                                            <table className="w-40" cellPadding="0" cellSpacing="0" border="0" id="txt-align">
                                                <tr>
                                                    <th>Fee Line Item</th>
                                                    <th>Amount</th>
                                                </tr>
                                                <tr>
                                                    <td>Tution Fee</td>
                                                    <td>10,000</td>
                                                </tr>
                                                <tr>
                                                    <td>Exam Fee</td>
                                                    <td>5,000</td>
                                                </tr>
                                                <tr>
                                                    <td>Lab Fee</td>
                                                    <td>2,000</td>
                                                </tr>
                                            </table>
                                            <table className="w-40 mx-3" cellPadding="0" cellSpacing="0" border="0" id="txt-align">
                                                <tr>
                                                    <th>Facility</th>
                                                    <th>Amount</th>
                                                </tr>
                                                <tr>
                                                    <td>Transportation</td>
                                                    <td>10,000</td>
                                                </tr>
                                                <tr>
                                                    <td>Gym</td>
                                                    <td>5,000</td>
                                                </tr>
                                            </table>
                                            <div className="w-20">
                                                <div className="profile-label">Next Payment</div>
                                                <div className="box-text">35,000</div>
                                            </div>
                                        </div>
                                        <div className="d-flex mt-2 flex-row-reverse">
                                            <button className="btn btn-primary cust-btn-payment">Payment History</button>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId={4}>
                                <div className="main-details m-1 p-3 border">
                                    Test 4
                                </div>
                            </TabPane>
                            <TabPane tabId={5}>
                                <div className="main-details m-1 p-3 border">
                                    Test 5
                                </div>
                            </TabPane>
                            <TabPane tabId={6}>
                                <div className="main-details m-1 p-3 border">
                                    Test 6
                                </div>
                            </TabPane>
                            <TabPane tabId={7}>
                                <div className="main-details m-1 p-3 border">
                                    <div className="details-container mb-3">
                                        <div className="d-flex w-75 mb-2">
                                            <div className="profile-label cust-wh">Transport</div>
                                            <div className="cust-wh">Yes</div>
                                            <div className="profile-label cust-wh">Route</div>
                                            <div className="cust-box-text cust-wh mr-3">A1</div>
                                            <div className="profile-label cust-wh ml-3">Route Charges</div>
                                            <div className="cust-box-text cust-wh ml-3">1,000</div>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-1">
                                        <div className="profile-label cust-wh">Gym</div>
                                        <div className="cust-wh">No</div>
                                    </div>
                                    <div className="d-flex mb-1">
                                        <div className="profile-label cust-wh">Mess</div>
                                        <div className="cust-wh">Yes</div>
                                    </div>
                                    <div className="d-flex mb-1">
                                        <div className="profile-label cust-wh">Sports</div>
                                        <div className="cust-wh">No</div>
                                    </div>
                                    <div className="d-flex mb-1">
                                        <div className="profile-label cust-wh">Cultural class</div>
                                        <div className="cust-wh">No</div>
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </section>
        );
    }

}