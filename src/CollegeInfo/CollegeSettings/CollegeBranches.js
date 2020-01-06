import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { collegeSettingsServices } from '../../_services/collegeSettings.services';

export class CollegeBranches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            states: [],
            cities: [],
            selectedState: "",
            selectedCity: ""
        };
        this.showModal = this.showModal.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.createCitySelectbox = this.createCitySelectbox.bind(this);
    }

    componentDidMount() {
        collegeSettingsServices.getStates().then(
            response => {
                this.setState({
                    states: response
                });
            },
            error => {
                console.log(error);
            }
        );
        collegeSettingsServices.getCities().then(
            response => {
                this.setState({
                    cities: response
                });
            },
            error => {
                console.log(error);
            }
        );
    }

    showModal(e, bShow) {
        e && e.preventDefault();
        this.setState(() => ({
            isModalOpen: bShow
        }));
    }

    handleStateChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    createCitySelectbox(selectedState) {
        const { cities } = this.state;
        let retData = [];
        selectedState = parseInt(selectedState);
        for (let i = 0; i < cities.length; i++) {
            let city = cities[i];
            if (selectedState === city.stateId) {
                retData.push(
                    <option key={city.id} value={city.id}>{city.cityName}</option>
                );
            }
        }
        return retData;
    }

    createStateSelectbox(stateList) {
        let retData = [];
        if (stateList.length > 0) {
            for (let i = 0; i < stateList.length; i++) {
                let item = stateList[i];
                retData.push(
                    <option value={item["id"]} key={item["id"]}>{item["stateName"]}</option>
                );
            }
        }
        return retData;
    }

    render() {
        const { isModalOpen, states, cities, selectedState, selectedCity } = this.state;
        return (
            <div className="info-container">
                <div className="authorized-signatory-container mb-3">
                    <h3>Colleges Branches</h3>
                    <small> Create and manage college branches.</small>
                </div>
                <button onClick={e => this.showModal(e, true)}>
                    <i className="fa fa-plus-circle"></i> Add new
                </button>
                <Modal isOpen={isModalOpen} className="react-strap-modal-container">
                    <ModalHeader>Add New</ModalHeader>
                    <ModalBody className="modal-content border-0">
                        <form className="gf-form-group container-fluid">
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <label className="gf-form-label border-0 bg-white">STATE</label>
                                    <select className="gf-form-input" name="selectedState" value={selectedState} onChange={this.handleStateChange} required>
                                        <option value="">
                                            Select State
                                        </option>
                                        {
                                            this.createStateSelectbox(states)
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="gf-form-label border-0 bg-white">CITY</label>
                                    <select className="gf-form-input" name="selectedCity" value={selectedCity} onChange={this.handleStateChange} required>
                                        <option value="">
                                            Select City
                                        </option>
                                        {this.createCitySelectbox(selectedState)}
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-12">
                                    <label className="gf-form-label border-0 bg-white">BRANCH NAME</label>
                                    <input type="text" required className="gf-form-input " placeholder="branch name" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <label className="gf-form-label border-0 bg-white">ADDRESS</label>
                                    <input type="text" required className="gf-form-input" placeholder="address line 2" />
                                </div>
                                <div className="col-md-6">
                                    <label className="gf-form-label border-0 bg-white"></label>
                                    <input type="text" required className="gf-form-input" placeholder="addresss line 1" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <label className="gf-form-label border-0 bg-white">BRANCH HEAD</label>
                                    <input type="text" required className="gf-form-input" placeholder="branch head" />
                                </div>
                                <div className="col-md-6">
                                    <label className="gf-form-label border-0 bg-white">COLLEGE</label>
                                    <select className="gf-form-input" required>
                                        <option value="">
                                            Select College
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-block w-100 mt-3 text-center">
                                <button type="submit" className="btn btn-success border-bottom mx-1">Save</button>
                                <button type="submit" className="btn btn-success border-bottom mx-1">Update</button>
                                <button className="btn btn-danger border-bottom mx-1" onClick={(e) => this.showModal(e, false)}>Cancel</button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
