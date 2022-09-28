import React from 'react';
import {schema} from '../../realm';
import App from '../../../App';
import RealmContext from '../../context/RealmContext';



const AppWrapper = () => {
  const {RealmProvider} = RealmContext;

  
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
};

export default AppWrapper;

