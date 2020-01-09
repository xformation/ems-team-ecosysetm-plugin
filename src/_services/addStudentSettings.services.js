import { config } from '../config';
import { commonFunctions } from '../_utilities/common.functions';

export const addStudentSettingsServices = {
    saveAddStudent
}

function saveAddStudent(data) {
    const requestOptions = commonFunctions.getRequestOptions("POST", {"Content-Type":"application/json;charset=UTF-8"}, JSON.stringify(data));
    return fetch(config.ADD_STUDENT_URL, requestOptions)
        .then(response => response.json());
}
