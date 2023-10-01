import React, {useEffect} from 'react';
import {useAccess} from "umi";


function WithInterceptor(WrappedComponent) {
    useEffect(() => {

    }, []);
    return (props) => { // Pass the props down to the wrapped component
        // Add your intercepting logic here, if needed

        return <WrappedComponent {...props} />; // Render the wrapped component with its props
    };
}

export default WithInterceptor;