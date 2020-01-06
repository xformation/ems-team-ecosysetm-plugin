export const commonFunctions = {
    getRequestOptions
};

function getRequestOptions(type, extraHeaders, body)  {
    let requestOptions = {};
    requestOptions = {
        method: type,
        headers: {
            ...extraHeaders,
        }
    };
    if (body) {
        requestOptions['body'] = body;
    }
    return requestOptions;
}