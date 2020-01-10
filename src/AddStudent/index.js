import * as React from 'react';
import { graphql } from 'react-apollo';
import * as ReactSurvey from "xform-react";
import "xform-react/xform.min.css";
import { addStudentSettingsServices } from '../_services/addStudentSettings.services';
import '../_static/css/custom.css';
import withLoadingHandler from '../_helpers/loading.handler';
import { GET_STUDENT_ADMISSION_DATA, ADD_STUDENT } from '../_queries/AddStudent';


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

class AddstudentsInfo extends React.Component {
    personalFormRef = [];
    contactFormRef = [];
    totalResult = [];
    cumulativeResult = [];
    emergencyContactFormRef = [];
    admissionDetailsFormRef = [];
    constructor(props) {
        super(props);
        this.state = {
            isApiCalled: false,
            showMessage: false,
            uploadPhoto: null
        }
        this.reassignConfig();
        this.onAdmissionDetailsChanged = this.onAdmissionDetailsChanged.bind(this);
        this.onCompleteAdmissionDetailsForm = this.onCompleteAdmissionDetailsForm.bind(this);
        this.onCompleteContactDetailsForm = this.onCompleteContactDetailsForm.bind(this);
        this.onCompleteEmergencyContactDetails = this.onCompleteEmergencyContactDetails.bind(this);
        this.onCompletePersonalForm = this.onCompletePersonalForm.bind(this);
        this.createDepartments = this.createDepartments.bind(this);
        this.createBranches = this.createBranches.bind(this);
        this.createBatches = this.createBatches.bind(this);
        this.createSections = this.createSections.bind(this);
        this.createStudentTypeOptions = this.createStudentTypeOptions.bind(this);
        this.sendData = this.sendData.bind(this);
        this.saveAllForms = this.saveAllForms.bind(this);
        this.admissionDetailsFormRef = React.createRef();
        this.emergencyContactFormRef = React.createRef();
        this.personalFormRef = React.createRef();
        this.contactFormRef = React.createRef();
    }

    onAdmissionDetailsChanged(sender, options) {
        let department = sender.getQuestionByName("departmentId");
        let batch = sender.getQuestionByName("batchId");
        let section = sender.getQuestionByName("sectionId");
        let studentType = sender.getQuestionByName("studentType");
        switch (options.name) {
            case "branchId":
                department.value = "";
                department.choices = this.createDepartments(this.props.data.createStudentFilterDataCache.departments, options.value);
                batch.value = "";
                batch.choices = [];
                section.value = "";
                section.choices = [];
                studentType.value = "";
                studentType.choices = [];
                break;
            case "departmentId":
                batch.value = "";
                batch.choices = this.createBatches(this.props.data.createStudentFilterDataCache.batches, department.value);
                section.value = "";
                section.choices = [];
                studentType.value = "";
                studentType.choices = [];
                break;
            case "batchId":
                section.value = "";
                section.choices = this.createSections(this.props.data.createStudentFilterDataCache.sections, batch.value);
                studentType.value = "";
                studentType.choices = [];
                break;
            case "sectionId":
                studentType.value = "";
                studentType.choices = this.createStudentTypeOptions(this.props.data.createStudentFilterDataCache.studentTypes);
                break;
        }
    }

    createDepartments(departments, selectedBranchId) {
        let departmentsOptions = [];
        for (let i = 0; i < departments.length; i++) {
            if (selectedBranchId == departments[i].branch.id) {
                departmentsOptions.push({
                    value: departments[i].id,
                    text: departments[i].name
                });
            }
        }
        return departmentsOptions;
    }

    createBranches(branches) {
        let branchesOptions = [];
        for (let i = 0; i < branches.length; i++) {
            branchesOptions.push({
                value: branches[i].id,
                text: branches[i].branchName
            });
        }
        return branchesOptions;
    }

    createBatches(batches, selectedDepartmentId) {
        let batchesOptions = [];
        for (let i = 0; i < batches.length; i++) {
            let id = batches[i].id;
            let dptId = "" + batches[i].department.id;
            if (dptId == selectedDepartmentId) {
                batchesOptions.push({
                    value: id,
                    text: batches[i].batch
                });
            }
        }
        return batchesOptions;
    }

    createSections(sections, selectedBatchId) {
        let sectionsOptions = [];
        for (let i = 0; i < sections.length; i++) {
            let id = sections[i].id;
            let sbthId = "" + sections[i].batch.id;
            if (sbthId == selectedBatchId) {
                sectionsOptions.push({
                    value: id,
                    text: sections[i].section
                });
            }
        }
        return sectionsOptions;
    }

    createStudentTypeOptions(studentTypes) {
        let retData = [];
        for (let i = 0; i < studentTypes.length; i++) {
            retData.push({
                value: studentTypes[i].description,
                text: studentTypes[i].description
            });
        }
        return retData;
    }

    onCompleteAdmissionDetailsForm(result) {
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

    saveAllForms(e) {
        e.preventDefault();
        this.totalResult = 0;
        this.cumulativeResult = {};
        this.personalFormRef.current.survey.completeLastPage();
        this.contactFormRef.current.survey.completeLastPage();
        this.emergencyContactFormRef.current.survey.completeLastPage();
        this.admissionDetailsFormRef.current.survey.completeLastPage();
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


    render() {
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
                <div className="student-profile-container">
                    <div className="row">
                        <div className="col-12 mb-2 profile-header">
                            <div className="d-inline-block float-left heading">Student Profile</div>
                            <div className="d-inline-block float-right">
                                <span className={"mr-2 data-saved-message " + (!showMessage ? 'd-none' : 'd-inline-block')}>Data Saved</span>
                                <button className="btn bs" type="submit" onClick={this.saveAllForms} disabled={isApiCalled}>Save</button>
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
                                            <input type="file" accept="image/*" id="stImageUpload" ></input>
                                            <div>
                                                <ReactSurvey.Survey onValueChanged={this.onAdmissionDetailsChanged} json={this.ADMISSION_DETAILS} css={customCss} ref={this.admissionDetailsFormRef} onComplete={this.onCompleteAdmissionDetailsForm} />
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

export default graphql(GET_STUDENT_ADMISSION_DATA, {
    options: ({ }) => ({
        variables: {
            collegeId: 1801,
            academicYearId: 1701
        }
    })
})(withLoadingHandler(graphql(ADD_STUDENT, { name: "addStudentMutation" })(AddstudentsInfo)));

