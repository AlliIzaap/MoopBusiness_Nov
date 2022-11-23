import React, { useState,useEffect } from 'react'
import {StyleSheet,TouchableOpacity, Text, Alert,View,TextInput} from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { set, xorBy } from 'lodash'
import { Dropdown } from 'react-native-material-dropdown-v2';
import AsyncStorage from '@react-native-community/async-storage';

// Options data must contain 'item' & 'id' keys

let array = [],tableno=[],temp=[],temps=[],modifieraray=[],modifierdetarray=[],menuitemdetarray=[];
var tempload=false;
var selectedmenu,menu_item,mergedobj;
function AddUpdateOrder({navigation}) {
  const [selectedTeam, setSelectedTeam] = useState({})
  const [selectedTeams, setSelectedTeams] = useState([])

  const [tableNo, setTableNo] = useState([])
  const [instruction, setInstructions] = useState()
 
  const [listData, setListData] = useState([]);
  let arrayobject={};
  var special_instruction;

  const USER_1 = {
    name: 'Tom',
    age: 20,
    traits: {
      hair: 'black',
      eyes: 'blue'
    }
  }
  
  const USER_2 = {
    name: 'Sarah',
    age: 21,
    hobby: 'cars',
    traits: {
      eyes: 'green',
    }
  }
  
  useEffect(() => {                   

      fetch('http://testweb.izaap.in/moop/api/index.php/service/menuitems/lists?X-API-KEY=MoopApp2021@!&user_id=251',{
        method: 'GET'
        //Request Type 
        })
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          //console.log("response "+responseJson);
          return responseJson.data;
        })
        .then( data  => {
              
              if(data != undefined){  
                      data.map((item, index)=>{    
                        array.push({id:item.id,item:item.itemname});  
                        menuitemdetarray.push(item);
                      //  console.log("item "+JSON.stringify(array));
                   })       
              }
              else
              {
                console.log('No Data Found');
                Alert.alert('No Data Found');
              } 
             
              setListData(array);
        })
        .catch((error) => {
          console.error(error);
        });
     

        fetch('http://testweb.izaap.in/moop/api/index.php/service/modifiers/lists?X-API-KEY=MoopApp2021@!&user_id=251',{
          method: 'GET'
          //Request Type 
          })
          .then((response) => response.json())
          .then((responseJson) => {
            return responseJson.data;
          })
          .then( data  => {
            data.map((item, index)=>{    
            //  tableno.push({id:item.id,item:item.modifier_name});  
             // modifierdetarray.push(item);
            })     
          //  setTableNo(tableno);  
          })
          .catch((error) => {
            console.error(error);
          });

         
},[listData,tableNo]);

saveMenu = async ()=>{  
  try{  
    let temp=[];
    let menu_items = await AsyncStorage.getItem('menu_item');   
   if(menu_items!=null){
    var obj=JSON.parse(menu_items);
    for(var i=0;i<obj.length;i++){
      temp[i]=obj[i];
    }
    temp[obj.length]=mergedobj;
   }else{
    temp[0]=mergedobj;
   }
   AsyncStorage.setItem('menu_item',JSON.stringify(temp));
  moveScreen();
  }  
  catch(error){  
    console.log("errror or dispplay")
    alert(error)  
  }  

}

moveScreen = async ()=>{  
  try{  
    let usrer= await AsyncStorage.getItem('menu_item');   
   //alert("storage "+user);
   var menulist=JSON.parse(usrer);
 //  console.log("menu "+JSON.stringify(menulist)); 

   navigation.navigate('AddUpdateOrderStack',{Screen:'AddUpdateOrder'})
  
  // console.log("sved "+usrer);
  }  
  catch(error){  
    alert(error)  
  }  
}  

