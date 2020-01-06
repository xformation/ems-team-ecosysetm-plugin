import * as React from "react";

const withLoadingHandler = (TheComponent) => {
    const LoadingHandlerWrapper = (props) => (props.data.loading ? <h1>Loading</h1> : <TheComponent {...props} />);
    return LoadingHandlerWrapper;
};

export default withLoadingHandler;
