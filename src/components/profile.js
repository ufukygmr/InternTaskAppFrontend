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
  TextInput
} from 'react-native';

import SvgUri from 'react-native-svg-uri';
// import testSvg from './../images/unigatherLogo.svg';
import axios from 'axios';
import MainStore from './store'
import {observer} from 'mobx-react'


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

@observer
class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      password: ""
    }
  }

  static navigationOptions = {
    headerMode: 'none'
  }

    getUser = () => {
      axios.get("http://192.168.0.23:3000/user/me", {
          headers: {
              token : MainStore.token
          }
      })
      .then(res=> {
          MainStore.user = res.data
      })
      .catch(err => alert("Unable to Retrieve User"))
  }


  handlePassword = () => {
    let body = {
        email : MainStore.me.email,
        password: this.state.password
    }
    axios.post("http://192.168.0.23:3000/user/changePasswd", body,{
        headers: {
            token : MainStore.token
        }
    })
    .then(res=> {
        console.log(res)
    })
    .catch(err => alert("Uups! An error accured while changing Password"))
  }


  componentDidMount(){
    this.getUser()
  }

  render (){


    return (
      <>
        <StatusBar barStyle = "dark-content"/>
        <SafeAreaView style = {styles.container}>
          <View style = {styles.userContainer}>
            <Text style = {styles.userText}>{MainStore.user.firstname} {MainStore.user.lastname}</Text>
            <Text style = {styles.userText}>{MainStore.user.email}</Text>
            <Text style = {styles.userText}>{MainStore.user.job}</Text>
            <TextInput secureTextEntry = {true} style = {styles.input} placeholder= "Enter New Password" value = {this.state.password} onChangeText = {(text)=> this.setState({password: text})}/>
            <TouchableOpacity style=  {styles.userButton} onPress = {() => this.handleDelete(MainStore.user.email)}>
              <Text style = {styles.userDelete}>Save Password</Text>
            </TouchableOpacity>
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
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f6f6f8'
  },
  header: {
    color: "#5572b5",
    fontSize: 24, 
    top: 6*screenHeight/100,
    textAlign: 'center'
  },  
  userContainer: {
    // borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    width: 80*screenWidth/100,
    marginLeft: '10%',
    marginTop: 50,
    justifyContent: 'center',
    marginTop: 25*screenHeight/100
  },
  userButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 20
  },
  userDelete: {
    color: '#fff',
    textAlign: 'center'
  },
  userText: {
    width: '100%',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  },
  input : {
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: '#f6f6f8',
    padding: 20,
    fontSize: 16
  }

});

export default MainPage;
