import React , { Component } from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';

import Tabs from '../../components/Tabs/Tabs.js';
import ActivityLogTabs from '../../components/ActivityLogTab/ActivityLogTab.js'

import PathSelection from './../../routes/pathSelection/pathSelection.js';
import Login from './../../routes/register/login.js';
import ChangePassword from './../../routes/register/changePassword.js';
import SignUp from './../../routes/register/signUp.js';
import SearchPickUp from './../../routes/pickUp/searchPickUp.js';
import PickUpResult from './../../routes/pickUp/pickupResult.js';
import SearchDropOff from './../../routes/pickUp/searchDropOff.js';
import PickUpDate from './../../routes/pickUp/pickUpDate.js';
import TrailerType from './../../routes/pickUp/trailerType.js';
import ForgotPassword from './../../routes/register/forgotPassword.js';
import NewPassword from './../../routes/register/newPassword.js';
import SignupPending from './../../routes/register/signupPending.js';
import PickUpLocation from './../../routes/PickUpLocation/PickUpLocation';
import DropOffLocation from './../../routes/DropOffLocation/DropOffLocation';
import Otp from './../../routes/register/otp.js';
import TripMessage from './../../routes/pickUp/tripMessage.js';
import TripDetails from './../../routes/pickUp/tripDetails.js';
import UserInfo from './../../routes/UserInfo/UserInfo.js';
import FullInfo from './../../routes/FullInfo/FullInfo.js';
import PickUpHome from './../../routes/pickUp/pickUpHome.js';
import DeliveryInProgress from './../../routes/trip/deliveryInProgress.js';
import TripComplete from './../../routes/trip/tripComplete.js';
import AcceptOrRejectTrip from './../../routes/trip/acceptOrRejectTrip.js';
import LoadCompleted from './../../routes/trip/loadCompleted.js';
import PasswordUpdateSuccessful from './../../routes/register/passwordUpdateSuccessful.js';
import PastShipment from './../../routes/PastShipment/PastShipment.js';
import DocScan from './../../routes/DocScan/DocScan.js';
import DocScanned from './../../routes/DocScanned/DocScanned.js';
import DocType from './../../routes/DocType/DocType.js';
import SetAppointment from './../../routes/trip/setAppointment.js';
import UpComingLoad from './../../routes/trip/upComingLoad.js';
import Terms from './../../routes/TermsAndConditions/Terms';
import Privacy from './../../routes/TermsAndConditions/Privacy';
import ELDDashboard from './../../routes/ELD/ELDDashboard'
import ActivityStatus from './../../routes/ActivityStatus/ActivityStatus'

import AddEvent from './../../routes/AddEvent/AddEvent'
import ReviewLog from './../../routes/ReviewLog/ReviewLog'

import PastActivityStatus from './../../routes/PastActivityStatus/PastActivityStatus'

import ActivityLog from './../../routes/ActivityLogTab/ActivityLog/ActivityLog'
import EditedActivityLog from './../../routes/ActivityLogTab/ActivityLog/EditedActivityLog'

import ActivityDVIR from './../../routes/ActivityLogTab/ActivityDVIR/ActivityDVIR'
import ActivityForm from './../../routes/ActivityLogTab/ActivityForm/ActivityForm'
import ActivitySign from './../../routes/ActivityLogTab/ActivitySign/ActivitySign'

import AddDVIR from './../../routes/ActivityLogTab/ActivityDVIR/AddDVIR'
import AddDefects from './../../routes/ActivityLogTab/ActivityDVIR/AddDefects'

import EditDVIR from './../../routes/EditInspection/EditDVIR'
import InspectVehicleRepairs from './../../routes/EditInspection/InspectVehicleRepairs';
import RepairVehicleDefects from './../../routes/EditInspection/RepairVehicleDefects';
import EditDefects from './../../routes/EditInspection/EditDefects';
import RepairDefects from './../../routes/EditInspection/RepairDefects';
import SignLog from './../../routes/SignLog/SignLog';

