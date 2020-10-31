import React, { FC } from 'react';

import Providers from 'components/Providers';
import Router from 'components/Router';
import AppBar from './AppBar';
import SideBar from 'components/stages/sidebar';

const App: FC = () => {
    return (
        <Providers>
            <AppBar />
            <SideBar />
            <Router />
        </Providers>
    );
};

export default App;
