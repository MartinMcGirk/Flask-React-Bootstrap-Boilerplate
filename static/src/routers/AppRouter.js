import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch } from 'react-router-dom'
import { DashboardPage } from '../components/DashboardPage';
import { NotFoundPage } from '../components/static/NotFoundPage';
import { ConnectedLoginPage } from '../components/static/LoginPage';
import { requireAuthentication } from '../components/AuthenticatedComponent';
import { requireNoAuthentication } from '../components/NotAuthenticatedComponent';
import { HomePage } from '../components/static/HomePage';
import { HowItWorksPage } from '../components/static/HowItWorksPage';
import { PricingPage } from '../components/static/PricingPage';
import { RegisterPage } from '../components/static/RegisterPage';
import { ProfilePage } from '../components/ProfilePage';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={requireNoAuthentication(HomePage)} exact={true}/>
                <Route path="/login" component={requireNoAuthentication(ConnectedLoginPage)}/>
                <Route path="/register" component={requireNoAuthentication(RegisterPage)}/>
                <Route path="/about" component={requireNoAuthentication(HowItWorksPage)}/>
                <Route path="/pricing" component={requireNoAuthentication(PricingPage)}/>
                <Route path="/dashboard" component={requireAuthentication(DashboardPage)}/>
                <Route path="/profile" component={requireAuthentication(ProfilePage)}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export { AppRouter };