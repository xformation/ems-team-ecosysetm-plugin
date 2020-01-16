import gql from 'graphql-tag';

export const STUDENT_PROFILE = gql`
query student($studentId: Long!) {
  student(id: $studentId) {
  id
  studentName
  studentMiddleName
  studentLastName
  fatherName
  fatherMiddleName
  fatherLastName
  motherName
  motherMiddleName
  motherLastName
  aadharNo
  dateOfBirth
  strDateOfBirth
  placeOfBirth
  religion
  caste
  subCaste
  age
  sex
  bloodGroup
  addressLineOne
  addressLineTwo
  addressLineThree
  town
  state
  country
  pincode
  studentContactNumber
  alternateContactNumber
  studentEmailAddress
  alternateEmailAddress
  relationWithStudent
  emergencyContactName
  emergencyContactMiddleName
  emergencyContactLastName
  emergencyContactNo
  emergencyContactEmailAddress
  uploadPhoto
  admissionNo
  rollNo
  studentType
  batch {
    batch
    __typename
  }
  section {
    section
    __typename
  }
  branch {
    branchName
    __typename
  }
  department {
    name
    __typename
  }
  __typename
  }
}
`;
