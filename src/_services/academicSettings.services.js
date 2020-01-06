import { config } from '../config';
import { commonFunctions } from '../_utilities/common.functions';

export const academicSettingsServices = {
    getCmsLectures,
    getCmsTerms,
    getCmsBatches,
    getCmsAcademicYears,
    getCmsSections,
    getGlobalConfiguration,
    getCmsSubjects,
    getCmsTeachers,
    getFilterAttendanceMasterByDepartment
}

function getCmsLectures(data) {
    const requestOptions = commonFunctions.getRequestOptions("GET", {});
    return fetch(config.LECTURES_URL + `?termId=${data.selectedTerm}&academicYearId=${data.academicYearId}&sectionId=${data.selectedSection}&batchId=${data.selectedBatch}&branchId=${data.selectedBranch}&departmentId=${data.departmentId}&subjectId=${data.selectedSubject}&teacherId=${data.selectedTeacher}&fromDate=${data.fromDate}&toDate=${data.toDate}`, requestOptions)
        .then(response => response.json());
}

function getCmsTerms(ayId) {
    const requestOptions = commonFunctions.getRequestOptions("GET", {});
    return fetch(config.CMS_TERM_BY_ACYEAR_URL + '?academicYearId=' + ayId, requestOptions)
        .then(response => response.json());
}

function getCmsBatches(departmentId) {
    const requestOptions = commonFunctions.getRequestOptions("GET", {});
    return fetch(config.CMS_BATCH_BY_DEPARTMENT_URL + departmentId, requestOptions)
        .then(response => response.json());
}

function getCmsAcademicYears(departmentId) {
    const requestOptions = commonFunctions.getRequestOptions("GET", {});
    return fetch(config.CMS_ACADEMICYEAR_URL + departmentId, requestOptions)
        .then(response => response.json());
}

function getCmsSections(batchId) {
    const requestOptions = commonFunctions.getRequestOptions("GET", {});
    return fetch(config.CMS_SECTION_BY_BATCH_URL + batchId, requestOptions)
        .then(response => response.json());
}

function getCmsSubjects(departmentId) {
    const requestOptions = commonFunctions.getRequestOptions("GET", {});
    return fetch(config.CMS_SUBJECT_BY_DEPARTMENT_URL + '?departmentId=' + departmentId, requestOptions)
        .then(response => response.json());
}

function getCmsTeachers(departmentId) {
    const requestOptions = commonFunctions.getRequestOptions("GET", {});
    return fetch(config.CMS_TEACHER_BY_FILTER_PARAM_URL + '?deptId=' + departmentId, requestOptions)
        .then(response => response.json());
}

function getFilterAttendanceMasterByDepartment(departmentId) {
    const requestOptions = commonFunctions.getRequestOptions("GET", {});
    return fetch(config.CMS_AM_BY_DEPARTMENT_URL + '?departmentId=' + departmentId, requestOptions)
        .then(response => response.json());
  }

function getGlobalConfiguration(userName) {
    const requestOptions = commonFunctions.getRequestOptions("GET", {});
    return fetch(config.CMS_GLOBAL_CONFIG_URL + '?userName=' + userName, requestOptions)
        .then(response => response.json());
}