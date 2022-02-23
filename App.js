import React, {Component} from 'react';
import {TextInput, Text, Button, Alert, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import {Formik} from 'formik';

export default class App extends Component {
  render() {
    const inputStyle = {
      borderWidth: 1,
      borderColor: '#4e4e4e',
      padding: 12,
      marginBottom: 5,
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
      <Formik
        initialValues={{
          Name: '',
          Age: '',
          DOB: '',
          blood_group: '',
          address: '',
          email: '',
          ph: '',
        }}
        onSubmit={values => Alert.alert(JSON.stringify(values))}
        validationSchema={yup.object().shape({
          Name: yup.string().required('Please, provide your name!'),
          Age: yup.number().positive().integer().required(),
          blood_group: yup.string()
          .required("Please enter the required field")
          .matches(/^(A|B|AB|O)[+-]$/i, "Only alphabets are allowed for this field "),
          address: yup.string().required('Please, provide your address!'),
          email: yup.string().email().required('Email is required'),
          ph: yup
            .string()
            .required('This field is Required')
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              'Phone number is not valid',
            ),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
         
         
          <View style={styles.formContainer}>
             <Text style={styles.fullscreen}>BLOOD BANK🩸</Text>
           
            <TextInput
              value={values.Name}
              style={inputStyle}
              onChangeText={handleChange('Name')}
              onBlur={() => setFieldTouched('Name')}
              placeholder="Name"
            />
            {touched.Name && errors.Name && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.Name}
              </Text>
            )}
            <TextInput
              value={values.Age}
              style={inputStyle}
              onChangeText={handleChange('Age')}
              onBlur={() => setFieldTouched('Age')}
              placeholder="Age"
            />
            {touched.Age && errors.Age && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.Age}
              </Text>
            )}
            <TextInput
              value={values.blood_group}
              style={inputStyle}
              onChangeText={handleChange('blood_group')}
              onBlur={() => setFieldTouched('blood_group')}
              placeholder="blood-group"
            />
            {touched.blood_group && errors.blood_group && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.blood_group}
              </Text>
            )}
           
            <TextInput
              value={values. address}
              style={inputStyle}
              onChangeText={handleChange('address')}
              onBlur={() => setFieldTouched('address')}
              placeholder="address"
            />
            {touched.address && errors.address && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.address}
              </Text>
            )}
             
            <TextInput
              value={values.email}
              style={inputStyle}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              placeholder="E-mail"
            />
            {touched.email && errors.email && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.email}
              </Text>
            )}
            <TextInput
              value={values.ph}
              style={inputStyle}
              onChangeText={handleChange('ph')}
              placeholder="Phone Number"
              onBlur={() => setFieldTouched('ph')}
              secureTextEntry={true}
            />
            {touched.ph && errors.ph && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.ph}
              </Text>
            )}
            <Button
              color="#3740FE"
              title="Submit"
             // disabled={!isValid}
              onPress={handleSubmit}
            />
            <Button title="Fetch Data" onPress={getData} />
          </View>
          
        )}
      </Formik>
    );
  }
}
const styles = StyleSheet.create({

  formContainer: {
    padding: 50,
  },
  fullscreen:{
    marginBottom:50,
    marginTop:50,
    marginLeft:70,
    fontSize:22,
    fontWeight:'bold',
     color:'red'
    
  }
  
});