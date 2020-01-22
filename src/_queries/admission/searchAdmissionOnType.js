import gql from 'graphql-tag';

export const SEARCH_ADMISSION_ON_TYPE = gql`
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
