import Home from 'components/Pages/Home';
import MarketList from 'components/Pages/MarketsList';
import CategoryProductsList from 'components/Pages/CategoryProductsList';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import routes from '../../config/routes';

const Router = (): JSX.Element => (
    <Switch>
        <Route exact path={routes.home}>
            <Home />
        </Route>
        <Route exact path={routes.marketList}>
            <MarketList />
        </Route>
        <Route exact path={routes.marketId}>
            <MarketList />
        </Route>
        <Route exact path={routes.productList}>
            <CategoryProductsList />
        </Route>
        <Route exact path={routes.categoryProductList}>
            <CategoryProductsList />
        </Route>
        <Redirect to={routes.home} />
    </Switch>
);

export default Router;
