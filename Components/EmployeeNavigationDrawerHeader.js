// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Image, TouchableOpacity, Alert,StyleSheet,Text} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';

const EmployeeNavigationDrawerHeader = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  
 let _menu = null;
 let _menu1 = null;

  return (         
    <View style={{flexDirection: 'row'}}>
        <View style={styles.main}>

          <Menu style={styles.viewMenu}
              ref={(ref) => (_menu1 = ref)}
              button={
                props.isIcon ? (
                  <TouchableOpacity onPress={() => _menu1.show()}>
                   
                  </TouchableOpacity>
                ) : (
                  <Text onPress={() => _menu1.show()} style={props.textStyle}>{props.menutext}</Text>
                )
              }>
            <MenuItem onPress={() => props.navigationProps.navigate('employeeStack',{Screen:'Employee'})}>Employees</MenuItem>
            <MenuItem onPress={() => props.navigationProps.navigate('employeeStack',{Screen:'Employee'})}>Roles</MenuItem>            
            <MenuItem onPress={() => props.navigationProps.navigate('employeeStack',{Screen:'Employee'})}>Permission</MenuItem>            
          </Menu>       
        </View>


     <TouchableOpacity onPress={toggleDrawer}>
        <Image source={{uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',}}
          style={{width: 35, height: 35, marginLeft: 5}}/>
      </TouchableOpacity>

      
      {<TouchableOpacity onPress={() => _menu1.show()}>
        <Image source={require('../Images/fill.png')} style={{width: 40, height: 40, marginLeft: 270}}/>
      </TouchableOpacity>}
    </View>
  );  
};

export default EmployeeNavigationDrawerHeader;

const styles = StyleSheet.create({
  main: {
    //flex: 1,
    //justifyContent: 'center',
    backgroundColor: 'red',
    alignContent: 'flex-end',
  }, 
  viewMenu:{
    marginTop: 50,
    marginLeft: 210,
  }

})