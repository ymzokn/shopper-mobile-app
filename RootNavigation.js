import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function navigateWithReset(name, params) {
    navigationRef.current?.reset({
        index: 1,
        routes: [
            { name, params },
        ],
    });

}


