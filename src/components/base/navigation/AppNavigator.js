import React, {Fragment} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Config from 'react-native-config';

//Header functions
import Logout from '../header/Logout';
import Call from '../header/Call';
import MyBackButton from '../header/CustombackButton';

//Base Screens
import LoadingScreen from '../LoadingScreen';

//Auth Screens
import Login from '../../auth/Login';
import Terms from '../../auth/Terms';
import Signup from '../../auth/Signup';
import PinRecover from '../../auth/PinRecover';

//info pages
import About from '../../info/About';
import Help from '../../info/Help';
import Some from '../../info/Some';
import Waha from '../../info/Waha';

//User Screens
import ModeSelector from '../../apps/user/ModeSelector';
import UserDetail from '../../apps/user/UserDetail';
import Settings from '../../apps/user/Settings';

//Customer Screens
import CustomerDashboard from '../../apps/customer/CustomerDashboard';
import SiteDashboard from '../../apps/customer/SiteDashboard';
import VehicleDashboard from '../../apps/customer/VehicleDashboard';
import AddSite from '../../apps/customer/sites/AddSite';
import ListSite from '../../apps/customer/sites/ListSite';
import SiteDetail from '../../apps/customer/sites/SiteDetail';
import SiteStatus from '../../apps/customer/sites/SiteStatus';
import ExtendSite from '../../apps/customer/sites/ExtendSite';
import ExtendQty from '../../apps/customer/sites/ExtendQty';
import AddVehicle from '../../apps/customer/vehicles/AddVehicle';
import ListVehicle from '../../apps/customer/vehicles/ListVehicle';
import VehicleDetail from '../../apps/customer/vehicles/VehicleDetail';

//Transporter Screens
import TransporterDashboard from '../../apps/transporter/TransporterDashboard';

const AppNavigator = createStackNavigator(
  {
    UserDetail: {
      screen: UserDetail,
      navigationOptions: {
        title: 'User Detail',
      },
    },
    ModeSelector: {
      screen: ModeSelector,
      navigationOptions: {title: 'Select Mode'},
    },
    CustomerDashboard: {
      screen: CustomerDashboard,
      navigationOptions: {
        title: 'Customer',
      },
    },
    SiteDashboard: {
      screen: SiteDashboard,
      navigationOptions: {
        title: 'Site Dashboard',
      },
    },
    AddSite: {
      screen: AddSite,
      navigationOptions: {
        title: 'Add Site',
      },
    },
    ListSite: {
      screen: ListSite,
      navigationOptions: {
        title: 'All Sites',
      },
    },
    SiteDetail: {
      screen: SiteDetail,
      navigationOptions: {
        title: 'Site Detail',
      },
    },
    SiteStatus: {
      screen: SiteStatus,
      navigationOptions: {
        title: 'Site Status',
      },
    },
    ExtendSite: {
      screen: ExtendSite,
      navigationOptions: {
        title: 'Site Extension',
      },
    },
    ExtendQty: {
      screen: ExtendQty,
      navigationOptions: {
        title: 'Qty Extension',
      },
    },
    VehicleDashboard: {
      screen: VehicleDashboard,
      navigationOptions: {
        title: 'Vehicle Dashboard',
      },
    },
    AddVehicle: {
      screen: AddVehicle,
      navigationOptions: {
        title: 'Add Vehicle',
      },
    },
    ListVehicle: {
      screen: ListVehicle,
      navigationOptions: {
        title: 'All Vehicle',
      },
    },
    VehicleDetail: {
      screen: VehicleDetail,
      navigationOptions: {
        title: 'Vehilce Detail',
      },
    },
    TransporterDashboard: {
      screen: TransporterDashboard,
      navigationOptions: {
        title: 'Transporter',
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: 'Settings',
      },
    },
  },
  {
    initialRouteName: 'UserDetail',
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      headerStyle: {
        backgroundColor: Config.APP_HEADER_COLOR,
      },
      headerRight: (
        <Fragment>
          <Call />
          <Logout />
        </Fragment>
      ),
    },
  },
);

const AuthNavigator = createStackNavigator(
  {
    Login: {screen: Login, navigationOptions: {title: Config.APP_NAME}},
    Terms: {screen: Terms, navigationOptions: {title: 'Terms & Conditions'}},
    Signup: {screen: Signup, navigationOptions: {title: 'Register'}},
    PinRecover: {screen: PinRecover, navigationOptions: {title: 'Reset PIN'}},
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      headerStyle: {
        backgroundColor: Config.APP_HEADER_COLOR,
      },
      headerRight: <Call />,
    },
  },
);

const InfoNavigator = createStackNavigator(
  {
    About: {
      screen: About,
      navigationOptions: {title: 'About', headerLeft: <MyBackButton />},
    },
    Some: {screen: Some, navigationOptions: {title: 'Some'}},
    Waha: {screen: Waha, navigationOptions: {title: 'Waha'}},
    Help: {screen: Help, navigationOptions: {title: 'Help'}},
  },
  {
    initialRouteName: 'About',
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      headerStyle: {
        backgroundColor: Config.APP_HEADER_COLOR,
      },
      headerRight: (
        <Fragment>
          <Call />
          <Logout />
        </Fragment>
      ),
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: LoadingScreen,
      App: AppNavigator,
      Auth: AuthNavigator,
      Info: InfoNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
