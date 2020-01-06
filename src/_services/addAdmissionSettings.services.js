import { config } from '../config';
import { commonFunctions } from '../_utilities/common.functions';

export const addAdmissionSettingsServices = {
    saveAddAdminssion
}

function saveAddAdminssion(data) {
    const requestOptions = commonFunctions.getRequestOptions("POST", {"Content-Type":"application/json;charset=UTF-8"}, JSON.stringify(data));
    return fetch(config.ADD_ADMINSSION_URL, requestOptions)
        .then(response => response.json());
}
