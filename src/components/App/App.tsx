import React, { FC } from 'react';

import Providers from 'components/Providers';
import Router from 'components/Router';
import AppBar from './AppBar';
import SideBar from 'components/App/Sidebar';
import AppDialog from 'components/App/AppDialog';

const App: FC = () => {
    return (
        <Providers>
            <AppBar />
            <SideBar />
            <AppDialog />
            <Router />
        </Providers>
    );
};

export default App;
