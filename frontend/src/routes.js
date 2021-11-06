import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/logon';
import Register from './pages/register';
import Recover from './pages/recover';
import Reset from './pages/reset';
import Verify from './pages/verify';
import Profile from './pages/profile';
import NewAsset from './pages/newAsset';
import { GlobalStyle } from './components/GlobalStyle'; // global styled-component

const Routes = () => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/recover" component={Recover} />
                <Route path="/reset" component={Reset} />
                <Route path="/verify" component={Verify} />
                <Route path="/profile" component={Profile} />
                <Route path="/assets/new" component={NewAsset} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;