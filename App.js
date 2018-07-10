import React, { Component } from 'react';
import { createStackNavigator, createTabNavigator } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import * as firebase from 'firebase';

import Placelist from './components/Placelist';
import FBPlacelist from './components/FBPlacelist';
import AddPlace from './components/AddPlace';
import Details from './components/Details';

const config = {
  apiKey: 'AIzaSyCNtwOzaitwC4IAGr5PHbPBlALVFxRl_KM',
  authDomain: 'placelist-7571f.firebaseapp.com',
  databaseURL: 'https://placelist-7571f.firebaseio.com',
  projectId: 'placelist-7571f',
  storageBucket: 'placelist-7571f.appspot.com',
  messagingSenderId: '1027490586594',
};
!firebase.apps.length ? firebase.initializeApp(config) : null;

const Locale = createStackNavigator(
  {
    Placelist: {
      screen: Placelist,
    },
    AddPlace: {
      screen: AddPlace,
    },
    Details: {
      screen: Details,
    },
  },
  {
    initialRouteName: 'Placelist',
    mode: 'modal ',
  },
);

const Firebase = createStackNavigator(
  {
    AddPlace: {
      screen: AddPlace,
    },
    Details: {
      screen: Details,
    },
    FBPlacelist: {
      screen: FBPlacelist,
    },
  },
  {
    initialRouteName: 'FBPlacelist',
    mode: 'modal ',
  },
);

const DashboardTabRoutes = createBottomTabNavigator(
  {
    Locale,
    Firebase,
  },
  {
    initialRouteName: 'Locale',
  },
);
export default DashboardTabRoutes;
