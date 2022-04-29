/** @format */

import { combineReducers } from 'redux';
import accountReducer from './account/AccountReducer';
import RoleReducer from './role/RoleReducer';
import authReducer from './authorization/authReducer';
import measureRedux from './measure/MeasureRedux';
import glassReducer from './glass/GlassRedux';
import clientsReducer from './clients/clientsReducer';
import ordersReducer from './orders/ordersReducer';
import frameReducer from './frame/frameRedux';
import profileReducer from './profile/ProfileRedux';
import offersReducer from './offers/offersReducer';

import montageReducer from './montage/MontageRedux';
import ReportReducer from './report/ReportRedux';
const rootReducer = combineReducers({
  role: RoleReducer,
  account: accountReducer,
  auth: authReducer,
  measure: measureRedux,
  clients: clientsReducer,
  glass: glassReducer,
  orders: ordersReducer,
  frame: frameReducer,
  offers: offersReducer,
  profile: profileReducer,
  montage: montageReducer,
  report: ReportReducer,
});

export default rootReducer;
