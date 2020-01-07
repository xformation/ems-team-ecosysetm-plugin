import gql from 'graphql-tag';

export const GET_ADD_ADMISSION_DATA = gql`
  query getAddAdmissionData($branchId:String)
    {
        getAddAdmissionData(branchId:$branchId)
        {
            branches,
            departments,
            batches,
            states,
            cities,
            courses
        }
    }
`;
