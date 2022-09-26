import {StyleSheet, Text, View} from 'react-native';
import React, {createContext, useState} from 'react';
import {UserState} from 'realm';

interface AuthContext {
  user: User;
  login: (email: string) => void;
  logout: () => void;
}

interface User {
  email: string;
  firstName: string;
  surname: string;
  groups: Group[];
}
interface Group {
  groupId: number;
  groupName: string;
  isPrivate: boolean;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = (email: string) => {
    // get authenticated via api or some other magic
    let TESTUSER: User = {} as User;
    TESTUSER.email = email;
    TESTUSER.firstName = 'Mike';
    TESTUSER.surname = 'SurnameMan';
    let TESTGROUP: Group = {
      groupId: 1,
      groupName: 'Quick List'
    }

    setUser(TESTUSER);
    console.log('LOGIN COMPLETE');
  };

  const logout = () => {
    console.log(user, 'CURRENT USER')
    setUser(undefined);
  };

  // login and setup auth here

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

const styles = StyleSheet.create({});
