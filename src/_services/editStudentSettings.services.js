import { config } from '../config';
import { commonFunctions } from '../_utilities/common.functions';

export const editStudentSettingsServices = {
    saveEditStudent
}

function saveEditStudent(data) {
    const requestOptions = commonFunctions.getRequestOptions("POST", {"Content-Type":"application/json;charset=UTF-8"}, JSON.stringify(data));
    return fetch(config.EDIT_STUDENT_URL, requestOptions)
        .then(response => response.json());
}
