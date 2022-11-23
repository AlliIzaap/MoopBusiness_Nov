import React, { useState,useEffect } from 'react'
import {StyleSheet,TouchableOpacity, Text, Alert,View,TextInput,ScrollView} from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { Dropdown } from 'react-native-material-dropdown-v2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import {Card} from 'react-native-shadow-cards';
// Options data must contain 'item' & 'id' keys

let array = [],tableno=[],temp=[],temps=[],isShow=false;
var tempload=false;

function AddUpdateOrder({navigation}) {

  const [selectedTeam, setSelectedTeam] = useState({})
  const [selectedTeams, setSelectedTeams] = useState([])
  const [tableNo, setTableNo] = useState([])
  const [instruction, setInstructions] = useState()
 
  const [listData, setListData] = useState([]);
  let arrayobject={};
  var special_instruction;

  const [listDatas, setListDatas] = useState([]);
  
  const [filteredData, setFilteredData] = useState([]); 
  const [isVisible, setisVisible] = useState()
  const [isVisibleF, setisVisibleF] = useState()
  global.menulist=[];
  
  useEffect(() => {     
    
      const unsubscribe = navigation.addListener('focus', () => {
        displayData();
      });
    
      fetch('http://testweb.izaap.in/moop/api/index.php/service/menuitems/lists?X-API-KEY=MoopApp2021@!&user_id=251',{
        method: 'GET'
        //Request Type 
        })
        .then((response) => response.json())
        .then((responseJson) => {
         
          return responseJson.data;
        })
        .then( data  => {
              
              if(data != undefined){  
                      data.map((item, index)=>{    
                        array.push({id:item.id,item:item.itemname});  
                     //   console.log("item "+JSON.stringify(item));
                   })       
              }
              else
              {
                console.log('No Data Found');
                Alert.alert('No Data Found');
              } 
             // console.log("MenuIems - ",array)
              setListData(array);
        })
        .catch((error) => {
          console.error(error);
        });
        
        fetch('http://testweb.izaap.in/moop/api/index.php/service/tables/lists?X-API-KEY=MoopApp2021@!&user_id=251',{
          method: 'GET'
          //Request Type 
          })
          .then((response) => response.json())
          .then((responseJson) => {
            return responseJson.data;
          })
          .then( data  => {
            data.map((item, index)=>{    
              tableno.push({id:item.id,item:item.tablename});  
            })     
            setTableNo(tableno);  
          })
          .catch((error) => {
            console.error(error);
          });
},[listData,listDatas,tableNo]);

displayData = async ()=>{  
  try{  
   let final_menu= await AsyncStorage.getItem('menu_item'); 
   if(final_menu){
    setisVisible(false);
    setisVisibleF(true);
   let temp=[];
   var menulist=JSON.parse(final_menu);
   menulist.map((item, index)=>{    
   temp.push(item);
    })  
    setListDatas(temp)
  }else{
    setisVisible(true);
    setisVisibleF(false);
  }
  }  
  catch(error){  
    alert(error)  
  } 
}  

removeMenu=async()=>{
  console.log("remove")
  AsyncStorage.removeItem('menu_item');
}

const onItemOpen = rowKey => {
  console.log('This row opened', rowKey);
};

const ItemView = ({item}) => 
{        
  let itemname="",modifiers="",price=""; 
  try{   
    itemname=item.itemname;
    price=item.price;
   var  modifierslist=item.modifiersdet;
    try{
   console.log("modifiers "+JSON.stringify(modifierslist));
   // var modifierlist=JSON.parse(modifiers);
    //console.log("menu "+JSON.stringify(menulist));
      modifierslist.map((item, index)=>{    
     // console.log("Item "+item.modifier_name);
      modifiers=item.modifier_name+" "+modifiers;
      price=price+item.modifier_price;
    })
  //  modifiers="";
  }catch(error){
console.log("error "+error);
  }
                  
  } catch(e) { console.error(e); } 
  return (    
      <View>                
        <Card style={{width: '95%', padding: 10, margin: 10, backgroundColor:'#F6FAFE'}}>
        <TouchableOpacity onPress={() =>{toggleModalVisibility}} style={styles.rowFront} underlayColor={'#fff'}>
          <View  style={styles.rowContainer} > 
          <View>
          <Text style={styles.itemStyle}>{ itemname }</Text>  
          <Text style={styles.itemStyle}>{ modifiers }</Text>
          </View>
          <Text style={styles.itemStyle}>{ price }</Text>  
          </View>
        </TouchableOpacity>
        </Card>          
      </View>
  );
};

const ListFooter = () => {
  //View to set in Footer
  return (
    <View>
{isVisibleF ? (
    <View>
        <View style={{top:30}}>
          <Text style={styles.btn2} onPress ={()=>addmenuitems()}>
          Add Menu
        </Text>
        </View>
        <View style={{top:10}}>
          <View  style={styles.rowContainer} > 
          <Text style={styles.itemStyle}>SubTotal</Text>       
          <Text style={styles.btn2}>$90.00</Text>  
          </View>

          <View  style={styles.rowContainer} > 
          <Text style={styles.btn2}>Tax</Text>       
          <Text style={styles.btn2}>$2.25</Text>  
          </View>

          <View  style={styles.rowContainer} > 
          <Text style={styles.btn2}>Total</Text>       
          <Text style={styles.btn2}>$92.25</Text>  
          </View>

          <View  style={styles.rowContainer} > 
          <Text style={styles.itemStyle}>Cancel Order</Text>       
          <Text style={styles.itemStyle}>Pay Bill </Text>  
          </View>
          </View>
          </View>
 ) : null}  
    </View>
  );
};

const listHeader=()=>{
  <View style={{flex:1}}>
    
  </View>
}
return(
  
    <View style={{ margin: 10 ,flex:1}}>
         
         <View style={{top:20}}>
          <Text style={{fontSize:16,top:10,paddingRight:50,fontWeight:'bold'}}>
            Table No :
          </Text>
          <SelectBox
          baseColor={'#000'}
          dropdownOffset={{top: 0}}
          containerStyle={{borderColor: 'black', padding: 5}} //replace windowHeight with your own
          label= ""
          labelHeight={0}
          labelFontSize={0}
          options={tableNo}
          optionsLabelStyle={{color:'black'}}
          searchIconColor="black"
          arrowIconColor="black"
          toggleIconColor="black"
        value={selectedTeam}
        onChange={onChange()}
        hideInputFilter={false}
      />
        </View>
        <View style={{top:60}}>
          <Text style={{fontSize:16,top:10,fontWeight:'bold'}}>
            Special Instructions
          </Text>
          <View style={{flexDirection:'row',top:20}}>
          <TextInput
              placeholder='Enter Instructions Here '
                placeholderTextColor='grey' 
                onChangeText={text => setInstructions(text)}
                value={instruction}    
                style={{
                  borderWidth: 2,
                  borderRadius:10,
                  borderColor: '#000',
                  padding: 15,
                  height: 100,
                  width: 300,
                  
                  fontWeight:'bold',
                  fontSize:16,                  
                }}
           />
           </View>
        </View>
        <View style={{top:140}}>
        {isVisible ? (
          <TouchableOpacity style={styles.btn1}>
        <Text style={styles.btnTxt} onPress ={()=>addmenuitems()}>Add MenuItems</Text>
        </TouchableOpacity>
       ) : null}    
      </View>
        
        
      <View>
      <View style={{top:140}}>
      {isShow ? (
          <TouchableOpacity style={styles.btn1}>    
            <Text style={styles.btnTxt} onPress ={()=>addmenuitems()}>Add/Update</Text>
          </TouchableOpacity>
        ) : null}     
      </View>
     </View>
       <View style={{top:140}}>
         <SwipeListView
            data={listDatas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}           
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onItemOpen}
            disableRightSwipe={true} 
            removeClippedSubviews={false}
            ListFooterComponent={ListFooter}
          />
       </View>
    </View>

)
 

  function onMultiChange() {
 //   console.log("onMultiChange")
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))

  }

  function onChange() {
    return (val) => setSelectedTeam(val)
  }

  function addmenuitems(){
    navigation.navigate('AddOrderMenuStack',{Screen:'AddOrderMenu'})
  }

  function addOrder(){
//  console.log('selected Menu item - ', JSON.stringify(selectedTeams))
   // console.log('selected team'+selectedTeam.id);
       var dataToSend = {
          user_id:'251',
          rest_id:'3',
          table_id:selectedTeam.id,
          seats:'3',
          menujson:JSON.stringify(selectedTeams),
          paymentjson:[{}],
          amount:'500',
          paymentmode:'Apple',
          status:"",
          transactionid:'1',
          transactiontag:'1',
          comments:"",
          orderjson:[{}],
          orderfee :'100',
          special_instruction:instruction,
          tip_amount:10,    
        };
        console.log(JSON.stringify(dataToSend))
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
           // console.log(responseJson);
            // If server response message same as Data Matched
            if (responseJson.status == "success") {
              Alert.alert('Order has been placed successfully');
              console.log('Order has been placed successfully');
              tempload=false;
              navigation.navigate('orderScreenStack',{Screen:'orderScreen'})
            } else {
              setErrortext('Error');
            }
          })
          .catch((error) => {
            //Hide Loader
            //setLoading(false);
            console.error(error);
          });
    
   /*  }
    else{
      console.log("Update Operation")
  
      console.log("OrderId -", this.state.order_id)
      var dataToSend = {
        user_id:'251',
        rest_id:'3',
        table_id:this.state.table_id,
        seats:'3',
        menujson:[{}],
        paymentjson:[{}],
        amount:'500',
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
    }*/
    
  }

    

  
}

export default AddUpdateOrder;

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
  flex: 1,
  alignItems: 'center',
  backgroundColor: 'white',
  //marginTop: 10,
  marginRight:1, 
},
btn1:{
  height:40,
  width:250,    
  fontWeight:'bold',        
  borderWidth:2,
  borderRadius:10,
  marginLeft:50,
  bottom:20,
  
  justifyContent:'center',
  alignItems:'center',
},
btn2:{
  height:40,  
  fontWeight:'bold',        
  borderRadius:10,
  marginLeft:50,
  bottom:20,
  marginRight:50,
  alignSelf:'flex-end',
  justifyContent:'center',
  alignItems:'center',
},
btnTxt:{
color:'black',
fontWeight:'bold',
fontSize:20,
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
 text: {  
    color: '#3f2949',  
    marginTop: 10 ,
    bottom:30,
    fontSize:20,    
   } ,

   rowContainer: {
    flexDirection: 'row',
  },
  rowContainer1: {
    flexDirection: 'row',
  }
});
 