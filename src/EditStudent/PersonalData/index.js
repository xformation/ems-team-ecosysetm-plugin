import * as React from 'react';

import { GrafanaInputFactory, GrafanaSelectInputFactory } from '../../components/form/FormElements';
//import { NotEmpty } from '../../components/form/Constraints';
//import PartialForm from '../../components/form/PartialForm';

const personalDataForm = [
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'studentName',
        label: 'Student Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'fatherName',
        label: 'Father Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'fatherMiddleName',
        label: 'Father Middle Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'fatherLastName',
        label: 'Father Last Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'motherName',
        label: 'Mother Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'motherMiddleName',
        label: 'Mother Middle Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'motherLastName',
        label: 'mother Last Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'aadharNo',
        label: 'Adhar No',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'dateOfBirth',
        label: 'Date Of Birth',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'placeOfBirth',
        label: 'Place Of Birth',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaSelectInputFactory,
        name: 'religion',
        label: 'Religion',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
        options: [
            {
                id: "HINDU",
                name: "HINDU"
            },
            {
                id: "MUSLIM",
                name: "MUSLIM"
            },
            {
                id: "CHIRSTIAN",
                name: "CHIRSTIAN"
            }
        ]
    },
    {
        elementComponentFactory: GrafanaSelectInputFactory,
        name: 'caste',
        label: 'Caste',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
        options: [
            {
                id: "GENERAL",
                name: "GENERAL"
            },
            {
                id: "OBC",
                name: "OBC"
            },
            {
                id: "SC",
                name: "SC"
            },
            {
                id: "ST",
                name: "ST"
            }
        ]
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'subCaste',
        label: 'Sub Caste',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'age',
        label: 'Age',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaSelectInputFactory,
        name: 'bloodGroup',
        label: 'Blood Group',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
        options: [
            {
                id: "ABPOSITIVE",
                name: "ABPOSITIVE"
            },
            {
                id: "ABNEGATIVE",
                name: "ABNEGATIVE"
            },
            {
                id: "OPOSITIVE",
                name: "OPOSITIVE"
            },
            {
                id: "BPOSITIVE",
                name: "BPOSITIVE"
            },
            {
                id: "BNEGATIVE",
                name: "BNEGATIVE"
            }
        ]
    }
];

const PersonalData = ({ modelData, onChange }) => {
    return (
        <PartialForm
            formElements={personalDataForm}
            modelData={modelData}
            className="gf-form-inline"
            onChange={onChange}
        />
    );
};

export default PersonalData;
