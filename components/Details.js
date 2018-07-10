import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Switch,
  TextInput,
  Platform,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Geocoder from 'react-native-geocoder';
import { MapView, Location, Permissions } from 'expo';
const TINT_COLOR = 'rgb(4, 159, 239)';

export default class Details extends React.Component {
  state = {
    id: '',
    name: '',
    address: '',
    info: '',
    tel: '',
    img: '',
    url: '',
    tags: [],
    latitude: '',
    longitude: '',
  };

  _getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('Questa app necessita della tua autorizzazione');
    }
    let location = await Location.geocodeAsync(this.state.address);
    this.setState({ latitude: location[0].latitude, longitude: location[0].longitude });
  };

  componentWillMount() {
    this.props.navigation.setParams({ onSave: this._save });
    let item = this.props.navigation.state.params.currentPlace;
    if (item) {
      this.setState({ ...item });
    }
    this._getLocation();
  }

  _save = () => {
    // verificare se dobbiamo aggiungere una nuova todo o aggiornare una esistente

    const onSaveEdit = this.props.navigation.state.params.onSaveEdit;
    if (onSaveEdit) {
      let item = this.props.navigation.state.params.currentPlace;
      //const updatedTodo = item;
      // updatedTodo.text = this.state.text;
      const updatedPlace = { ...item, ...this.state };
      onSaveEdit(updatedPlace);
      this.props.navigation.goBack();
      return;
    }

    const onAdd = this.props.navigation.state.params.onAdd;
    if (onAdd) {
      /*const newTodo = {
        text: this.state.text,
        dueDate: this.state.dueDate,
        done: false,
        shouldRemind: this.state.shouldRemind,
      }; */
      const newPlace = {
        ...this.state,
        done: false,
      };

      onAdd(newPlace);
      this.props.navigation.goBack();
    }

    //todolist.push(newTodo);
  };

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <View style={[styles.todowrapper, { padding: 1 }]}>
          <Text> Nome: {this.state.name}</Text>
          <Text> Indirizzo: {this.state.address} </Text>
          <Text> Info: {this.state.info}</Text>
          <Text> Telefono: {this.state.tel}</Text>
          <Text> Sito Internet:{this.state.url} </Text>
          {/* <Text> Tags:{this.state.tags.tostring()} </Text> */}

          <View style={styles.map}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {this.state.latitude != '' ? (
                <MapView.Marker
                  coordinate={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                  }}
                  title={this.state.name}
                  description={this.state.address}
                  pinColor="red"
                />
              ) : null}
            </MapView>
          </View>
        </View>
      </ScrollView>
    );
  }
}

Details.navigationOptions = ({ navigation }) => ({
  title: 'Details',
  headerLeft: <Button title="Cancel" onPress={() => navigation.goBack()} />,
});

const styles = StyleSheet.create({
  wrapper: { backgroundColor: '#E9E9EF', flex: 1 },
  todowrapper: {
    marginTop: 30,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  textInputStyleOnAndroid: Platform.OS === 'android' ? { paddingBottom: 7, paddingLeft: 7 } : {},
  remindRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
  },
  headerBtn: {
    color: Platform.OS === 'ios' ? TINT_COLOR : 'blue',
    padding: 10,
    fontSize: 18,
  },

  map: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
