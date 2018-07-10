import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  ScrollView,
  Button,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import Place from './Place';
const URL = 'http://www.dipmat.unict.it/~calanducci/LAP2/favorities.json';
let list = [
  {
    id: '000001',
    name: 'Sazi e Sani',
    address: 'Via Sisto 46/48, Catania',
    info: 'Italiana, Pizza, Mediterranea, aperto anche a pranzo, ottime pizze leggere',
    tel: '+39 095 715 9794',
    img:
      'https://media-cdn.tripadvisor.com/media/photo-o/0d/06/2e/52/bey8qhvi1s7ekn7qgibpxyuigzdv9m.jpg',
    url: 'http://www.saziesani.it/',
    tags: ['ristorante', 'pizzeria'],
  },
];
console.ignoredYellowBox = ['Setting a timer'];
export default class Placelist extends React.Component {
  state = {
    placelist: [],
    inizialList: [],
  };

  _renderItem = ({ item }) => (
    <Place
      data={item}
      onEdit={() => this._edit(item)}
      onTouch={() => this._touch(item)}
      onDelete={() => this._delete(item)}
    />
  );

  _keyExtractor = (item, index) => {
    // aggiungere un id ad ogni elemento pari alla sua posizione
    //item.id = index;
    return String(index);
  };

  async _setdata() {
    const result = await fetch(URL);
    const res = await result.json();
    return JSON.stringify(res.data);
  }

  _retrieveData = async () => {
    const download = await AsyncStorage.getItem('Placelist');

    return download;
  };

  componentDidMount() {
    // leggere il nostro array proveniente da firebase

    this.props.navigation.setParams({ add: this._add });
    const places = firebase.database().ref('/places');
    places.on('value', snap => {
      console.log(snap);
      var elenco = [];
      snap.forEach(child => {
        elenco.push({
          id2: child.key,
          ...child.val(),
        });
      });
      this.setState({ placelist: elenco });
    });
  }

  //   AsyncStorage.getItem('Placelist').then(response =>
  //   this.setState({ placelist:  list }));
  //}

  _update = placeList => {
    this.setState({ placelist: placeList });
    AsyncStorage.setItem('Placelist', JSON.stringify(placeList));
    //
  };

  _delete = item => {
    console.log(item.id2);
    firebase
      .database()
      .ref('/places/' + item.id2)
      .remove();
  };

  _edit = item =>
    this.props.navigation.navigate('AddPlace', {
      currentPlace: item,
      onSaveEdit: this._saveEdit,
    });

  _touch = item =>
    this.props.navigation.navigate('Details', {
      currentPlace: item,
    });

  _saveEdit = updatedPlace => {
    //console.log(updatedTodo);
    //alert("salvataggio di ", item.text);
    // aggiornare la todolist
    // costruiamo una nuova todolist a partire dalla vecchia, sostituendo  l'item appena modificato
    const newPlaceList = this.state.placelist.map(
      place => (place.id2 === updatedPlace.id2 ? updatedPlace : place),
    );
    // aggiornare lo stato con la nuova todolist
    //this.setState({ todolist: newTodolist });
    const placeId = updatedPlace.id2;
    delete updatedPlace.id;

    // .set(updatedTodo);
    firebase
      .database()
      .ref('/places/' + placeId)
      .set(updatedPlace);
  };

  _add = place => {
    //this.setState({ todolist: [...this.state.todolist, todo] }, this._update );
    let newPlaceList = [...this.state.placelist, place];
    firebase
      .database()
      .ref('/places')
      .push(place);
    // salvataggio della todolist sul AsyncStorage
  };

  render() {
    return (
      <FlatList
        data={this.state.placelist}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

Placelist.navigationOptions = ({ navigation }) => {
  return {
    title: 'FireBase Placelist',
    headerStyle: {
      backgroundColor: 'blue',
    },
    headerTintColor: 'white',
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddPlace', {
            onAdd: navigation.state.params.add,
          })
        }
      >
        <Ionicons
          style={{ paddingHorizontal: 15 }}
          name="ios-add-outline"
          size={34}
          color="white"
        />
      </TouchableOpacity>
    ),
  };
};
