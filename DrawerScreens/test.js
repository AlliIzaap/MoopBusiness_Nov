import React, { Component } from 'react';
 
import { StyleSheet, Alert, View, Button, Picker,Text,TextInput,TouchableOpacity,Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
 
export default class OrderDetailPage extends Component{
 
  constructor(props){ 
    super(props); 
    
    var orderId;

    this.state={ 
      PickerValueHolder : '' 
    }
    this.state = {
      TextInputValue: ''
    }
    this.state = {
      TextInputValue1: '',      
    }    
  }

  componentWillMount(){
    
    this.props.navigation.addListener('focus', () => {
      console.log("componentWillMount") 
      this.oper = this.props.navigation.getParam(item, 'a')  
console.log('wwwww', this.oper)
      this.orderId = this.props.route.params?.data.amount ?? 'Menuitem';
      console.log("componentWillMount OrderId OrderDetailPage", this.orderId)
      console.log("componentWillMount", this.oper) 
    });    
  }


  componentDidMount(){
   
    //this.displayData();
    console.log('orderDetailComponentDidMount')
    this.oper = this.props.route.params?.operation
    console.log('passedvalue',this.oper)
  }
 
  GetSelectedPickerItem=()=>{ 
    Alert.alert(this.state.PickerValueHolder);
  }

  state = {  
    isVisible: true, //state of modal default false  
    specialIns: '',
    tableNo:'',
  }  
  
  buttonClickListener = () =>{
    const { TextInputValue }  = this.state ;
    //Alert.alert(TextInputValue);    
    const {TextInputValue1} = this.state;
  }

addOrder =()=>{
  console.log('AddOrder'+ this.state.tableNo)
  var dataToSend = {
    user_id:'251',
    rest_id:'3',
    table_id:this.state.tableNo,
    seats:'3',
    menujson:[{}],
    paymentjson:[{}],
    amount:'500',
    paymentmode:'Apple',
    status:this.state.PickerValueHolder,
    transactionid:'1',
    transactiontag:'1',
    comments:'2345',
    orderjson:[{}],
    orderfee :'100',
    special_instruction:this.state.specialIns,
    tip_amount:10,    
  };
  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch('http://testweb.izaap.in/moop/api/index.php/service/orders/place?X-API-KEY=MoopApp2021@!', {
    method: 'POST',
    body: formBody,
    headers: {
      //Header Defination
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      //Hide Loader
      //setLoading(false);
      console.log(responseJson);
      // If server response message same as Data Matched
      if (responseJson.status == "success") {
        Alert.alert('Order has been placed successfully');
        console.log('Order has been placed successfully');
        this.props.navigation.navigate('orderScreenStack',{Screen:'orderScreen'})

      } else {
        setErrortext('Error');
      }
    })
    .catch((error) => {
      //Hide Loader
      //setLoading(false);
      console.error(error);
    });
}

 render() {
  return (
      
      <View style={styles.container}> 
          <View  style={styles.headerView}>
            <Text style={styles.txt}>
                Order Details
            </Text>
          </View>
        
          <View style={{flexDirection:'row', marginLeft: 20, marginRight: 20}}>
            <TouchableOpacity style={styles.cancelButton} >
                <Text style={styles.buttonTxt}>Cancel Order</Text>
            </TouchableOpacity>
            <View style={{width: 20}}></View>
            <TouchableOpacity style={styles.payButton}>
                <Text style={styles.buttonTxt}>Pay</Text>
            </TouchableOpacity>
          </View>
      </View>
      
      );
    }
   
  }        
 

 
const styles = StyleSheet.create({ 
  MainContainer: 
  {
    top:20,
     width:250,
    height:120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius:10,
    borderColor: 'black',
    left:50,
    marginTop: (Platform.OS === 'ios') ? 20 : 0
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  list: {
    color: '#FFF',
  },
btn1:{
  height:40,
  width:250,    
  fontWeight:'bold',        
  borderWidth:2,
  borderRadius:10,
  marginLeft:50,
  bottom:20,
  marginTop:100,
  justifyContent:'center',
  alignItems:'center',
},
btnText: {
  color: '#FFF',
  textShadowColor: 'white',    
},
txt:{
  //paddingLeft:100,
  fontSize:22,
  fontWeight:'bold',    
},
headerView:{    
  alignItems: 'center',    
},
btn:{
    height:40,
    width:120,            
    borderWidth:2,
    borderRadius:80,
    fontWeight:'bold',        
    marginLeft:100,
    marginTop:90,
    justifyContent:'center',
    alignItems:'center',
},
conta: {  
  alignItems: 'center',  
  justifyContent: 'center',  
  backgroundColor: '#ecf0f1',  
},  
modal: {  
justifyContent: 'center',  
alignItems: 'center',   
backgroundColor : "#00BCD4",   
height: 250 ,  
width: '70%',  
borderRadius:10,  
borderWidth: 2,  
borderColor: '#fff',    
marginTop: 80,  
marginLeft: 40,  
top:50, 
 },  
 textInputStyle: {
  height: 40,
  borderWidth: 2,
  paddingLeft: 20,
  borderRadius:10,
  margin: 5,
  borderColor: '#5F6160',
  backgroundColor: '#F6FAFE',
},

 text: {  
    color: '#3f2949',  
    marginTop: 10 ,
    bottom:30,
    fontSize:20,    
   } ,
   rowFront: {
    //alignItems: 'center',
    //backgroundColor: 'lightcoral',
    //borderBottomColor: 'black',
    //borderBottomWidth: 0.5,
    //justifyContent: 'center',
    height: 180,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  actionButton: {
    alignItems: 'center',
    bottom: 20,
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right:60,
    width: 75,
  },
  closeBtn: {
    backgroundColor: 'blue',
    //bottom: 40,
    right: 80,
    //width: 75,    
    //top: 20,
    // height: '100%'
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 10,
  },
  addButtonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  cancelButton:{
    backgroundColor: 'red'
  },
  payButton:{
    backgroundColor: 'green'
  },
  buttonTxt:{
    color: 'white',
    fontSize: 20,
    fontWeight:'bold',
    padding: 10,
    borderWidth: 2,
    borderColor: 'white'
  },
  addButton:{
    position:'absolute',
    zIndex:11,
    right:20,
    bottom:50,
    backgroundColor:'#DB3133',
    width:80,
    height:80,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    elevation:8,
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  
  itmtxt:{
    fontSize:20
},
itemStyle: {
  padding: 3,
  fontSize: 10,
},


});
 

