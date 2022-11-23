import React, { Component } from 'react';
 
import { StyleSheet, Alert, View, Button, Picker,Text,TextInput,TouchableOpacity,Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { Dropdown } from 'react-native-material-dropdown-v2';

let array = [],tableno=[];
//var selectedTable;
    //var selectedMenu;
    //var tableNo;
    //var instruction;
    let arrayobject={};
    var special_instruction;
    //var listData = [];
export default class Detail extends Component{
 
  static navigationOptions = ({ navigation }) => {
    navigation.route.navigationOptions ={
      title: 'Order Detail', //Set Header Title      
    }  
  };
  

  constructor(props){ 
    super(props); 
    var data1;
    var orderId;
    var tableId;
    var specialInstruction;
    var comments;
    var oper;
    //const { navigation } = this.props;  
    this.state = {
      data:''
    }
    
    this.state = {user_id: ''}
    this.state = {order_id: ''}
    this.state = {table_id: ''}
    this.state = {seats: ''}
    this.state = {amount: ''}
    this.state = {menujson: ''}
    this.state = {special_instruction: ''}
    this.state = {comments_txt: ''}
    this.state = {operation: ''}
    this.state={ 
      PickerValueHolder : ''
    }
    this.state = {
      TextInputValue: ''
    }
    this.state = {
      TextInputValue1: '',      
    }    
    this.state = {
      selectedTable: '',
    }
    this.state = {
      tableNo: '',
    }
    this.state = {
      selectedMenu: '',
    }
    this.state = {
      listData: [],
    }
    this.state = {
      instruction: '',
    }

  }

  componentWillMount(){    
    this.props.navigation.addListener('focus', () => {
     

      console.log("componentWillMount AddUpdatePage") 
      this.oper = this.props.route.params?.operation ?? 'add'
      console.log('Operation Add - ', this.props.route.params?.operation)
      console.log('Values ***', this.props.route.params?.data.id)
      
        this.data1 = this.props.route.params?.data.id ?? 'defaultValue';
        this.orderId = this.props.route.params?.data.id ?? '0';
        this.tableId = this.props.route.params?.data.tableid ?? 'Enter Table No';
        this.seats = this.props.route.params?.data.seats?? 'Seats'
        this.amount = this.props.route.params?.data.amount?? 'Amount'
        this.menujson = this.props.route.params?.data.menujson?? 'MenuItem'
        this.specialInstruction = this.props.route.params?.data.special_instruction ?? 'Special Instruction';
        this.comments = this.props.route.params?.data.comments;

        this.setState({data: this.data1}); 
        this.setState({order_id: this.orderId});
        this.setState({table_id: this.tableId});
        this.setState({seats: this.seats});
        this.setState({amount: this.amount});
        this.setState({menujson: this.menujson})
        this.setState({special_instruction: this.specialInstruction});
        this.setState({comments_txt: this.comments});
       
    });    
  }

  componentDidMount() {       

    this.props.navigation.addListener('focus', () => {
      console.log("componentDidMount AddUpdatePage")   
      console.log("data1", this.data1)
      console.log("data1", this.orderId)
      console.log("data1", this.tableId)
      console.log("data1", this.specialInstruction)
      console.log("data1", this.comments)
    });
    //this.fetchData();     
  }


  fetchData = async () => {
    console.log("Fetch Data -", this.state.order_id)     
    fetch(`http://testweb.izaap.in/moop/api/index.php/service/orders/view?X-API-KEY=MoopApp2021@!&order_id=${this.state.order_id}`,{
        method: 'GET'
        //Request Type 
        })
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          return responseJson.data;
        })
        .then( data  => {
              //setListData(data);    
              console.log('OrderDetails',data);
              if(data != undefined){ 
                     // data.map((item, index)=>{                          
                      //const obj = JSON.parse(item.menujson);      
                  //     obj.map((objitem, index)=>{       
                  // })       
                 // })
              }
              else
              {
                console.log('No Data Found');
                Alert.alert('No Data Found');
              } 
        })
        .catch((error) => {
          console.error(error);
        });
  }
 
  GetSelectedPickerItem=()=>{ 
    Alert.alert(this.state.PickerValueHolder);
  }

  state = {  
    isVisible: true, //state of modal default false  
    // specialIns: '',
    // tableNo:'',
    order_id: '',
    comments: '',
    special_instruction: '',
    table_id: '',
    seats:'',
    amount:'',
    menujson:'',
  }  

  buttonClickListener = () =>{
    const { TextInputValue }  = this.state ;
    //Alert.alert(TextInputValue);    
    const {TextInputValue1} = this.state;
}

