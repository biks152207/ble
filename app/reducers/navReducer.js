const previousState = {};
export default function navReducer(state = {}, action) {
  console.log(action, 'alert');
    switch (action.type) {
          case 'Navigation/NAVIGATE':
                const { routes, index } = state;
                console.log(state);
                console.log(action);
                const { routeName, params } = action;

                const currentTab = routes[index];
                const lastScene = currentTab.routes[currentTab.routes.length - 1];

                // Check for duplication
                if (lastScene.routeName === routeName && isEqual(lastScene.params, params)) {
                    return state;
                }
    }
    return state;
}
