// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, {useState, useEffect,Component} from 'react';
import moment from 'moment';
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Modal,
  Button,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-shadow-cards';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';

var Image_Http_URL;

const MenuItem = ({navigation}) => 
{  
  const [isModalVisible, setModalVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const toggleModalVisibility = () => {
		setModalVisible(!isModalVisible);
  };
  const [count, setCount] = React.useState(0);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [menuitem, setMenuitems] = useState([]);
  const [listData, setListData] = useState([]);
  const [userId, setUserId] = useState([]);

    const item=()=>{
      Alert.alert('hi')
    }


    const closeItem = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };
  
  
    const onItemOpen = rowKey => {
      console.log('This row opened', rowKey);
    };

    displayData = async () => {
      try {
        let id = await AsyncStorage.getItem('user_id');
        console.log("HomeScreen Parse ID - ", id)
        
        
        var userID = id;
        console.log('1',userID)
        userID = userID.replace(/\"/g, '');
        console.log('2',userID)
    
        setUserId(id);     
        fetch(`http://testweb.izaap.in/moop/api/index.php/service/menuitems/lists?X-API-KEY=MoopApp2021@!&user_id=${userID}`,{
          method: 'GET'
          //Request Type 
          })
          .then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson);
            return responseJson.data;
          })
          .then( data  => {
                setListData(data);     
                console.log("Data count",data);
                if(data != undefined){
                    data.map((item, index)=>{  
                   
                    // //const obj = JSON.parse(item.menujson);      
                    //     obj.map((objitem, index)=>{       
                    // })       
                    })
                } 
                else{
                  console.log('No Data Found');
                  Alert.alert('No Data Found');
                }           
          })
          .catch((error) => {
            console.error(error);
          });          
      } catch (error) {
        Alert.alert(error);
      }
    };

    
    useEffect(() => {       
            
      const unsubscribe = navigation.addListener('focus', () => {
      displayData();
        
      });
  
  return unsubscribe;
      
  }, [navigation]);


  //   useEffect(() => {
  //   fetch('http://testweb.izaap.in/moop/api/index.php/service/menuitems/lists?X-API-KEY=MoopApp2021@!&user_id=251',{
  //     method: 'GET'
  //     //Request Type 
  //     })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       //console.log(responseJson);
  //       return responseJson.data;
  //     })
  //     .then( data  => {
  //           setMasterDataSource(data);     
  //           console.log("Data count",data);
  //           if(data != undefined){
  //               data.map((item, index)=>{  
               
  //               // //const obj = JSON.parse(item.menujson);      
  //               //     obj.map((objitem, index)=>{       
  //               // })       
  //               })
  //           } 
  //           else{
  //             console.log('No Data Found');
  //             Alert.alert('No Data Found');
  //           }           
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  
  const getMenuItemDetail = (rowMap, rowKey, data) => {
    console.log('MenuItem Get Detail - Delete **-', data.item.id)
    console.log('MenuItem Key', rowKey)    
    navigation.navigate('AddMenuItemStack',{
        screen: 'AddMenuItem', 
        params: {data: data, operation: 'update'},
    });
  }

  const deleteItems = (rowMap, rowKey, data) => { 
    console.log('RowKey delete item**-',data.item.id)
    closeItem(rowMap, rowKey);
    const newData = [...listData];    
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    console.log(rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);    
    deleteMenuItem(data);
  };


  const deleteMenuItem = (data) => {      
    console.log('Delete Order',data.item.id);
    let dataToSend = {order_id: data.item.id};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(`http://testweb.izaap.in/moop/api/index.php/service/menuitems/remove?X-API-KEY=MoopApp2021@!&menu_item_id=${data.item.id}`, {
      method: 'GET',
      
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        
        console.log(responseJson);        
        if (responseJson.status === 'success') {         

        } else {          
          if(responseJson.message === 'No Tables Found!')
          {
            Alert.alert('MenuItem Deleted Successfully')
          }            
        }
      })
      .catch((error) => {
        //Hide Loader
       // setLoading(false);
        Alert.alert(error)
        console.error(error);
      });
  };


  const renderHiddenItem = (data, rowMap) => {
    //console.log("renderHiddenItem", data.item.id);
    //console.log(rowMap, data);
    return(
    <View style={styles.rowBack}>
      <TouchableOpacity style={[styles.actionButton, styles.closeBtn]} onPress={() => {getMenuItemDetail(rowMap, data.item.key, data)}}>      
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, styles.deleteBtn]} onPress={() => {
        
        Alert.alert(
          'Alert',
          'Are you sure you want to delete ?',
          [
            {text:'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text:'Yes', onPress: ()=> {
              deleteItems(rowMap, data.item.key, data);
            }}
          ],
          { cancelable: true}
        );
        }
      }>
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

  const ItemView = ({item}) => 
  {  
    let itemName="",altName="",price="",priceType="",menuType="",category="",modifiers="",taxes="",description="",createdDate="",modifiedDate="",status="",menuimage=""; 
    try{   
      itemName=item.itemname;
      altName=item.altername;
      price=item.price;
      priceType=item.pricetype;
      menuType=item.menutype;
      category=item.category;
      modifiers=item.modifiers;
      taxes=item.taxes;
      description=item.description;
      createdDate=item.date_created;
      modifiedDate=item.date_modified;
      menuimage=item.menuimage
      Image_Http_URL = {uri: 'data:image/jpeg;base64,' + item.menuimage};
    } catch(e) { console.error(e); } 
  
    

    return (  
     
        <View>
          {(

          <Card style={{width: '95%', padding: 5, margin: 5, backgroundColor:'#F6FAFE'}}>
          <TouchableOpacity onPress={() => getItem(item)} style={styles.rowFront} underlayColor={'#fff'}>  
              <View style={{flex:1, flexDirection: 'row'}}>  
                  <Image source={Image_Http_URL} style = {styles.imageView} />
                  <View style={{flex:1, flexDirection: 'column', width: '100%'}}> 
                    <Text style={styles.itemStyle}>{"Menu Item Name: "+itemName}</Text>  
                    {/* <Text style={styles.itemStyle}>{"Menu AlterName: "+altName }</Text>  */}
                    <Text style={styles.itemStyle}>{"Price: $"+price }</Text> 
                    <Text style={styles.itemStyle}>{"Price Type: "+priceType }</Text> 
                    {/* <Text style={styles.itemStyle}>{"Menu Type: "+menuType }</Text>  */}
                    <Text style={styles.itemStyle}>{"Category: "+category }</Text> 
                    <Text style={styles.itemStyle}>{"Modifiers: "+modifiers }</Text> 
                  
                    <Text style={styles.itemStyle}>{"Description: "+description }</Text> 
                    </View>
            </View>
          </TouchableOpacity>
          </Card>
          )}
        </View>
     
    );
  };

  const ItemSeparatorView = () => 
  {
    return (
      // Flat List Item Separator
      <View style={{height: 0,width: '100%',backgroundColor: '#C8C8C8'}}/> 
    );
  };

  const getItem=(item)=>
  {
    itemName=item.itemname;
      altName=item.altername;
      price=item.price;
      priceType=item.pricetype;
      menuType=item.menutype;
      category=item.category;
      modifiers=item.modifiers;
      taxes=item.taxes;
      description=item.description;
      createdDate=item.date_created;
      modifiedDate=item.date_modified;
       Alert.alert('Menu Item Id: ' + item.id + '\n'+'MenuItem Name: ' + item.itemname + '\n' + 'Menu Alter Name: ' + item.altername);
  };

  const searchFilterFunction = (text) => {
    console.log('searchFilterFunction');
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      

      console.log(text);
      const newData = listData.filter(
        function (item) {
          const itemData = item.itemname
            ? item.itemname.toUpperCase()
            : ''.toUpperCase();
  
            const itemData1 = item.altername
            ? item.altername.toUpperCase()
            : ''.toUpperCase();
  
            const itemData2 = item.price
            ? item.price.toUpperCase()
            : ''.toUpperCase();
  
          const textData = text.toUpperCase();
         // return itemData.indexOf(textData) > -1;
  
          return (
            itemData.indexOf(textData) > -1 
            || itemData1.indexOf(textData) > -1 
            || itemData2.indexOf(textData) > -1
          )
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredData(listData);
      setSearch(text);
    }
  };

  return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
        
          <View  style={styles.headerView}>
            <Text style={styles.txt}>
                Menu Items
            </Text>
          </View>
          <SwipeListView
            data={filteredData && filteredData.length > 0 ? filteredData : listData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onItemOpen}       
            disableRightSwipe={true}      
          />
        </View>

      <TouchableOpacity style={styles.addButton} onPress={() =>navigation.navigate('AddMenuItemStack',{Screen:'AddMenuItem', params: {operation:'add'}})}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
    },
    itemStyle: {
      padding: 3,
      fontSize: 12,
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
    container2:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    txt:{
      //paddingLeft:100,
      fontSize:22,
      fontWeight:'bold',    
    },
    headerView:{    
      alignItems: 'center',    
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
    addButtonText:{
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
     },
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      height:450,
      width:360,
      alignSelf:'center'
    },
    note: {
      position:'relative',
      padding:20,
      paddingRight:100,
      borderBottomWidth:2,
      borderBottomColor:'#bdb76b',    
    },
    rowFront: {
      //alignItems: 'center',
      //backgroundColor: 'lightcoral',
      //borderBottomColor: 'black',
      //borderBottomWidth: 0.5,
      //justifyContent: 'center',
      height: 170,
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
      right: 80,
    },
    btnText: {
      color: '#FFF',
      textShadowColor: 'white',    
    },
    deleteBtn: {
      backgroundColor: 'red',
      right: 10,
    },
    imageView: {     
      width: 100,    
      height: 100 ,
      margin: 7,
      marginTop:30,
      borderRadius: 10,    
      alignItems: 'center',
      justifyContent: 'center',
  }, 
});

export default MenuItem;