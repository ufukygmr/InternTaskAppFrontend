import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

import MainStore from './store';
import axios from 'axios';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email : "", 
      passwd : ""
    }
  }

  handleLogin = () => {
    let newUser = {
      email : this.state.email,
      password : this.state.passwd
    }
    axios.post("http://192.168.0.23:3000/user/login", newUser)
    .then(res=> {
      MainStore.token = res.data.token
      this.props.navigation.navigate("App")
    })
    .catch(err => Alert.alert("An error accured"))
   
  }
  

  render (){

    return (
      <>
        <StatusBar barStyle = "dark-content"/>
        <SafeAreaView style = {styles.container}>
          <View>
            <Image source = {require("./../images/logo.jpg")} style = {styles.logo}/>
          </View>
          <View style = {styles.authButtons}>
            <TextInput  placeholder = 'Email' style = {styles.loginInputs} onChangeText = {text => this.setState({email: text})}/>
            <TextInput  placeholder = 'Password' secureTextEntry = {true} style = {styles.loginInputs} onChangeText = {text => this.setState({passwd: text})}/>     
            <TouchableOpacity style = {styles.signButton} onPress = {() => {this.handleLogin()}}>
              <Text style = {styles.signText}>LogIn</Text>
            </TouchableOpacity>
            <View style = {{flexDirection: 'row', marginTop: 60, left: '20%'}}>
              <Text style = {styles.footerText}>Don`t Have an Account ? </Text>
              <TouchableOpacity onPress = {() => {this.props.navigation.navigate("Kayit")}}>
                <Text style = {styles.footerTextLast}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    height : screenHeight,
    width: screenWidth,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo : {
    width : 112,
    height: 80,
    top: 3*screenHeight/100,
    
  },
  authButtons : {
    width: '75%',
    top: screenHeight*10/100,
  
  },
  signButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 15,
    marginTop: 20
  },
  signText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400'
  },
  loginInputs :{ 
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 16,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
    height: screenHeight*5/100
  },
  unuttum : {
    fontSize: 10,
    color: '#000',
    textDecorationLine: "underline",
    textAlign: "right"
  },
  footerText: {
    color: '#000',
    textAlign: 'center'
  },
  footerTextLast:{
    color: '#000',
    
  }
});

export default Login;
