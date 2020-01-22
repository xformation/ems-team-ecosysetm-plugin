import gql from 'graphql-tag';

export const GET_STUDENT_LIST = gql`
  mutation getStudentList($filter:StudentListFilterInput!){
    getStudentList(filter:$filter){
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
      }
      section {
        section
      }
      branch {
        branchName
      }
      department {
        name
      }
    }
  }
`;