import DotInspection from './../../routes/DotInspection/DotInspection';
import SendEmail from './../../routes/SendEmail/SendEmail';
import DotInspectionMode from './../../routes/DotInspectionMode/DotInspectionMode';
import EmailLogs from './../../routes/EmailLogs/EmailLogs';
import ErrorLog from './../../routes/Error/ErrorLog';
import GraphComponent from './../../routes/Graph/';



  const routeConfiguration = {
    PathSelection: { screen: PathSelection },
    PickUpLocation: { screen: PickUpLocation },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    ChangePassword: { screen: ChangePassword },
    SearchPickUp: { screen: SearchPickUp },
    SearchDropOff: { screen: SearchDropOff },
    PickUpDate: { screen: PickUpDate },
    PickUpResult: { screen: PickUpResult },
    TrailerType: { screen: TrailerType },
    ForgotPassword: { screen: ForgotPassword },
    NewPassword: { screen: NewPassword },
    SignupPending: { screen: SignupPending },
    DropOffLocation: { screen: DropOffLocation },
    Otp: { screen: Otp },
    TripMessage: { screen: TripMessage },
    TripDetails: { screen: TripDetails },
    UserInfo: { screen: UserInfo },
    FullInfo: { screen: FullInfo },
    // PickUpHome: { screen: PickUpHome },
    DeliveryInProgress: { screen: DeliveryInProgress },
    TripComplete: { screen: TripComplete },
    AcceptOrRejectTrip: { screen: AcceptOrRejectTrip },
    PickUpHome: { screen: ({ navigation }) => {
      return (
        <Tabs screenProps={{ rootNavigation: navigation }}   />
      )

    }},
    Shipments: { screen: ({ navigation }) => {
      return (
        <Tabs screenProps={{ rootNavigation: navigation }}   />
      )

    }},
    // Payments: { screen: ({ navigation }) => {
    //   return (
    //     <Tabs screenProps={{ rootNavigation: navigation }}   />
    //   )
    //
    // }},
    ActivityStatus: { screen: ({ navigation }) => {
      return (
        <Tabs screenProps={{ rootNavigation: navigation }}   />
      )

    }},
    // Referrals: { screen: ({ navigation }) => {
    //   return (
    //     <Tabs screenProps={{ rootNavigation: navigation }}   />
    //   )
    //
    // }},
    Contact: { screen: ({ navigation }) => {
      return (
        <Tabs screenProps={{ rootNavigation: navigation }}   />
      )

    }},
    LoadCompleted: { screen: LoadCompleted },
    PasswordUpdateSuccessful: { screen: PasswordUpdateSuccessful },
    PastShipment: { screen: PastShipment },
    DocScan: { screen: DocScan },
    DocScanned: { screen : DocScanned },
    DocType: { screen: DocType },
    SetAppointment: { screen: SetAppointment },
    UpComingLoad: { screen: UpComingLoad },
    Terms: { screen: Terms},
    Privacy: { screen: Privacy},
    ELDDashboard:{screen:ELDDashboard},
    // ActivityStatus:{screen:ActivityStatus},
    AddEvent:{screen:AddEvent},
    ReviewLog:{screen:ReviewLog},
    PastActivityStatus:{screen:PastActivityStatus},
    ActivityLog:{screen:ActivityLog},
    EditedActivityLog:{screen:EditedActivityLog},

    // ActivityLog: { screen: ({ navigation }) => {
    //   return (
    //     <ActivityLogTabs screenProps={{ rootNavigation: navigation }}   />
    //   )
    //
    // }},
    // ActivityDVIR: { screen: ({ navigation }) => {
    //   return (
    //     <ActivityLogTabs screenProps={{ rootNavigation: navigation }}   />
    //   )
    //
    // }},
    // ActivityForm: { screen: ({ navigation }) => {
    //   return (
    //     <ActivityLogTabs screenProps={{ rootNavigation: navigation }}   />
    //   )
    //
    // }},
    // ActivitySign: { screen: ({ navigation }) => {
    //   return (
    //     <ActivityLogTabs screenProps={{ rootNavigation: navigation }}   />
    //   )
    //
    // }},
    AddDVIR:{screen:AddDVIR},
    AddDefects:{screen:AddDefects},
    EditDVIR:{screen:EditDVIR},
    InspectVehicleRepairs:{screen:InspectVehicleRepairs},
    RepairVehicleDefects:{screen:RepairVehicleDefects},
    EditDefects:{screen:EditDefects},
    RepairDefects:{screen:RepairDefects},
    SignLog:{screen:SignLog},
    DotInspection: { screen: DotInspection },
    SendEmail: { screen: SendEmail},
    DotInspectionMode: { screen: DotInspectionMode},
    EmailLogs: { screen: EmailLogs },
    ErrorLog: { screen: ErrorLog },
    Graph: { screen: GraphComponent}
  }

// going to disable the header for now
  const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'PathSelection'
  }
  const App = StackNavigator(routeConfiguration,stackNavigatorConfiguration);
  const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action;
    return (
      state &&
      type === NavigationActions.NAVIGATE &&
      routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state);
};

  App.router.getStateForAction = navigateOnce(App.router.getStateForAction);

  export const AppScreen = App;
