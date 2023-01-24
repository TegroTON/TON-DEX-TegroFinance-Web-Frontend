import {Outlet, useSearchParams} from 'react-router-dom';
import React from 'react';
import {DefaultFooter} from '../templates/footers';
import {DefaultHeader} from '../templates/headers';

export default function DefaultLayout() {
    return (
        <>
            <div className="wrapper">
                <DefaultHeader/>
                <Outlet/>
            </div>
            <DefaultFooter/>
        </>
    );
}
