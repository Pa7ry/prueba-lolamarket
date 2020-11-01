import React, { FC } from 'react';

import Providers from 'components/Providers';
import Router from 'components/Router';
import AppBar from './AppBar';
import SideBar from 'components/stages/sidebar';
import ErrorDialog from 'components/stages/error-dialog';

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
