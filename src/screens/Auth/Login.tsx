import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {useAuth} from '../../hooks/Authentication/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const auth = useAuth();
  const TESTLOGIN = () => {
    console.log(auth.user);
    auth.login(email);
  };
  return (
    <View style={styles.container}>
      <Text variant='displayMedium'>Demo App</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <View style={{marginTop: 8}}>
        <Button
          icon="login"
          mode="contained"
          onPress={() => TESTLOGIN()}>
          Login
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
