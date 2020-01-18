import * as React from 'react';
import { graphql } from 'react-apollo';
import * as ReactSurvey from "xform-react";
import "xform-react/xform.min.css";
import { editStudentSettingsServices } from '../_services/editStudentSettings.services';
import '../_static/css/custom.css';
import withLoadingHandler from '../_helpers/loading.handler';
import { GET_STUDENT_EDIT_DATA, EDIT_STUDENT } from '../_queries/EditStudent';

const customCss = {
    root: "form-container",
    header: "form-header",
    headerError: "form-header-error",
    headerNoError: "form-header-success",
    footer: "panel-footer card-footer text-right",
    body: "form-body",
    question: {
        title: "form-control-label",
        mainRoot: "form-control-container sv_qstn"
    },
    text: "input-form-control",
    dropdown: {
        control: "select-form-control",
    },
    navigation: {
        complete: "btn bs d-none"
    },
    error: {
        root: "error"
    }
};

class EditstudentsInfo extends React.Component {
    personalFormRef = [];
    contactFormRef = [];
    totalResult = [];
    cumulativeResult = [];
    emergencyContactFormRef = [];
    constructor(props) {
        super(props);
        this.state = {
            studentData: [],
            departments: [],
            branches: [],
            batches: [],
            sections: [],
            submitted: false,
            isApiCalled: false,
            showMessage: false,
            uploadPhoto: null
        }
        this.reassignConfig();
        this.createDepartments = this.createDepartments.bind(this);       
        this.createBranches = this.createBranches.bind(this);
        this.createBatches = this.createBatches.bind(this);
        this.createSections = this.createSections.bind(this);
        this.createStudentTypeOptions = this.createStudentTypeOptions.bind(this);
        this.onCompletePersonalForm = this.onCompletePersonalForm.bind(this);
        this.personalFormRef = React.createRef();
        this.onCompleteContactDetailsForm = this.onCompleteContactDetailsForm.bind(this);
        this.contactFormRef = React.createRef();
        this.onCompleteEmergencyContactDetails = this.onCompleteEmergencyContactDetails.bind(this);
        this.emergencyContactFormRef = React.createRef();
        this.toggleTab = this.toggleTab.bind(this);
        this.sendData = this.sendData.bind(this);
        this.saveAllForms = this.saveAllForms.bind(this);
        this.emergencyContactFormRef = React.createRef();
    }

    getStudentImage = (e) => {
        const { studentData } = this.state;
        studentData.fileName = e.target.files[0].name;
        studentData.uploadPhoto = URL.createObjectURL(e.target.files[0]);
        var r = new FileReader();
        r.onload = function (e) {
            studentData.fileName = e.target.result;
        };
        r.readAsDataURL(e.target.files[0]);

        this.setState({
            studentData: studentData
        })
    }

    onChange = (e) => {
        const { name, value } = e.nativeEvent.target;
        const { studentData } = this.state;
        if (name === "department") {
            this.setState({
                studentData: {
                    ...studentData,
                    department: {
                        id: value
                    },
                    batch: {
                        id: ""
                    },
                    section: {
                        id: ""
                    }
                }
            });
        } else if (name === "branch") {
            this.setState({
                studentData: {
                    ...studentData,
                    branch: {
                        id: value
                    }
                }
            });
        } else if (name === "section") {
            this.setState({
                studentData: {
                    ...studentData,
                    section: {
                        id: value
                    }
                }
            });
        } else if (name === "studentType") {
            this.setState({
                studentData: {
                    ...studentData,
                    studentType: value
                }
            });
        } else if (name === "batch") {
            this.setState({
                studentData: {
                    ...studentData,
                    batch: {
                        id: value
                    },
                    section: {
                        id: ""
                    }
                }
            });
        } else {
            this.setState({
                studentData: {
                    ...studentData,
                    [name]: value
                }
            });
        }
    }

    createDepartments(departments, selectedDepartmentId) {
        let departmentsOptions = [<option key={0} value="">Select department</option>];
        for (let i = 0; i < departments.length; i++) {
            departmentsOptions.push(
                <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
            );
        }
        return departmentsOptions;
    }

    createBranches(branches, selectedBranchID) {
        let branchesOptions = [<option key={0} value="">Select Branch</option>];
        for (let i = 0; i < branches.length; i++) {
            branchesOptions.push(
                <option key={branches[i].id} value={branches[i].id}>{branches[i].branchName}</option>
            );
        }
        return branchesOptions;
    }