return(

    <View style={{ margin: 10 }}>
         
         <View style={{top:20}}>
          <Text style={{fontSize:16,top:10,paddingRight:50,fontWeight:'bold'}}>
            Menu Item :
          </Text>
          <SelectBox
          baseColor={'#000'}
          dropdownOffset={{top: 0}}
          containerStyle={{borderColor: 'black', padding: 5}} //replace windowHeight with your own
          label= ""
          labelHeight={0}
          labelFontSize={0}
          options={listData}
          optionsLabelStyle={{color:'black'}}
          searchIconColor="black"
          arrowIconColor="black"
          toggleIconColor="black"
          value={selectedTeam}
          onChange={onChange()}
          hideInputFilter={false}
         />
        </View>
       
        <View style={{top:90}}>
              <Text style={{fontSize:16,top:10,paddingRight:70,marginBottom: 10 ,fontWeight:'bold'}}>
                  Modifiers :
              </Text>
              <SelectBox
                label=""
                selectedItemStyle={{color:'black'}}
                multiOptionsLabelStyle={{color:'black'}}
                multiOptionContainerStyle={{backgroundColor:'grey'}}
                options={tableNo}
                containerStyle={{borderColor:'black'}}
                selectedValues={selectedTeams}                
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
                searchIconColor="black"
                arrowIconColor="black"
                toggleIconColor="black"
              />
          </View>
        
      <View>
      <View style={{top:140}}>
          <TouchableOpacity style={styles.btn1}>
          
            <Text style={styles.btnTxt} onPress ={()=>addOrder()}>Add</Text>
          </TouchableOpacity>
      </View>
    </View>
    </View>
  
)
 
  

  function onMultiChange() {
  
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
   
  }


  function onChange( options ) {
    return (val) => getMenuItemView(val)
  }

  function getMenuItemView(val){
    setSelectedTeam(val);
    let issaved=true;
    //get ItemView
    console.log(val.id)
    selectedmenu=val.item;
   
    fetch('http://testweb.izaap.in/moop/api/index.php/service/menuitems/view?X-API-KEY=MoopApp2021@&menu_item_id='+val.id+{
      method: 'GET'
      //Request Type 
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("menu item des"+responseJson);
        //console.log("response "+responseJson);
        return responseJson.data;
      })
      .then( data  => {
         
            var modifiers = data.modifiers; 
             menu_item=JSON.stringify(data);  
             mergedobj=JSON.parse(menu_item);
          //   saveMenu();
             modifiers= modifiers.replace(/"/g, "");
             const modifierarr= modifiers.replace(/\[|\]/g,'').split(',');
             modifieraray=[];
             modifierdetarray=[];
             for(var i=0;i<modifierarr.length;i++)
             {
               //get ModifierView
               console.log("I "+i);
             fetch('http://testweb.izaap.in/moop/api/index.php/service/modifiers/view?X-API-KEY=MoopApp2021@!&modifier_id='+modifierarr[i],{
            method: 'GET'
            //Request Type 
            })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log("md det 1"+JSON.stringify(responseJson.status));
              return responseJson.data;
            })
            .then( data  => {
              console.log("md det "+JSON.stringify(data));
              modifieraray.push({id:data.id,item:data.modifier_name});  
              modifierdetarray.push(JSON.stringify(data));
        
              if(modifierexists(data.modifier_name))
              {

              }else{
                tableNo.push({id:data.id,item:data.modifier_name})
              }
              
           //   console.log("i "+i);
              console.log("length "+modifierarr.length)
              if(i==modifierarr.length){
               setTableNo([...tableNo]);
               setSelectedTeams([...modifieraray])
             
             // var json array ="data"
             
              let modifier = '{ "modifiersdet" : ['+modifierdetarray+']}';
              
              let obj1 = JSON.parse(menu_item);
              let obj2=JSON.parse(modifier);

              mergedobj = {
                ...obj1,
                ...obj2
              };
              //console.log("modifiers "+JSON.stringify(mergedobj))
             
            }
            })
            .catch((error) => {
              console.error(error);
            });
            } 

            
         
      })
      .catch((error) => {
        console.error(error);
      });
     
  }

  function modifierexists(modifiername) {
    return tableNo.some(function(el) {
      return el.item === modifiername;
    }); 
  }
  //set selecte onmultiselect
  function setValues(){
    console.log("modifier array"+JSON.stringify(modifieraray));
    console.log("selected Teams "+JSON.stringify(selectedTeams))
    //setSelectedTeams(modifieraray);
  }

  function addmodifiers(){
    tableno.push({'id':'23','item':'onions'});  
    tableno.push({'id':'24','item':'tomato '});          
    setTableNo(tableno);  
    console.log(tableNo);    
  }


  function addOrder(){
    saveMenu();
   /*console.log('selected team'+selectedTeam.id);
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
            console.log(responseJson);
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
          });*/
    
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
});
 

