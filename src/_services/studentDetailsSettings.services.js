import { config } from '../config';
import { commonFunctions } from '../_utilities/common.functions';

export const studentDetailsSettingsServices = {
    saveStudentDetails
}

function saveStudentDetails(data) {
    const requestOptions = commonFunctions.getRequestOptions("POST", {"Content-Type":"application/json;charset=UTF-8"}, JSON.stringify(data));
    return fetch(config.STUDENT_DETAILS_URL, requestOptions)
        .then(response => response.json());
}
