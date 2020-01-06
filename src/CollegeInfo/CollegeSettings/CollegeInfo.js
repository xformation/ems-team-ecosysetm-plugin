import * as React from 'react';
import { collegeSettingsServices } from '../../_services/collegeSettings.services';
import logo from "../../_static/img/college_logo.png";
import bg from "../../_static/img/dashboard.png";

export class CollegeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoSrc: "",
            backgroundSrc: "",
            shortName: "",
            instructionInformation: "",
            is_api_progress: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleImageChange(e) {
        const { files, name } = e.target;
        if (files.length > 0) {
            const result = this.toBase64(files[0]);
            result.then((base64) => {
                this.setState({
                    [name]: base64
                });

            }).catch(() => {

            });
        } else {
            this.setState({
                [name]: null
            });

        }

    }

    handleSubmit(e) {
        e.preventDefault();
        const { logoSrc, backgroundSrc, shortName, instructionInformation } = this.state;
        const sendData = {
            shortName,
            instructionInformation,
            logoImage: logoSrc,
            bgImage: backgroundSrc
        };
        this.setState({
            is_api_progress: true
        });
        collegeSettingsServices.saveCollege(sendData).then(
            response => {
                if (response === 200 || response === 201) {
                    alert('College data saved successfully.');
                } else if (response === 500) {
                    alert('College already exists.');
                } else {
                    alert('Due to some error college data could not be saved!');
                }
                this.setState({
                    is_api_progress: false
                });
            },
            error => {
                alert("Due to some error college data could not be saved!");
                this.setState({
                    is_api_progress: false
                });
            }
        );
    }

    handleStateChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    render() {
        const { logoSrc, backgroundSrc, shortName, instructionInformation, is_api_progress } = this.state;
        return (
            <div className="info-container">
                <div className="authorized-signatory-container mb-3">
                    <h3>College Info </h3>
                    <small>You can customise the login page using the settings here.</small>
                </div>
                <form name="collegeForm" className="gf-form-group section mb-3" onSubmit={this.handleSubmit}>
                    <h5 className="form-h5">SHORT NAME</h5>
                    <div className="gf-form mb-3">
                        <input type="text" className="gf-form-input max-width-18" placeholder="St. Joseph College" maxLength={255} required={true} name="shortName" value={shortName} onChange={this.handleStateChange} />
                    </div>
                    <h5 className="form-h5 mt-1">LOGO</h5>
                    <small>Logo dimensions cannot exceed 60px height 100px width.</small>
                    <div className="logo-container d-flex mb-3 mt-3">
                        <img className="logo mb-1" src={logoSrc || logo} />
                        <div className="gf-form mb-1">
                            <label className="upload-cursor">
                                <input id="d-none" type="file" className="gf-form-file-input d-none" accept="image/*" onChange={this.handleImageChange} name="logoSrc" />
                                Upload <i className="fa fa-info-circle l-grey"></i>
                            </label>
                        </div>
                    </div>
                    <div className="logo-container ">
                        <h5 className="form-h5">BACKGROUND IMAGE</h5>
                        <small>Background size cannot exceed 2MB and dimensions of 768px height or 200px width.</small>
                        <img className="background mt-1 mb-2" src={backgroundSrc || bg} />
                        <div className="gf-form mb-2">
                            <label className="upload-cursor">
                                <input id="d-none" type="file" className="gf-form-file-input d-none" accept="image/*" onChange={this.handleImageChange} name="backgroundSrc" />
                                PICK DIFFERENT BACKGROUND <i className="fa fa-info-circle l-grey"></i>
                            </label>
                        </div>
                    </div>
                    <div className="section ">
                        <h5 className="form-h5">INSTRUCTION INFORMATION</h5>
                        <small>You can provide instruction or similar information not exceeding 250 characters.</small>
                        <div className="gf-form mb-2">
                            <textarea className="gf-form-input ht-150" maxLength={255} name="instructionInformation" value={instructionInformation} onChange={this.handleStateChange}></textarea>
                        </div>
                        <div className="gf-form-button-row">
                            <button type="submit" className="btn bs" disabled={is_api_progress}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