onMultiChange = () => {
  return (item) => setselectedMenu(xorBy(selectedMenu, [item], 'id'))
}

onChange = () => {
  return (val) => setselectedTable(val)
}

addOrder =()=>{
 
    console.log("Update Operation")

    console.log("OrderId -", this.state.order_id)
    var dataToSend = {
      user_id:'251',
      rest_id:'3',
      table_id:this.state.table_id,
      seats:this.state.seats,
      menujson:this.state.menujson,
      paymentjson:[{}],
      amount:this.state.amount,
      paymentmode:'Apple',
      status:this.state.PickerValueHolder,
      transactionid:'1',
      transactiontag:'1',
      comments:this.state.comments_txt,
      orderjson:[{}],
      orderfee :'100',
      special_instruction:this.state.special_instruction,
      tip_amount:10,  
      order_id:this.state.order_id  
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
          Alert.alert('Order has been Updated successfully');
          console.log('Order has been Updated successfully');
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


toDrop = () =>{
  this.setState({ isVisible: true})
  this.navigation.navigate('AddUpdateOrderStack',{Screen:'AddUpdateOrder'})
}

render() {
    return (
        
        <View style={styles.container}> 
            <View  style={styles.headerView}>
              <Text style={styles.txt}>
                  Order Details
              </Text>
            </View>
          
            <View style={{flexDirection:'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                 <Text style={{fontWeight:'bold', fontSize:20}}>Order ID: </Text> 
                 <Text style={{fontWeight:'bold', fontSize:18}}>{this.state.order_id} </Text>
            </View>
            <View style={{flexDirection:'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                 <Text style={{fontWeight:'bold'}}>Table Number: {this.state.table_id} </Text>
            </View>
            <View style={{flexDirection:'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                 <Text style={{fontWeight:'bold'}}>Seats: {this.state.seats} </Text>
            </View>
            <View style={{flexDirection:'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                 <Text style={{fontWeight:'bold'}}>Amount: {this.state.amount} </Text>
            </View>
            <View style={{flexDirection:'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                <Text style={{fontWeight:'bold'}}>Special Instruction: {this.state.special_instruction} </Text>
                </View>
            <View style={{flexDirection:'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                 <Text style={{fontWeight:'bold'}}>Menu Items: {this.state.menujson} </Text>
            </View>
           


            <View style={{flexDirection:'row', marginTop: 10,}}>
                    <Text style={{fontWeight:'bold', marginLeft: 20}}>Comments</Text>
                 <TextInput
                    placeholder='Enter Comments Here '
                        placeholderTextColor='#303030'                
                        onChangeText={(comments) => this.setState({ comments })}
                        value={this.state.comments}
                        style={{
                        borderWidth: 2,
                        borderRadius:10,
                        flexDirection:'row',
                        borderColor: '#000',
                        padding: 15,
                        width:300,
                        height:100,
                        //right:160,
                        marginTop: 30,
                        fontWeight:'bold',
                        fontSize:18,  
                        marginLeft: -90,                
                        }}
                />
                </View>
                
            <View style={{flexDirection:'row', marginTop: 10, marginTop: 20, marginLeft: 20, marginRight: 20}}>
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
       