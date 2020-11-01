import React, { FC } from 'react';

import Providers from 'components/Providers';
import Router from 'components/Router';
import AppBar from './AppBar';
import SideBar from 'components/App/Sidebar';
import ErrorDialog from 'components/App/ErrorDialog';

const App: FC = () => {
    return (
        <Providers>
            <AppBar />
            <SideBar />
            <ErrorDialog />
            <Router />
        </Providers>
    );
};

export default App;
