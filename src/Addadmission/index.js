import * as React from 'react';
import { graphql } from 'react-apollo';
import { addAdmissionSettingsServices } from '../_services/addAdmissionSettings.services';
import '../_static/css/custom.css';
import * as ReactSurvey from "xform-react";
import "xform-react/xform.min.css";
import withLoadingHandler from '../_helpers/loading.handler';
import { CREATE_ADMISSION_DATA_CACHE, ADD_ADMISSION_APPLICATION } from '../_queries/AddAdmission';

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

class AddadminssionInfo extends React.Component {
    cumulativeResult = [];
    admissionFormRef = [];
    constructor(props) {
        super(props);
        this.state = {
            admissionData: {
                department: {
                    id: ""
                },
                batch: {
                    id: ""
                },
                branch: {
                    id: ""
                },
                state: {
                    id: ""
                },
                city: {
                    id: ""
                },
                course: {
                    id: ""
                }
            },
            activeRadio: "draft",
            fileName: "",
            departments: [],
            branches: [],
            batches: [],
            states: [],
            cities: []
        };
        this.reassignConfig();
        this.onAdmissionDetailsChanged = this.onAdmissionDetailsChanged.bind(this);
        this.onCompleteAdmissionDetailsForm = this.onCompleteAdmissionDetailsForm.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.saveAllForm = this.saveAllForm.bind(this);
        this.sendData = this.sendData.bind(this);
        this.createDepartments = this.createDepartments.bind(this);
        this.createBranches = this.createBranches.bind(this);
        this.createCities = this.createCities.bind(this);
        this.admissionFormRef = React.createRef();
    }

    handleRadioChange(e) {
        const { name, value } = e.target;
        this.isActive = value === "active";
        this.reassignConfig();
        this.setState({
            "activeRadio": value
        });
    }

    onCompleteAdmissionDetailsForm(result) {
        result.clear(false, true);
        this.totalResult += 1;
        this.cumulativeResult = {
            ...this.cumulativeResult,
            ...result.data
        };
        if (this.totalResult === 3) {
            this.sendData();
        }
    }

    onAdmissionDetailsChanged(sender, options) {
        let { admissionData } = this.state;
        let department = sender.getQuestionByName("department");
        let batch = sender.getQuestionByName("batch");
        switch (options.name) {
            case "branch":
                department.value = "";
                department.choices = this.createDepartments(this.props.data.createAdmissionDataCache.departments, options.value);
                batch.value = "";
                batch.choices = [];
                break;
            case "department":
                batch.value = "";
                batch.choices = this.createBatches(this.props.data.createAdmissionDataCache.batches, department.value)
                break;
            case "state":
                let city = sender.getQuestionByName("city");
                let state = sender.getQuestionByName("state");
                city.value = "";
                city.choices = this.createCities(this.props.data.createAdmissionDataCache.cities, state.value);
                break;
        }
    }