    createBatches(batches, selectedBatchId, selectedDepartmentId) {
        let batchesOptions = [<option key={0} value="">Select Year</option>];
        for (let i = 0; i < batches.length; i++) {
            let id = batches[i].id;
            if (batches[i].departmentId == selectedDepartmentId) {
                batchesOptions.push(
                    <option key={id} value={id}>{batches[i].batch}</option>
                );
            }
        }
        return batchesOptions;
    }

    createSections(sections, selectedSectionId, selectedBatchId) {
        let sectionsOptions = [<option key={0} value="">Select Section</option>];
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].batchId == selectedBatchId) {
                let id = sections[i].id;
                sectionsOptions.push(
                    <option key={id} value={id}>{sections[i].section}</option>
                );
            }
        }
        return sectionsOptions;
    }

    createStudentTypeOptions(selectedType) {
        let studentTypes = {
            REGULAR: "REGULAR",
            STAFF_CONCESSION: "STAFF_CONCESSION",
            BENEFITS: "BENEFITS",
            SCHOLARSHIP: "SCHOLARSHIP",
            OTHER_BENEFITS: "OTHER_BENEFITS"
        }
        let studentTypesOptions = [<option key={0} value="">Select Type</option>];
        for (let i in studentTypes) {
            let studentType = studentTypes[i];
            studentTypesOptions.push(
                <option key={studentType} value={studentType} selected={selectedType === studentType}>{studentType}</option>
            );
        }
        return studentTypesOptions;
    }

    onCompletePersonalForm(result) {
        result.clear(false, true);
        this.totalResult += 1;
        this.cumulativeResult = {
            ...this.cumulativeResult,
            ...result.data
        };
        if (this.totalResult === 4) {
            this.sendData();
        }
    }

    onCompleteContactDetailsForm(result) {
        result.clear(false, true);
        this.totalResult += 1;
        this.cumulativeResult = {
            ...this.cumulativeResult,
            ...result.data
        };
        if (this.totalResult === 4) {
            this.sendData();
        }
    }

    onCompleteEmergencyContactDetails(result) {
        result.clear(false, true);
        this.totalResult += 1;
        this.cumulativeResult = {
            ...this.cumulativeResult,
            ...result.data
        };
        if (this.totalResult === 4) {
            this.sendData();
        }
    }

    saveAllForms(e) {
        e.preventDefault();
        this.totalResult = 0;
        this.cumulativeResult = {};
        this.personalFormRef.current.survey.completeLastPage();
        this.contactFormRef.current.survey.completeLastPage();
        this.emergencyContactFormRef.current.survey.completeLastPage();
        
    }

    sendData() {
        const { addStudentMutation } = this.props;
        this.setState({
            isApiCalled: true
        });
        return addStudentMutation({
            variables: {
                input: {
                    ...this.cumulativeResult
                }
            },
        }).then((data) => {
            this.setState({
                isApiCalled: false,
                showMessage: true
            });

        }).catch((error) => {
            this.setState({
                isApiCalled: false,
                showMessage: false
            });
        });
    }

    PERSONAL = {};
    CONTACT_DATA = {};
    EMERGENCY_CONTACT_DATA = {};
    ADMISSION_DETAILS = {};

    reassignConfig() {
        this.PERSONAL = {
            title: "Personal Details",
            showQuestionNumbers: "off",
            elements: [
                {
                    type: "text",
                    name: 'studentName',
                    title: 'Name',
                    requiredErrorText: 'Please enter Name',
                    isRequired: true,
                    startWithNewLine: false
                },
                {
                    type: "text",
                    name: 'studentMiddleName',
                    title: 'Middle Name',
                    requiredErrorText: 'Please enter Middle Name',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'studentLastName',
                    title: 'Last Name',
                    requiredErrorText: 'Please enter Last Name',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'fatherName',
                    title: 'Father Name',
                    requiredErrorText: 'Please enter Father Name',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'fatherMiddleName',
                    title: 'Father Middle Name',
                    requiredErrorText: 'Please enter Father Middle Name',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'fatherLastName',
                    title: 'Father Last Name',
                    requiredErrorText: 'Please enter Father Last Name',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'motherName',
                    title: 'Mother Name',
                    requiredErrorText: 'Please enter Mother Name',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'motherMiddleName',
                    title: 'Mother Middle Name',
                    requiredErrorText: 'Please enter Mother Middle Name',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'motherLastName',
                    title: 'Mother Last Name',
                    requiredErrorText: 'Please enter Mother Last Name',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'aadharNo',
                    title: 'Aadhar No',
                    requiredErrorText: 'Please enter Aadhar No',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    inputType: "date",
                    name: 'dateOfBirth',
                    title: 'Date Of Birth',
                    requiredErrorText: 'Please enter Date Of Birth',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'placeOfBirth',
                    title: 'Place of Birth',
                    requiredErrorText: 'Please enter Place of Birth',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: 'dropdown',
                    name: 'religion',
                    title: 'Religion',
                    requiredErrorText: 'Please enter Religion',
                    isRequired: true,
                    startWithNewLine: false,
                    choices: [
                        {
                            value: "HINDU",
                            text: "HINDU"
                        },
                        {
                            value: "MUSLIM",
                            text: "MUSLIM"
                        },
                        {
                            value: "CHRISTIAN",
                            text: "CHRISTIAN"
                        }
                    ]
                },
                {
                    type: 'dropdown',
                    name: 'caste',
                    title: 'Caste',
                    requiredErrorText: 'Please enter Caste',
                    isRequired: true,
                    startWithNewLine: false,
                    choices: [
                        {
                            value: "GENERAL",
                            text: "GENERAL"
                        },
                        {
                            value: "OBC",
                            text: "OBC"
                        },
                        {
                            value: "SC",
                            text: "SC"
                        },
                        {
                            value: "ST",
                            text: "ST"
                        }
                    ]
                },
                {
                    type: "text",
                    name: 'subCaste',
                    title: 'Sub Caste',
                    requiredErrorText: 'Please enter Sub Caste',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'age',
                    title: 'Age',
                    requiredErrorText: 'Please enter Age',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: 'dropdown',
                    name: 'sex',
                    title: 'Gender',
                    requiredErrorText: 'Please enter Gender',
                    isRequired: true,
                    startWithNewLine: false,
                    choices: [
                        {
                            value: "MALE",
                            text: "MALE"
                        },
                        {
                            value: "FEMALE",
                            text: "FEMALE"
                        },
                        {
                            value: "OTHER",
                            text: "OTHER"
                        }
                    ]
                },
                {
                    type: 'dropdown',
                    name: 'bloodGroup',
                    title: 'Blood Group',
                    requiredErrorText: 'Please enter Blood Group',
                    isRequired: true,
                    startWithNewLine: false,
                    choices: [
                        {
                            value: "APOSITIVE",
                            text: "APOSITIVE"
                        },
                        {
                            value: "ANEGATIVE",
                            text: "ANEGATIVE"
                        },
                        {
                            value: "ABPOSITIVE",
                            text: "ABPOSITIVE"
                        },
                        {
                            value: "ABNEGATIVE",
                            text: "ABNEGATIVE"
                        },
                        {
                            value: "OPOSITIVE",
                            text: "OPOSITIVE"
                        },
                        {
                            value: "ONEGATIVE",
                            text: "ONEGATIVE"
                        },
                        {
                            value: "BPOSITIVE",
                            text: "BPOSITIVE"
                        },
                        {
                            value: "BNEGATIVE",
                            text: "BNEGATIVE"
                        }
                    ]
                }
            ]
        };
        this.CONTACT_DATA = {
            title: "Contact Details",
            showQuestionNumbers: "off",
            elements: [
                {
                    type: "text",
                    name: 'addressLineOne',
                    title: 'Address Line One',
                    requiredErrorText: 'Please enter address line 1',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'addressLineTwo',
                    title: 'Address Line Two',
                    requiredErrorText: 'Please enter address line 2',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'addressLineThree',
                    title: 'Address Line Three',
                    requiredErrorText: 'Please enter address line 3',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'town',
                    title: 'Town',
                    requiredErrorText: 'Please enter town',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'state',
                    title: 'State',
                    requiredErrorText: 'Please enter state',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'country',
                    title: 'Country',
                    requiredErrorText: 'Please enter country',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'pincode',
                    title: 'Pincode',
                    requiredErrorText: 'Please enter pincode',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'studentContactNumber',
                    title: 'Student Contact Number',
                    requiredErrorText: 'Please enter student contact number',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'alternateContactNumber',
                    title: 'Alternate Contact Number',
                    requiredErrorText: 'Please enter alternate contact number',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'studentEmailAddress',
                    title: 'Student Email Address',
                    requiredErrorText: 'Please enter student email address',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'alternateEmailAddress',
                    title: 'Alternate Email Address',
                    requiredErrorText: 'Please enter alternate email address',
                    isRequired: true,
                    startWithNewLine: false,
                }
            ]
        };
        this.EMERGENCY_CONTACT_DATA = {
            title: "Primary and Emergency Contact Details",
            showQuestionNumbers: "off",
            elements: [
                {
                    type: "dropdown",
                    name: 'relationWithStudent',
                    title: 'Relation with Student',
                    requiredErrorText: 'Please enter relation',
                    isRequired: true,
                    startWithNewLine: false,
                    choices: [
                        {
                            value: "MOTHER",
                            text: "MOTHER"
                        },
                        {
                            value: "FATHER",
                            text: "FATHER"
                        },
                        {
                            value: "GUARDIAN",
                            text: "GUARDIAN"
                        }
                    ]
                },
                {
                    type: "text",
                    name: 'emergencyContactName',
                    title: 'Emergency Contact First Name',
                    requiredErrorText: 'Please enter first name',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'emergencyContactMiddleName',
                    title: 'Emergency Contact Middle Name',
                    requiredErrorText: 'Please enter middle name',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'emergencyContactLastName',
                    title: 'Emergency Contact Last Name',
                    requiredErrorText: 'Please enter last name',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'emergencyContactNo',
                    title: 'Emergency Contact Number',
                    requiredErrorText: 'Please enter emergency contact no',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'alternateContactNumber',
                    title: 'Alternate Contact Number',
                    requiredErrorText: 'Please enter alternate contact number',
                    isRequired: true,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'emergencyContactEmailAddress',
                    title: 'Emergency Contact Email Address',
                    requiredErrorText: 'Please enter email address',
                    isRequired: true,
                    startWithNewLine: false,
                }
            ]
        };
        let branches = this.props.data.createStudentFilterDataCache ? this.props.data.createStudentFilterDataCache.branches : [];
        this.ADMISSION_DETAILS = {
            title: "",
            showQuestionNumbers: "off",
            elements: [
                {
                    type: "text",
                    name: "admissionNo",
                    title: "Admission No",
                    isRequired: true,
                    maxLength: 50,
                    startWithNewLine: true,
                    requiredErrorText: "Please enter Admission No"
                },
                {
                    type: "text",
                    name: "rollNo",
                    title: "Roll No",
                    isRequired: true,
                    maxLength: 50,
                    startWithNewLine: true,
                    requiredErrorText: "Please enter Admission No"
                },
                {
                    type: 'dropdown',
                    name: 'branchId',
                    title: 'Branch',
                    requiredErrorText: 'Please enter Branch',
                    isRequired: true,
                    startWithNewLine: true,
                    choices: this.createBranches(branches),
                    defaultValue: ""
                },
                {
                    type: 'dropdown',
                    name: 'departmentId',
                    title: 'Department',
                    requiredErrorText: 'Please enter Department',
                    isRequired: true,
                    startWithNewLine: true,
                    choices: [],
                    defaultValue: ""
                },
                {
                    type: 'dropdown',
                    name: 'batchId',
                    title: 'Year',
                    requiredErrorText: 'Please enter Year',
                    isRequired: true,
                    startWithNewLine: true,
                    choices: [],
                    defaultValue: ""
                },
                {
                    type: 'dropdown',
                    name: 'sectionId',
                    title: 'Section',
                    requiredErrorText: 'Please select Section',
                    isRequired: true,
                    startWithNewLine: true,
                    choices: [],
                    defaultValue: ""
                },
                {
                    type: 'dropdown',
                    name: 'studentType',
                    title: 'Student Type',
                    requiredErrorText: 'Please select Student Type',
                    isRequired: true,
                    startWithNewLine: true,
                    choices: []
                },

            ]
        };
    }

    toggleTab(tabNo) {
        this.setState({
            activeTab: tabNo,
        });
    }

    render() {
        const { studentData, departments, batches, branches, sections } = this.state;
        const { isApiCalled, showMessage } = this.state;
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
                <div className="m-2">
                    <div className="student-profile-container mb-2">
                        <div className="row">
                            <div className="col-12 mb-2 profile-header">
                                <div className="d-inline-block float-left heading">Student Profile</div>
                                <div className="d-inline-block float-right">
                                    <span className={"mr-2 data-saved-message " + (!showMessage ? 'd-none' : 'd-inline-block')}>Data Saved</span>
                                    <button className="btn bs" type="submit" onClick={this.saveAllForms} disabled={isApiCalled}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-12 form-main-container">
                            <div className="row">
                                <div className="col-12 col-lg-3 col-md-12 col-sm-12 left-part grafana-style">
                                    <div className="row">
                                        <div className="col-12 col-lg-12 col-md-6 col-sm-6">
                                            <img className="student-photo my-3" id="stPhoto" src={this.state.uploadPhoto} />
                                        </div>
                                        <div className="col-12 col-lg-12 col-md-6 col-sm-6 my-3 ">
                                            <input type="file" accept="image/*" id="stImageUpload"></input>
                                            <div className="gf-form">
                                                <span className="gf-form-label width-8">Admission No</span>
                                                <input name="admissionNo" value={studentData.admissionNo} onChange={this.onChange} type="text" className="gf-form-input" />
                                            </div>
                                            <div className="gf-form">
                                                <span className="gf-form-label width-8">Roll No</span>
                                                <input name="rollNo" type="text" className="gf-form-input max-width-22" value={studentData.rollNo} onChange={this.onChange} />
                                            </div>
                                            <div className="gf-form">
                                                <span className="gf-form-label width-8">Department</span>
                                                <select name="department" onChange={this.onChange} value={studentData.department} className="gf-form-input max-width-22">
                                                    {this.createDepartments(departments, studentData.department)}
                                                </select>
                                            </div>
                                            <div className="gf-form">
                                                <span className="gf-form-label width-8">Year</span>
                                                <select name="batch" onChange={this.onChange} value={studentData.batch} className="gf-form-input max-width-22">
                                                    {this.createBatches(batches, studentData.batch, studentData.department)}
                                                </select>
                                            </div>
                                            <div className="gf-form">
                                                <span className="gf-form-label width-8">Branch</span>
                                                <select name="branch" onChange={this.onChange} value={studentData.branch} className="gf-form-input max-width-22">
                                                    {this.createBranches(branches, studentData.branch)}
                                                </select>
                                            </div>
                                            <div className="gf-form">
                                                <span className="gf-form-label width-8">Section</span>
                                                <select name="section" onChange={this.onChange} value={studentData.section} className="gf-form-input max-width-22">
                                                    {this.createSections(sections, studentData.section, studentData.batch)}
                                                </select>
                                            </div>
                                            <div className="gf-form">
                                                <span className="gf-form-label width-8">Student Type</span>
                                                <select name="studentType" onChange={this.onChange} value={studentData.studentType} className="gf-form-input max-width-22">
                                                    {this.createStudentTypeOptions(studentData.studentType)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-9 col-md-12 col-sm-12 right-part custom-style">
                                    <div className="row">
                                        <ReactSurvey.SurveyCollapseForm json={this.PERSONAL} css={customCss} onComplete={this.onCompletePersonalForm} ref={this.personalFormRef} showCompletedPage={false} />
                                    </div>
                                    <div className="row">
                                        <ReactSurvey.SurveyCollapseForm json={this.CONTACT_DATA} css={customCss} onComplete={this.onCompleteContactDetailsForm} ref={this.contactFormRef} showCompletedPage={false} />
                                    </div>
                                    <div className="row">
                                        <ReactSurvey.SurveyCollapseForm json={this.EMERGENCY_CONTACT_DATA} css={customCss} onComplete={this.onCompleteEmergencyContactDetails} ref={this.emergencyContactFormRef} showCompletedPage={false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    
}

export default graphql(GET_STUDENT_EDIT_DATA, {
    options: ({ }) => ({
        variables: {
            collegeId: 1801,
            academicYearId: 1701
        }
    })
})(withLoadingHandler(graphql(EDIT_STUDENT, { name: "editStudentMutation" })(EditstudentsInfo)));

