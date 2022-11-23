import React,{Component} from 'react';
import { TouchableOpacity } from 'react-native';
import{View,Image,ImageBackground,StyleSheet,Text, Alert}from 'react-native';
//import FTP from 'react-native-ftp';
import AsyncStorage from '@react-native-community/async-storage';
import { thisTypeAnnotation, throwStatement } from '@babel/types';
import { color } from 'react-native-reanimated';
import moment from 'moment';


export default class HomeScreen extends Component
{          
  
    constructor(props)
    {
        super(props);
        var oper;
        this.state = {operation: ''};
        this.state = {pendingOrder: ''};
        this.state = {completedOrder: ''};
        this.state = {totalPrice: ''};
        this.state = {firstName: ''};
        this.state = {lastName: ''};
    }

    componentDidMount(){
      // TODO: What to do with the module?
      moment.utc("2019-12-04 12:00:24").local().startOf('seconds').fromNow()
      
      // FTP.setup("139.59.65.210",21) //Setup host
      // FTP.login("root","6cZxbds69^@Ky!*Y").then(
      //   (result)=>{
      //     FTP.list(".").then(
      //       (result)=>{
      //         console.log(result);
      //       }
      //     );
      //   },
      //   (error)=>{
      //     alert(error);
      //   }
      // )
      this.displayData();
      this.oper = this.props.route.params?.operation
      console.log('passedvalue',this.oper)
    }

  

    displayData = async () => {
      try {
  
        let pendingOrder = await AsyncStorage.getItem('pendingOrder');
        const parsePendingOrder= JSON.parse(pendingOrder)              
        this.setState({pendingOrder: parsePendingOrder})
        
        let completedOrder = await AsyncStorage.getItem('completedOrder');
        const parseCompletedOrder= JSON.parse(completedOrder)
        this.setState({completedOrder: parseCompletedOrder})  
  
        let totalPrice = await AsyncStorage.getItem('totalPrice');
        const parseTotalPrice= JSON.parse(totalPrice)
        this.setState({totalPrice: parseTotalPrice})  
  
        let totalOrder = await AsyncStorage.getItem('totalOrder');
        const parseTotalOrder = JSON.parse(totalOrder)
        console.log("HomeScreen Parse parseTotalOrder - ", parseTotalOrder)
        
        let firstName = await AsyncStorage.getItem('first_name');
        this.setState({firstName: firstName}) 
        
        let lastName = await AsyncStorage.getItem('last_name');
        this.setState({lastName: lastName}) 
  
        let id = await AsyncStorage.getItem('user_id');
        console.log("HomeScreen Parse ID - ", id)
              
      } catch (error) {
        Alert.alert(error);
      }
    };



    render()
    {
        return(
            <View style={{ flex:1,justifyContent:'center',alignItems:'flex-start'}}>
              <Text style={styles.user}> Hi {this.state.firstName} {this.state.lastName}</Text>
              <View style={styles.spacing}></View>
                 <Text style={styles.title}> Manage your business - (Business Name - Pre se) </Text>

                 <View style={styles.spacing}></View>
                <View style={styles.row}>
                  <Image source={require('../Images/menuitem.jpg')} style={{width: 100, height: 100, marginLeft: 40}}/>
                    <View style={styles.colum}>
                        <Text style={styles.textSize}>PendingOrder</Text>
                        <Text style={styles.textCo}>{this.state.pendingOrder}</Text>
                    </View>
                </View>
                          
                <View style={styles.spacing}></View>

                <View style={styles.row}>
                  <Image source={require('../Images/table.jpg')} style={{width: 100, height: 100, marginLeft: 40}}/>
                    <View style={styles.colum}>
                      <Text style={styles.textSize}>CompletedOrder</Text>
                      <Text style={styles.textCo}>{this.state.completedOrder}</Text>
                    </View>
                </View>
                          
                

                <View style={styles.spacing}></View>

      
                <View style={styles.row}>
                  <Image source={require('../Images/dollar.jpg')} style={{width: 100, height: 100, marginLeft: 40}}/>
                    <View style={styles.colum}>
                      <Text style={styles.textSize}>TotalPrice</Text>
                      <Text style={styles.textCo}>{this.state.totalPrice}</Text>
                  </View>
                </View>

                <View style={styles.spacing}></View>

                <View style={styles.row}>
                  <Image source={require('../Images/Order.jpg')} style={{width: 100, height: 100, marginLeft: 40}}/>
                    <View style={styles.colum}>
                        <Text style={styles.textSize}>Menu Items</Text>
                        <Text style={styles.textCo}>{10}</Text>
                    </View>
                </View>                  
            </View>
        );
    }

    delete = () => {
        fetch("http://testweb.izaap.in/moop/api/index.php/service/orders/remove?X-API-KEY=MoopApp2021@!&order_id=694", {
      method: 'GET',
      
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.text())
      .then((response) => {
        console.log("Text")
        console.log(response)
        return response.text();
     })
      .then((responseJson) => {
        //Hide Loader
        //setLoading(false);
        console.log(response.json())
        console.log(responseJson.status);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          // AsyncStorage.setItem('user_id', responseJson.data['id']);
          // console.log(responseJson.data['id']);
          // navigation.replace('DrawerNavigationRoutes');

        } else {          
          console.log('Error');
        }
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.log("Error Catch")
        console.error(error);
      });
    }
}

const styles=StyleSheet.create(
    {
        txtt:{
            fontSize:40,
            top:150,
            color:'red',
            fontStyle:'italic',            
        },
        row:{
          flexDirection: 'row',          
        },
        colum:{
          flexDirection: 'column',
        },
        textCo:{
          color: 'red',
          marginTop: 20,
          marginLeft: 10,
        },
        textSize:{
          marginTop: 20,
          marginLeft: 10,

          fontSize: 20,
        },
        spacing:{
          height: 20,
        },
        title:{
          fontSize: 15,
          fontWeight: 'bold',
          marginLeft: 10,
        },
        user:{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 10,
        }
    });