    createDepartments(departments, selectedBranchId) {
        let departmentsOptions = [];
        for (let i = 0; i < departments.length; i++) {
            let brId = "" + departments[i].branch.id;
            if (selectedBranchId == brId) {
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

    createCities(cities, selectedStateId) {
        let citiesOptions = [];
        for (let i = 0; i < cities.length; i++) {
            let ctId = "" + cities[i].state.id;
            if (selectedStateId == ctId) {
                citiesOptions.push({
                    value: cities[i].id,
                    text: cities[i].cityName
                });
            }
        }
        return citiesOptions;
    }

    getStudentImage = (e) => {
        const { admissionData } = this.state;
        admissionData.uploadPhoto = URL.createObjectURL(e.target.files[0]);
        var r = new FileReader();
        r.onload = function (e) {
            admissionData.fileName = e.target.result;
        };
        r.readAsDataURL(e.target.files[0]);

        this.setState({
            admissionData: admissionData
        })
    }

    sendData() {
        const { addAdmissionApplicationMutation } = this.props;
        return addAdmissionApplicationMutation({
            variables: {
                input: {
                    ...this.cumulativeResult
                }
            },
        }).then((data) => {
            console.log("success");
        }).catch((error) => {
            console.log("failure");
        });
    }

    ADMISSION_DETAILS = {};
    PERSONAL = {};
    ACADEMIC_HISTORY = {};
    DOCUMENTS = {};

    reassignConfig() {
        const branches = this.props.data.createAdmissionDataCache ? this.props.data.createAdmissionDataCache.branches : []
        this.ADMISSION_DETAILS = {
            title: "",
            showQuestionNumbers: "off",
            elements: [
                {
                    type: "text",
                    name: "admissionNo",
                    title: "Admission No",
                    isRequired: this.isActive,
                    maxLength: 50,
                    startWithNewLine: true,
                    requiredErrorText: "Please enter Admission No"
                },
                {
                    type: 'dropdown',
                    name: 'branch',
                    title: 'Branch',
                    requiredErrorText: 'Please enter Branch',
                    isRequired: this.isActive,
                    startWithNewLine: true,
                    choices: this.createBranches(branches),
                    defaultValue: ""
                },
                {
                    type: 'dropdown',
                    name: 'department',
                    title: 'Department',
                    requiredErrorText: 'Please enter Department',
                    isRequired: this.isActive,
                    startWithNewLine: true,
                    choices: [],
                    defaultValue: ""
                },
                {
                    type: 'dropdown',
                    name: 'batch',
                    title: 'Year',
                    requiredErrorText: 'Please enter Year',
                    isRequired: this.isActive,
                    startWithNewLine: true,
                    choices: [],
                    defaultValue: ""
                },
                {
                    type: 'dropdown',
                    name: 'state',
                    title: 'State',
                    requiredErrorText: 'Please enter State',
                    isRequired: this.isActive,
                    startWithNewLine: true,
                    choices: []
                },
                {
                    type: 'dropdown',
                    name: 'city',
                    title: 'City',
                    requiredErrorText: 'Please enter City',
                    isRequired: this.isActive,
                    startWithNewLine: true,
                    choices: [],
                    defaultValue: ""
                },
                {
                    type: 'dropdown',
                    name: 'course',
                    title: 'Course',
                    requiredErrorText: 'Please enter Course',
                    isRequired: this.isActive,
                    startWithNewLine: true,
                    choices: [],
                    defaultValue: ""
                },
            ]
        };

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
                    startWithNewLine: false,
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
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'fatherMiddleName',
                    title: 'Father Middle Name',
                    requiredErrorText: 'Please enter Father Middle Name',
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'fatherLastName',
                    title: 'Father Last Name',
                    requiredErrorText: 'Please enter Father Last Name',
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'motherName',
                    title: 'Mother Name',
                    requiredErrorText: 'Please enter Mother Name',
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'motherMiddleName',
                    title: 'Mother Middle Name',
                    requiredErrorText: 'Please enter Mother Middle Name',
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'motherLastName',
                    title: 'mother Last Name',
                    requiredErrorText: 'Please enter mother Last Name',
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },

                {
                    type: "text",
                    inputType: "date",
                    name: 'dateOfBirth',
                    title: 'Date Of Birth',
                    requiredErrorText: 'Please enter Date Of Birth',
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: 'dropdown',
                    name: 'sex',
                    title: 'Gender',
                    requiredErrorText: 'Please enter Gender',
                    isRequired: this.isActive,
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
                    type: "text",
                    name: 'contactNumber',
                    title: 'Student Contact Number',
                    requiredErrorText: 'Please enter Student Contact Number',
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'alternateMobileNumber',
                    title: 'Alternate Contact Number',
                    requiredErrorText: 'Please enter Alternate Contact Number',
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: 'email',
                    title: 'Student Email',
                    requiredErrorText: 'Please enter Student Email',
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },

            ]
        };

        this.ACADEMIC_HISTORY = {
            title: "Academic History",
            showQuestionNumbers: "off",
            elements: [
                {
                    type: 'text',
                    name: 'qualification',
                    title: 'Highest Qualification',
                    requiredErrorText: "Please enter Highest Qualification",
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: 'text',
                    name: 'yearOfPassing',
                    title: 'Year',
                    requiredErrorText: "Please enter Year",
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: 'text',
                    name: 'institution',
                    title: 'Institution',
                    requiredErrorText: "Please enter Institution",
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: 'text',
                    name: 'university',
                    title: 'Board/University',
                    requiredErrorText: "Please enter Board/University",
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: 'text',
                    name: 'enrollmentNo',
                    title: 'Enrollment No',
                    requiredErrorText: "Please enter Enrollment No",
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: 'text',
                    name: 'score',
                    title: 'Score',
                    requiredErrorText: "Please enter Score",
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
                {
                    type: 'text',
                    name: 'percentage',
                    title: 'Percentage',
                    requiredErrorText: "Please enter Percentage",
                    isRequired: this.isActive,
                    startWithNewLine: false,
                },
            ]
        };

        this.DOCUMENTS = {
            title: "Documents",
            showQuestionNumbers: "off",
            elements: [
                {
                    type: 'text',
                    name: 'documentName',
                    title: 'Document Name',
                    isRequired: this.isActive,
                    requiredErrorText: 'Please enter Document Name',
                    startWithNewLine: false,
                },
                {
                    type: 'text',
                    name: 'upload',
                    title: 'Upload',
                    isRequired: this.isActive,
                    requiredErrorText: 'Please enter Upload',
                    startWithNewLine: false,
                },
            ]
        };
    }

    saveAllForm() {
        this.totalResult = 0;
        this.cumulativeResult = {};
        this.admissionFormRef.current.survey.completeLastPage();
    }

    render() {
        return (
            <section className="xform-container">
                <div className="student-profile-container">
                    <div className="row">
                        <div className="col-sm-12 mb-2 profile-header ">
                            <div className="d-inline-block float-left heading">Admin - Add Admission</div>
                            <div className="ml-5 d-inline-block">
                                <input type="radio" id="draft" name="activeRadio" onChange={this.handleRadioChange} value="draft" checked={this.state.activeRadio === "draft"} />
                                <label className="d-inline-block" htmlFor="draft">Draft</label>
                                <input type="radio" id="active" value="active" name="activeRadio" onChange={this.handleRadioChange} checked={this.state.activeRadio === "active"} className="ml-5" />
                                <label className="d-inline-block" htmlFor="active">Active</label>
                            </div>
                            <div className="d-inline-block float-right">
                                <span className="mr-2 data-saved-message" style={{ fontSize: "13px", color: "#AA0000", display: "none" }}>Data Saved</span>
                                <button className="btn bs" type="submit" onClick={this.saveAllForm}>Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="row form-main-container">
                        <div className="col-12 col-lg-3 col-md-12 col-sm-12 left-part grafana-style">
                            <div className="row">
                                <div className="col-12 col-lg-12 col-md-6 col-sm-6">
                                    <img className="student-photo my-3" id="stPhoto" />
                                </div>
                                <div className="col-12 col-lg-12 col-md-6 col-sm-6 my-3 ">
                                    <input type="file" accept="image/*" id="stImageUpload" onChange={this.getStudentImage} />
                                    <ReactSurvey.Survey onValueChanged={this.onAdmissionDetailsChanged} json={this.ADMISSION_DETAILS} css={customCss} ref={this.admissionFormRef} onComplete={this.onCompleteAdmissionDetailsForm} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 col-md-12 col-sm-12 right-part custom-style">
                            <div className="row">
                                <ReactSurvey.SurveyCollapseForm json={this.PERSONAL} css={customCss} ref={this.personalFormRef} />
                            </div>
                            <div className="row">
                                <ReactSurvey.SurveyCollapseForm json={this.ACADEMIC_HISTORY} css={customCss} />
                            </div>
                            <div className="row">
                                <ReactSurvey.SurveyCollapseForm json={this.DOCUMENTS} css={customCss} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default graphql(CREATE_ADMISSION_DATA_CACHE, {
})(withLoadingHandler(
    graphql(ADD_ADMISSION_APPLICATION, {
        name: "addAdmissionMutation"
    })(AddadminssionInfo)
));


