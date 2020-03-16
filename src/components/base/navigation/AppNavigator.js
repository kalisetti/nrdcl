import React, { Fragment } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  Text,
} from 'native-base';
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
import ContactUs from '../../info/ContactUs';
import Faq from '../../info/Faq';

//User Screens
import ModeSelector from '../../apps/user/ModeSelector';
import UserDetail from '../../apps/user/UserDetail';
import Settings from '../../apps/user/Settings';

//Customer Screens
import CustomerTerms from '../../apps/customer/CustomerTerms';
import TransporterTerms from '../../apps/transporter/TransporterTerms';
import TransporterTermsRead from '../../apps/transporter/TransporterTermsRead';

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
import UpdateDriver from '../../apps/customer/vehicles/UpdateDriver'; 
import OrderDashboard from '../../apps/customer/OrderDashboard';
import ListOrder from '../../apps/customer/orders/ListOrder';
import AddOrder from '../../apps/customer/orders/AddOrder';
import Payment from '../../apps/customer/orders/Payment';
import OrderDetail from '../../apps/customer/orders/OrderDetail';
import DeliveryList from '../../apps/customer/Delivery/DeliveryList';
import DeliveryDetail from '../../apps/customer/Delivery/DeliveryDetail';
import DeliverySummary from '../../apps/customer/Delivery/DeliverySummary';
import SuccessMsg from '../../apps/customer/orders/SuccessMsg';


//Transporter Screens
import TransporterDashboard from '../../apps/transporter/TransporterDashboard'; 
import AddTransport from '../../apps/transporter/transport/AddTransport';
import ListTransport from '../../apps/transporter/transport/ListTransport';
import TransportDetail from '../../apps/transporter/transport/TransportDetail';
import TransportDriverUpdate from '../../apps/transporter/transport/TransportDriverUpdate';
import AddToQueue from '../../apps/transporter/Queue/AddToQueue'; 

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
      navigationOptions: { title: 'Select Mode' },
    },
    CustomerTerms: {
      screen: CustomerTerms,
      navigationOptions: { title: 'Customer Terms & Conditions' },
    },
    TransporterTerms: {
      screen: TransporterTerms,
      navigationOptions: { title: 'Terms & Conditions' },
    },
    
    TransporterTermsRead: {
      screen: TransporterTermsRead,
      navigationOptions: { title: 'Terms & Conditions' },
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
    UpdateDriver: {
      screen: UpdateDriver,
      navigationOptions: {
        title: 'Update Driver Info',
      },
    },
    OrderDashboard: {
      screen: OrderDashboard,
      navigationOptions: {
        title: 'Orders',
      },
    },
    ListOrder: {
      screen: ListOrder,
      navigationOptions: {
        title: 'All Orders',
      },
    },
    AddOrder: {
      screen: AddOrder,
      navigationOptions: {
        title: 'Place Order',
      },
    },
    Payment: {
      screen: Payment,
      navigationOptions: {
        title: 'Payment',
      },
    },
    OrderDetail: {
      screen: OrderDetail,
      navigationOptions: {
        title: 'Order Detail',
      },
    },
    DeliveryList: {
      screen: DeliveryList,
      navigationOptions: {
        title: 'Delivery List',
      },
    },

    DeliveryDetail: {
      screen: DeliveryDetail,
      navigationOptions: {
        title: 'Delivery Detail',
      },
    },

    DeliverySummary: {
      screen: DeliverySummary,
      navigationOptions: {
        title: 'Delivery Summary',
      },
    },
    TransporterDashboard: {
      screen: TransporterDashboard,
      navigationOptions: {
        title: 'Transporter',
      },
    }, 
    AddTransport: {
      screen: AddTransport,
      navigationOptions: {
        title: 'Add Transport',
      },
    },
    ListTransport: {
      screen: ListTransport,
      navigationOptions: {
        title: 'List Transport',
      },
    },
    TransportDriverUpdate: {
      screen: TransportDriverUpdate,
      navigationOptions: {
        title: 'Transport Driver Update',
      },
    },
    TransportDetail: {
      screen: TransportDetail,
      navigationOptions: {
        title: 'Transport Detail',
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: 'Settings',
      },
    },
    SuccessMsg: {
      screen: SuccessMsg,
      navigationOptions: {
        title: 'Transaction Details',
      },
    }, 

    AddToQueue: {
      screen: AddToQueue,
      navigationOptions: {
        title: 'Apply to Queue',
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
      headerTitleStyle: {
        color: 'white'
      },
      headerTintColor: '#fff',

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
    Login: { screen: Login, navigationOptions: { title: Config.APP_NAME } },
    Terms: { screen: Terms, navigationOptions: { title: 'Terms & Conditions' } },
    Signup: { screen: Signup, navigationOptions: { title: 'Register' } },
    PinRecover: { screen: PinRecover, navigationOptions: { title: 'Reset PIN' } },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      headerStyle: {
        backgroundColor: Config.APP_HEADER_COLOR,
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerTintColor: '#fff',
      headerRight: <Call />,
    },
  },
);

const InfoNavigator = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: { title: '' } },
    About: { screen: About, navigationOptions: { title: 'About' } },
    ContactUs: { screen: ContactUs, navigationOptions: { title: 'Contact Us' } },
    Faq: { screen: Faq, navigationOptions: { title: 'FAQ' } },
    Help: { screen: Help, navigationOptions: { title: 'Help' } },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      headerStyle: {
        backgroundColor: Config.APP_HEADER_COLOR,
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerTintColor: '#fff',
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
