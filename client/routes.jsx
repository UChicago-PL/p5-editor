import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './modules/App/App';
import IDEView from './modules/IDE/pages/IDEView';
// import MobileIDEView from './modules/IDE/pages/MobileIDEView';
// import MobileSketchView from './modules/Mobile/MobileSketchView';
// import MobilePreferences from './modules/Mobile/MobilePreferences';
import FullView from './modules/IDE/pages/FullView';
import LoginView from './modules/User/pages/LoginView';
import CollectionView from './modules/User/pages/CollectionView';
import DashboardView from './modules/User/pages/DashboardView';
import createRedirectWithUsername from './components/createRedirectWithUsername';
import { getUser } from './modules/User/actions';
import { stopSketch } from './modules/IDE/actions/ide';
import { userIsNotAuthenticated } from './utils/auth';
import { mobileFirst, responsiveForm } from './utils/responsive';

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
      <Route path="/:username/full/:project_id" component={FullView} />
      {/* <Route path="/full/:project_id" component={FullView} /> */}

      {/* <Route
        path="/:username/assets"
        component={userIsAuthenticated(userIsAuthorized(mobileFirst(MobileDashboardView, DashboardView)))}
      /> */}
      <Route path="/:username/sketches" component={DashboardView} />
      <Route path="/:username/sketches/:project_id" component={IDEView} />
      <Route path="/:username/sketches/:project_id/add-to-collection" component={IDEView} />
      <Route path="/:username/collections" component={DashboardView} />

      <Route path="/:username/collections/create" component={DashboardView} />
      <Route path="/:username/collections/:collection_id" component={CollectionView} />

      <Route path="/sketches" component={createRedirectWithUsername('/:username/sketches')} />
      {/* <Route path="/assets" component={createRedirectWithUsername('/:username/assets')} /> */}
      <Route path="/about" component={IDEView} />

      {/* Mobile-only Routes */}
      {/* TODO delete */}
      {/* <Route path="/preview" component={MobileSketchView} />
      <Route path="/preferences" component={MobilePreferences} /> */}
    </Route>
  </div>
);

export default routes;
