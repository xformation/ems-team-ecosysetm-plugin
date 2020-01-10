import * as React from 'react';

export default class ConfigurePage extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectboxChange = this.onSelectboxChange.bind(this);
    }

    onSelectboxChange(e) {
        const { name, value } = e.target;
        window.microsoftTeams.settings.setValidityState(value === 'first' || value === 'second' || value === 'college-info' || value === 'admission' || value === 'addadmission' );
    }

    render() {
        return (
            <section className="">
                <h2>Configure your app here</h2>
                <div>
                    <div>
                        <label>Select the tab you would like to see:</label>
                        <select id="tabChoice" onChange={this.onSelectboxChange}>
                            <option value="">Select a tab</option>
                            <option value="college-info">College Info</option>
                            <option value="admission">Admission Info</option>
                            <option value="addadmission">Add Admission</option>
                            <option value="addstudent">Add Student</option>
                        </select>
                    </div>
                </div>
            </section>
        );
    }
}
