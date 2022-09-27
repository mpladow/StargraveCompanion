// import {StyleSheet, Text, View} from 'react-native';
// import React, {createContext, ReactElement, ReactNode, useState} from 'react';
// import Realm from 'realm';
// import {TasksSchema, TeamSchema} from '../realm/models';
// import { schema } from '../realm';

// interface RealmContextProps {
//   realm?: Realm;
// }
// export const RealmContext = createContext<RealmContextProps>({});

// const RealmProvider = ({children}: {children?: ReactNode}): ReactElement => {
//   const [realm, setRealm] = useState<Realm>();

//   const initRealm = async () => {
//     if (!realm) {
//       const config: Realm.BaseConfiguration = {
//         schema: schema,
//         path: 'myRealm',
//       };
//       const _realm = await Realm.open(config);

//       setRealm(_realm);
//       console.log(realm, 'Realm initialised')
//     }
//     else {
//         console.log(realm, 'Realm already initialised')
//     }
//   };
//   initRealm();


//   return (
//     <RealmContext.Provider value={{realm}}>{children}</RealmContext.Provider>
//   );
// };

// export default RealmProvider;

// const styles = StyleSheet.create({});
