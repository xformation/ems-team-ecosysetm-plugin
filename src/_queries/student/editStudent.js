import gql from 'graphql-tag';

export const EDIT_STUDENT = gql`
  mutation AddStudent($input: AddStudentInput!) {
    addStudent(input: $input) {
      student {
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
          id
        }
        section {
          id
        }
        branch {
          id
        }
        department {
          id
        }
      }
    }
  }
`;
