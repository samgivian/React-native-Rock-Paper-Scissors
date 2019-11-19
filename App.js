import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  state = {
    player_choice: '',
    phone_choice: '',
    wins: 0,
    ties: 0,
    phone_wins: 0,
    winner: '',
  };
  //rock is 1
  //paper is 2
  //scissor is 3
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('wins', this.state.wins);
      await AsyncStorage.setItem('loses',this.state.ties);
      await AsyncStorage.setItem('ties', this.state.phone_wins);
     // alert('stored');
    } catch (error) {
      // Error saving data
    }
  };
  _retrieveData = async () => {
    //alert('get')
    try {
      const value = await AsyncStorage.getItem('wins');
      if (value !== null) {
        // We have data!!
     this.setState({wins:parseInt(value)})
      }
    } catch (error) {
      // Error retrieving data
    }
     try {
      const value = await AsyncStorage.getItem('loses');
      if (value !== null) {
        // We have data!!
      this.setState({phone_wins:parseInt(value)})
      }
    } catch (error) {
      // Error retrieving data
    }
     try {
      const value = await AsyncStorage.getItem('ties');
      if (value !== null) {
        // We have data!!
         this.setState({ties:parseInt(value)})
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidMount = () => {
    this._retrieveData();
  };
  getPlayerChoice = number => {
    this.setState({ player_choice: number });
    var r = Math.floor(Math.random() * 3 + 1);
    this.setState({ phone_choice: r });
    if (r === number) {
      this.setState({ winner: 'no one', ties: this.state.ties + 1 });
    }
    if (number === 1 && r == 2) {
      this.setState({
        winner: 'computer',
        phone_wins: this.state.phone_wins + 1,
      });
    }

    if (number === 1 && r === 3) {
      this.setState({ winner: 'player', wins: this.state.wins + 1 });
    }

    if (number === 2 && r === 3) {
      this.setState({ winner: 'phone', phone_wins: this.state.phone_wins + 1 });
    }
    if (number === 2 && r === 1) {
      this.setState({ winner: 'player', wins: this.state.wins + 1 });
    }
    if (number === 3 && r === 2) {
      this.setState({ winner: 'player', wins: this.state.wins + 1 });
    }
    if (number === 3 && r === 1) {
      this.setState({ winner: 'computer', wins: this.state.phone_wins + 1 });
    }
    this._storeData();
  };
  clearscore=()=>{
    this.setState({wins:0,phone_wins:0,ties:0});
    this._retrieveData();
  }
  render() {
    return (
      <View>
        <Button
          style={{ width: '100%', height: 80 }}
          onPress={() => alert('select an item to compete with the phone')}
          title="Instructions"
        />
     
         {/*
        <Button
          style={{ width: '100%', height: 80 }}
          onPress={()=>this._storeData()}
          title="store"
        />
        <Button
          style={{ width: '100%', height: 80 }}
          onPress={()=>this._retrieveData()}
          title="get"
        />*/}
        <Text>Players choice: {this.state.player_choice} </Text>
        <Text>phone_choice: {this.state.phone_choice}</Text>
        <Text>wins: {this.state.wins}</Text>
        <Text> ties: {this.state.ties}</Text>
        <Text>computer wins: {this.state.phone_wins}</Text>
        <Text> winner: {this.state.winner}</Text>

        <View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
          <TouchableOpacity onPress={() => this.getPlayerChoice(1)}>
            {' '}
            <Image
              style={{ width: 75, height: 75 }}
              source={require('./assets/minerals_coal-512.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.getPlayerChoice(2)}>
            {' '}
            <Image
              style={{ width: 75, height: 75 }}
              source={require('./assets/paperwork-512.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.getPlayerChoice(3)}>
            {' '}
            <Image
              style={{ width: 75, height: 75 }}
              source={require('./assets/cut_v2-512.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Text>Phone's choice</Text>
          {this.state.phone_choice === 1 ? (
            <Image
              style={{ width: 75, height: 75 }}
              source={require('./assets/minerals_coal-512.png')}
            />
          ) : this.state.phone_choice === 2 ? (
            <Image
              style={{ width: 75, height: 75 }}
              source={require('./assets/paperwork-512.png')}
            />
          ) : this.state.phone_choice === 3 ? (
            <Image
              style={{ width: 75, height: 75 }}
              source={require('./assets/cut_v2-512.png')}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
