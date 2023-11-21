
import React from 'react';
import { withRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Header from '../components/Header';

const BaseLayout = () => {
    const previousUrl = sessionStorage.getItem('catsproject');
    if (previousUrl) {
        sessionStorage.removeItem('catsproject');
        window.location.href = previousUrl;
    }

    return (
        <>
            <Header />
            <AppRoutes />
        </>
    );
};

export default withRouter(BaseLayout);
