import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cats from '../components/Cats';
import FileUpload from '../components/FileUpload';
import { UserContextProvider } from '../utils/user';

const AppRoutes = () => {
    return (
        <>
            <UserContextProvider>
                <Switch>
                    <Route exact path="/" render={() => <Cats />} />
                    <Route exact path="/upload" render={() => <FileUpload />} />
                </Switch>
            </UserContextProvider>
        </>
    );
};

export default AppRoutes;
