import * as React from 'react';
import { addAdmissionSettingsServices } from '../_services/addAdmissionSettings.services';
import '../_static/css/custom.css';
import * as ReactSurvey from "xform-react";
import "xform-react/xform.min.css";

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

export class AddadminssionInfo extends React.Component {
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
            }
        };
        this.reassignConfig();
        this.onAdmissionDetailsChanged = this.onAdmissionDetailsChanged.bind(this);
        this.onCompleteAdmissionDetailsForm = this.onCompleteAdmissionDetailsForm.bind(this);
    }

    getStudentImage = (e) => {
        const { admissionData } = this.state;
        admissionData.uploadPhoto = URL.createObjectURL(e.target.files[0]);
        var r = new FileReader();
        r.onload = function (e) {
            admissionData.fileName = e.target.result;
            console.log('Image converted to base64 on upload :\n\n' + admissionData.fileName);
        };
        r.readAsDataURL(e.target.files[0]);

        this.setState({
            admissionData: admissionData
        })
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

    onAdmissionDetailsChanged( sender, options) {
        let { admissionData } = this.state;
        let department = sender.getQuestionByName("department");
        let batch = sender.getQuestionByName("batch");
        switch (options.name) {
            case "branch":
                department.value = "";
                department.choices = [];
                batch.value = "";
                batch.choices = [];
                break;
            case "department":
                batch.value = "";
                batch.choices = [];
                break;
            case "state":
                let city = sender.getQuestionByName("city");
                let state = sender.getQuestionByName("state");
                city.value = "";
                city.choices = [];
                break;
        }
    }

    ADMISSION_DETAILS = {};
    reassignConfig(){
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
                    choices: [],
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
    }

    render() {
        return(
            <section className="xform-container">
                <div className="student-profile-container">
                    <div className="row">
                        <div className="col-sm-12 mb-2 profile-header ">
                            <div className="d-inline-block float-left heading">Admin - Add Admission</div>
                            <div className="ml-5 d-inline-block">
                                <input type="radio" id="draft" name="activeRadio" onChange={this.handleRadioChange} value="draft" checked={this.state.activeRadio === "draft"} />
                                <label className="d-inline-block" htmlFor="draft">Draft</label>
                                <input type="radio" id="active" value="active" name="activeRadio" onChange={this.handleRadioChange} checked={this.state.activeRadio === "active"} className="ml-5"/>
                                <label className="d-inline-block" htmlFor="active">Active</label>
                            </div>
                            <div className="d-inline-block float-right">
                                <span className="mr-2 data-saved-message" style={{ fontSize: "13px", color: "#AA0000", display: "none" }}>Data Saved</span>
                                <button className="btn bs" type="submit" onClick={this.saveAllForm}>Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 border">
                        <div className="col-md-6 col-sm-12">
                            <img className="student-photo my-3" id="stPhoto" />
                        </div>
                        <div className="col-md-6 col-sm-12 my-3 grafana-style">
                            <input type="file" accept="image/*" id="stImageUpload" onChange={this.getStudentImage} />
                            <div>
                                <ReactSurvey.Survey json={this.ADMISSION_DETAILS} css={customCss} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div>
                                {/* <Survey.SurveyCollapseForm json={this.PERSONAL} css={customCss} onComplete={this.onCompletePersonalForm} ref={this.personalFormRef} /> */}
                            </div>
                            <div>
                                {/* <Survey.SurveyCollapseForm json={this.ACADEMIC_HISTORY} css={customCss} onComplete={this.onCompleteAcademicHistoryForm} showCompletedPage={false} ref={this.academicHistoryFormRef} /> */}
                            </div>
                            <div>
                                {/* <Survey.SurveyCollapseForm json={this.DOCUMENTS} css={customCss} showCompletedPage={false} ref={this.documentsFormRef} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}