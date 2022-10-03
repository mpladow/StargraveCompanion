import React, { useEffect } from 'react';
import {schema} from '../../realm';
import App from '../../../App';
import RealmContext from '../../context/RealmContext';



const AppWrapper = () => {
  const {RealmProvider} = RealmContext;
  
  useEffect(() => {
    console.log(__DEV__, 'dev mode')
  }, [])

  return (
    <RealmProvider deleteRealmIfMigrationNeeded={__DEV__}>
      <App />
    </RealmProvider>
  );
};

export default AppWrapper;

