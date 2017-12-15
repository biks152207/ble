import { combineReducers } from 'redux';
import auth from './auth';
import shipments from './shipments';
import drivershipment from './drivershipment';
import navReducer from './navReducer';

import activityReducer from './activityReducer';
import { LoginReducer, PODreducer } from '../routes';

import { AppScreen } from '../layouts/AppScreen/AppScreen'; // Object has access to router

const navigation = (state,action) => {
  console.log(action, 'action...');
  switch (action.type) {

        // Most navigation actions are handled by the navigation router supplied by React Navigation
        case 'Navigation/NAVIGATE':

                const { routes, index } = state;
                const { routeName, params } = action;
                console.log(routes, 'routes');
                console.log(index, 'index');

                const currentTab = routes[index];
                console.log(currentTab, 'currentTab');
                const lastScene = currentTab.routes[currentTab.routes.length - 1];
                console.log(lastScene, 'lastScene');
                console.log(routeName, 'routeName');
                console.log(params, 'params');

                // Check for duplication
                if (lastScene.routeName === routeName && isEqual(lastScene.params, params)) {
                    return state;
                }

    }
    return AppScreen.router.getStateForAction(action, state);
}


export default combineReducers({
    auth,
    shipments,
    LoginReducer,
    drivershipment,
    PODreducer,
    activityReducer,
});
