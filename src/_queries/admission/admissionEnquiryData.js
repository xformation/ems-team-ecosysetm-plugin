import gql from 'graphql-tag';

export const ADMISSION_ENQUIRY_DATA = gql`
mutation searchAdmissionOnType($admissionEnquiryType:String, $branchId:Long ){
    searchAdmissionOnType(admissionEnquiryType:$admissionEnquiryType,branchId:$branchId){
      id,
      studentName,
      contactNumber,
      status,
  
      alternateMobileNumber,
      email,
      courseApplyingFor,
      strEnquiryDate,
      branch{
        branchName,
        city{
          cityName
        },
        state{
          stateName,
          country{
            countryName
          }
        }
  
      }
      
    }
  }
  
`;
