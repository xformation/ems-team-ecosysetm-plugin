import gql from 'graphql-tag';

export const CREATE_STUDENT_FILTER_DATA_CACHE = gql`
  query createStudentFilterDataCache($collegeId:String!, $academicYearId:String!){
    createStudentFilterDataCache(collegeId:$collegeId, academicYearId:$academicYearId  ) {
    branches{
        id,
        branchName
    },
    departments{
        id,
        name,
        branch{
          id
        },
        academicyear{
          id
        }
    },
    batches{
        id,
        batch,
        department{
          id
        }
    },
    sections{
        id,
        section,
        batch{
          id
        }
    },
    studentTypes{
        id,
        description
    },
    genders{
        id,
        description
    }
  }
}
`;
