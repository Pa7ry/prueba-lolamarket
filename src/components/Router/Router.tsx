import Home from 'components/stages/home';
import SelectShop from 'components/stages/select-shop';
// import SelectShop from 'components/stages/select-shop';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import routes from '../../config/routes';

const Router = (): JSX.Element => (
    <Switch>
        <Route exact path={routes.home}>
            <Home />
        </Route>
        <Route exact path={routes.selectShop}>
            <SelectShop />
        </Route>
        <Redirect to={routes.home} />
    </Switch>
);

export default Router;
