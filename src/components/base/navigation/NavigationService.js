import {NavigationActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef, goBackEvent) {
  _navigator = navigatorRef;
  _goBackEvent = goBackEvent;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack() {
  _navigator.dispatch(NavigationActions.back());
  if (_goBackEvent) _goBackEvent();
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
};
