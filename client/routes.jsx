import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './modules/App/App';
import IDEView from './modules/IDE/pages/IDEView';
import FullView from './modules/IDE/pages/FullView';
import LoginView from './modules/User/pages/LoginView';
import CollectionView from './modules/User/pages/CollectionView';
import DashboardView from './modules/User/pages/DashboardView';
import createRedirectWithUsername from './components/createRedirectWithUsername';
import { getUser } from './modules/User/actions';
import { stopSketch } from './modules/IDE/actions/ide';
import { userIsAuthorized, userIsNotAuthenticated } from './utils/auth';
import { mobileFirst, responsiveForm } from './utils/responsive';
import AccountView from './modules/User/pages/AccountView';

import LoadInitialCodeRedirect from './components/LoadInitialCodeRedirect';

const checkAuth = (store) => {
  store.dispatch(getUser());
};

// TODO: This short-circuit seems unnecessary - using the mobile <Switch /> navigator (future) should prevent this from being called
const onRouteChange = (store) => {
  const path = window.location.pathname;
  if (path.includes('preview')) return;

  store.dispatch(stopSketch());
};

const routes = (store) => (
  <div>
    <Route
      path="/load/:code"
      // for some reason the `render` prop doesn't work
      component={({ params }) => {
        return <LoadInitialCodeRedirect store={store} code={params.code} />;
      }}
    />
    <Route
      path="/"
      component={App}
      onChange={() => {
        onRouteChange(store);
      }}
    >
      <IndexRoute onEnter={checkAuth(store)} component={IDEView} />

      <Route
        path="/login"
        component={userIsNotAuthenticated(mobileFirst(responsiveForm(LoginView), LoginView))}
      />
      <Route path="/projects/:project_id" component={IDEView} />
      <Route path="/:username/full/:project_id" component={userIsAuthorized(FullView)} />

      <Route path="/:username/submissions" component={userIsAuthorized(DashboardView)} />

      <Route path="/:username/sketches" component={userIsAuthorized(DashboardView)} />
      <Route path="/:username/sketches/:project_id" component={IDEView} />
      <Route path="/:username/sketches/:project_id/add-to-collection" component={userIsAuthorized(IDEView)} />
      <Route path="/:username/collections" component={userIsAuthorized(DashboardView)} />

      <Route path="/:username/collections/create" component={userIsAuthorized(DashboardView)} />
      <Route path="/:username/collections/:collection_id" component={userIsAuthorized(CollectionView)} />

      <Route path="/sketches" component={createRedirectWithUsername('/:username/sketches')} />
      <Route path="/about" component={IDEView} />
      <Route path="/account" component={AccountView} />
    </Route>
  </div>
);

export default routes;
