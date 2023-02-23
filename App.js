import 'react-native-gesture-handler';
import _ from 'underscore';
import * as React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import {Text, View, Image, Pressable }   from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';


const chevronStyle = {width: 30, height: 30, resizeMode: 'contain', marginRight: 10};
const titleStyle = {fontSize: 24, fontWeight: 'bold', flex: 1};

const config = {
  initialRouteName: 'LeftHandNav',
  screens: {
    Chat: { 
      path: 'r/:id?', 
      parse: { id: (id) => parseInt(id) } 
    },
    LeftHandNav: '',
    RightHandStack: {
      screens: {
        SettingsStack: {
          path: 'settings',
          screens: {
            Settings: '',
            About: 'about',
          },
        },
        Search: 'search'
      }
    }
  },
};

const linking = {
  prefixes: ['http://localhost', 'https://navigation-test-lime.vercel.app', Linking.createURL('/')],
  config,
};

function LeftHandNav({navigation}) {
  return (
    <View style={{flex: 1}}>
      <LHNHeader navigation={navigation} />
    </View>
  );
}


function AboutScreen({navigation}) {
  return (
    <View style={{margin: 10}}>
      <View style={{marginBottom: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Pressable onPress={() => { navigation.pop()}}>
          <Image style={chevronStyle} source={{uri: 'https://raw.githubusercontent.com/marcaaron/navigation-test/main/chevron.png'}} />
        </Pressable>
        <Text style={titleStyle}>About</Text>
      </View>
      <Text style={{fontSize: 20, marginBottom: 20}}>Welcome to my test app</Text>
    </View>
  );
}

function LHNHeader({navigation}) {
  return (
    <View style={{marginBottom: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginLeft: 10}}>Chats</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 10, marginTop: 10}}>
        <Pressable style={{marginRight: 20}} onPress={() => navigation.push('RightHandStack', { screen: 'Search' })}>
          <Image style={{width: 30, height: 30}} source={{uri: 'https://raw.githubusercontent.com/marcaaron/navigation-test/main/search.png'}} />
        </Pressable>
        <Pressable onPress={() => navigation.push('RightHandStack', { screen :'SettingsStack' })}>
          <View style={{borderRadius: 22.5, overflow: 'hidden'}}>
            <Image style={{width: 45, height: 45}} source={{uri: 'https://raw.githubusercontent.com/marcaaron/navigation-test/main/avatar_3.png'}} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function SettingsScreen({navigation}) {
  return (
    <View style={{margin: 10}}>
      <View style={{marginBottom: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image style={chevronStyle} source={{uri: 'https://raw.githubusercontent.com/marcaaron/navigation-test/main/chevron.png'}} />
        </Pressable>
        <Text style={titleStyle}>Settings</Text>
      </View>
      <Pressable style={{flexDirection: 'row', marginTop: 10}} onPress={() => navigation.push('About')}>
        <Text style={{fontSize: 24, flex: 1, paddingLeft: 20}}>About</Text>
        <Image style={chevronStyle} source={{uri: 'https://raw.githubusercontent.com/marcaaron/navigation-test/main/chevron-right.png'}} />
      </Pressable>
    </View>
  );
}


const SettingsStackNavigator = ({ navigation }) => {
  return (
  <SettingsStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <SettingsStack.Screen 
      name="Settings" 
      component={SettingsScreen} 
      options={{
        animationTypeForReplace: 'pop',
    }} />
    <SettingsStack.Screen name="About" component={AboutScreen} />
  </SettingsStack.Navigator>
)};

const RightHandStackNavigator = ({ navigation }) => {
  return (
    <RightHandStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RightHandStack.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
      />
    </RightHandStack.Navigator>
)};

const MainStack = createStackNavigator();

const RightHandStack = createStackNavigator();
const SettingsStack = createStackNavigator();


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          paddingTop: Constants.statusBarHeight,
          backgroundColor: '#ecf0f1',
        }}>
          <NavigationContainer
            linking={linking}
            onStateChange={() => this.setState({test: 1})}
          >
              <MainStack.Navigator
                initialRouteName="LeftHandNav"
                screenOptions={{headerShown: false }}
              >
                  <MainStack.Screen
                    name="LeftHandNav"
                    component={LeftHandNav}
                  />
                  <MainStack.Screen
                    name="RightHandStack"
                    component={RightHandStackNavigator}
                  />
              </MainStack.Navigator>
          </NavigationContainer>
        </View>
    );
  }
}
