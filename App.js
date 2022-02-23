import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [state, setState] = useState({
    Name: '',
    Age: '',
    DOB: '',
    blood_group: '',
    address: '',
    email: '',
    ph: '',
  });

  const storeData = () => {
    const email_regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const date_regex = /^\d{2}([./-])\d{2}\1\d{4}$/;
    const blood_regex = /^(A|B|AB|O)[+-]$/i;
    if (
      email_regex.test(state.email) === true &&
      state.ph.length === 10 &&
      date_regex.test(state.DOB) === true &&
      blood_regex.test(state.blood_group)
    ) {
      const jsonValue = JSON.stringify(state);
      AsyncStorage.setItem('@storage_Key', jsonValue);
    } else {
      Alert.alert('Invalid Text');
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        console.log("<====Fetching from Async Storage====>")
        console.log(value);
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.fullscreen}>BLOOD BANK🩸</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          value={state.Name}
          type="text"
          onChangeText={e => setState({...state, Name: e})}
          name="Name"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Age"
          placeholderTextColor="#003f5c"
          value={state.Age}
          type="text"
          keyboardType="numeric"
          onChangeText={e => setState({...state, Age: e})}
          name="Age"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Date - dd-mm-yyyy"
          placeholderTextColor="#003f5c"
          type="text"
          keyboardType="numeric"
          onChangeText={e => setState({...state, DOB: e})}
          name="DOB"
          value={state.DOB}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Blood Group"
          placeholderTextColor="#003f5c"
          value={state.blood_group}
          type="text"
          onChangeText={e => setState({...state, blood_group: e})}
          name="blood_group"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Address"
          placeholderTextColor="#003f5c"
          type="text"
          onChangeText={e => setState({...state, address: e})}
          name="address"
          value={state.address}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={state.email}
          type="text"
          onChangeText={e => setState({...state, email: e})}
          name="email"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone"
          placeholderTextColor="#003f5c"
          type="text"
          keyboardType="numeric"
          onChangeText={e => setState({...state, ph: e})}
          name="ph"
          value={state.ph}
        />
      </View>
      <Button title="Submit" onPress={storeData} />
      <Button title="Fetch Data" onPress={getData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: '#F3C892',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    width: '100%',
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  fullscreen:{
    marginBottom:50,
    marginTop:-100,
    fontSize:22,
    fontWeight:'bold',
     color:'red'
    
  }
});