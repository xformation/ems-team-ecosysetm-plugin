import * as React from 'react';
import { graphql } from 'react-apollo';
import '../_static/css/admission-settings.css';
import withLoadingHandler from '../_helpers/loading.handler';
import { GET_ADMISSION_DATA, SEARCH_ADMISSION_ON_TYPE } from '../_queries/admission';

class AdminssionInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admissionEnquiryData: null,
            isApiCalled: false,
            isAllChecked: false,
            isShowDetail: false,
            detailObject: {}
        };
        this.onClickEnquiry = this.onClickEnquiry.bind(this);
        this.checkAllEnquiry = this.checkAllEnquiry.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.back = this.back.bind(this);
    }


    createAdmissionRows() {
        const { admissionEnquiryData, isApiCalled } = this.state;
        if (isApiCalled) {
            return <tr><td colSpan="7" align="center">Admission data is loading...</td></tr>;
        }
        if (!admissionEnquiryData) {
            return <tr><td colSpan="7" align="center">No record found, Please select another Enquiry</td></tr>;
        }
        const length = admissionEnquiryData.data.searchAdmissionOnType.length;
        const retVal = [];
        for (let i = 0; i < length; i++) {
            const tempObj1 = admissionEnquiryData.data.searchAdmissionOnType[i];
            retVal.push(
                <tr key={`admission_row_${i}`}>
                    <td>
                        <input type="checkbox" className="checkbox" name={tempObj1.studentName} value="checkedall" onChange={e => this.checkAdmissionInfo(e, tempObj1)} checked={tempObj1.isChecked} />
                    </td>
                    <td>{tempObj1.id}</td>
                    <td>{tempObj1.studentName}</td>
                    <td>{tempObj1.contactNumber}</td>
                    <td>{tempObj1.status}</td>
                    <td>{tempObj1.strEnquiryDate}</td>
                    <td>
                        <button className="btn btn-primary" onClick={e => this.showDetail(tempObj1)}>Details</button>
                    </td>
                </tr>
            )
        }
        return retVal;
    }

    showDetail(obj) {
        this.setState({
            isShowDetail: true,
            detailObject: obj
        });
    }

    back() {
        this.setState({
            isShowDetail: false
        });
    }

    onClickEnquiry(e, admType) {
        const { mutate } = this.props;

        this.setState({
            isApiCalled: true,
            admissionEnquiryData: null,
            isShowDetail: false
        })
        e && e.preventDefault();
        return mutate({
            variables: {
                admissionEnquiryType: admType,
                branchId: 1851,
            },
        }).then(data => {
            this.setState({
                admissionEnquiryData: data,
                isApiCalled: false
            });
        }).catch((error) => {
            this.setState({
                isApiCalled: false
            });
        });
    }

    checkAdmissionInfo(e, tempObj) {
        const { checked } = e.target;
        tempObj.isChecked = checked;
    }

    checkAllEnquiry(e) {
        const { checked } = e.target;
        const { admissionEnquiryData } = this.state;
        this.setState({
            isAllChecked: checked
        });
        const searchAdmissionOnType = admissionEnquiryData.data.searchAdmissionOnType;
        let length = searchAdmissionOnType.length;
        for (let i = 0; i < length; i++) {
            const enquiry = searchAdmissionOnType[i];
            enquiry.isChecked = checked;
        }
        this.setState({
            admissionEnquiryData: admissionEnquiryData
        });
    }

    render() {
        const { totalAdmissions, totalFollowup, totalDeclined, totalConverted } = this.props.data.getAdmissionData || {};
        const { isApiCalled, isShowDetail, detailObject } = this.state;
        return (
            <div className="adminssion-main">
                <div className="heading mb-3">
                    <h3 className="bg-heading-admission p-3">
                        <i className="fa fa-university mr-2" aria-hidden="true"></i>
                        Admission Enquiry
                    </h3>
                </div>
                <div className="inDashboard mb-4">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 col-sm-6 mb-md-0 mb-3">
                                <div className="border text-center invoiceDashboard">
                                    <div className="invoiceHeader bg-primary py-2 px-3 mb-3">
                                        <strong className="text-white">Total Enquiry</strong>
                                    </div>
                                    <div className="my-3">
                                        <p className="fee-text">{totalAdmissions}</p>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary remainder" disabled={isApiCalled}
                                            onClick={e => this.onClickEnquiry(e, "TotalEnquiry")}>View Info</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-md-0 mb-3">
                                <div className="border text-center invoiceDashboard">
                                    <div className="invoiceHeader bg-primary py-2 px-3 mb-3">
                                        <strong className="text-white">Follow Up</strong>
                                    </div>
                                    <div className="my-3">
                                        <p className="fee-text">{totalFollowup}</p>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary remainder" disabled={isApiCalled}
                                            onClick={e => this.onClickEnquiry(e, "FollowUp")}>View Info</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-md-0 mb-3">
                                <div className="border text-center invoiceDashboard">
                                    <div className="invoiceHeader bg-primary py-2 px-3 mb-3">
                                        <strong className="text-white">Declined</strong>
                                    </div>
                                    <div className="my-3">
                                        <p className="fee-text">{totalDeclined}</p>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary remainder"
                                            onClick={e => this.onClickEnquiry(e, "Declined")} disabled={isApiCalled}>View Info</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-md-0 mb-3">
                                <div className="border text-center invoiceDashboard">
                                    <div className="invoiceHeader bg-primary py-2 px-3 mb-3">
                                        <strong className="text-white">Converted</strong>
                                    </div>
                                    <div className="my-3">
                                        <p className="fee-text">{totalConverted}</p>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary remainder" onClick={e => this.onClickEnquiry(e, "Converted")} disabled={isApiCalled}>View Info</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {!isShowDetail &&
                    <div className="admissionGridShow mb-3">
                        <div className="container-fluid">
                            <h5 className="bg-heading p-3 m-0">Received Info</h5>
                            <table className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
                                <thead className="bg-white p-2">
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="checkbox" name="checkedAll" onChange={this.checkAllEnquiry} checked={this.state.isAllChecked} />
                                        </th>
                                        <th>Enquiry ID</th>
                                        <th>Name</th>
                                        <th>Contact</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.createAdmissionRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                {
                    isShowDetail &&
                    <div className="admissionGridShow mb-3">
                        <div className="container-fluid">
                            <h5 className="bg-heading p-3 m-0 mb-3">Details</h5>
                            <div className="row">
                                <div className="col-md-3 col-sm-12 mb-md-0 mb-3">
                                    <h5 className="head-prime p-2 mb-0">
                                        Enquiry <span className="text-dark">7051</span>
                                    </h5>
                                    <div className="btn-adm p-3 d-block">
                                        <button className="btn btn-primary d-block w-100 mb-2 disabled">Approve</button>
                                        <button className="btn btn-primary d-block w-100 mb-2 disabled">Followup</button>
                                        <button className="btn btn-primary d-block w-100 mb-2 disabled">Decline</button>
                                        <button className="btn btn-primary d-block w-100 mb-2 disabled">Edit</button>
                                        <button className="btn btn-primary d-block w-100 mb-2 disabled">Print</button>
                                        <button className="btn btn-primary d-block w-100" id="btnBack" name="btnBack" onClick={this.back}>Back</button>
                                    </div>
                                </div>
                                <div className="col-md-9 col-sm-12">
                                    <div className="tabsAdmission">
                                        <a className="tab mx-3">Personal Details</a>
                                        <div className="content p-4">
                                            <div className="details-container">
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Student Name:</span>
                                                        <span className="d-inline-block">{detailObject.studentName}</span>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Middle Name:</span>
                                                        <span className="d-inline-block"></span>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Last Name: </span>
                                                        <span className="d-inline-block"></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Father's Name:</span>
                                                        <span className="d-inline-block"></span>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Father's Middle Name:</span>
                                                        <span className="d-inline-block"></span>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Father's Last Name</span>
                                                        <span className="d-inline-block"></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Mother's Name:</span>
                                                        <span className="d-inline-block"></span>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Mother's Middle Name:</span>
                                                        <span className="d-inline-block"></span>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Mother's Last Name</span>
                                                        <span className="d-inline-block"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-container">
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Date Of Birth</span>
                                                        <span className="d-inline-block"></span>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Sex</span>
                                                        <span className="d-inline-block"></span>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Nationality</span>
                                                        <span className="d-inline-block">India</span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Contact Number</span>
                                                        <span className="d-inline-block">{detailObject.contactNumber}</span>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Alternate Contact Number</span>
                                                        <span className="d-inline-block">{detailObject.alternateMobileNumber}</span>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 mb-2 adminDetails">
                                                        <span className="d-inline-block profile-label">Email</span>
                                                        <span className="d-inline-block">{detailObject.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default graphql(GET_ADMISSION_DATA, {
    options: ({ }) => ({
        variables: {
            branchId: 1851
        }
    })
})(withLoadingHandler(
    graphql(SEARCH_ADMISSION_ON_TYPE, {
        name: "mutate"
    })(AdminssionInfo)
));
