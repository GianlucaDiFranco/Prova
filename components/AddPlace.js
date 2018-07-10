import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';

export default class Detail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Aggiungi un elemento',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgb(4,159,239)',
      },
      headerTitleStyle: {
        fontSize: 20,
      },
    };
  };

  state = {
    name: '',
    img: '',
    address: '',
    tel: '',
    site: '',
    info: '',
    tags: '',
    latitude: '',
    longitude: '',
    //remind: false,
  };

  checkPhotoGalleryPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Hey! You need to authorize my app ');
    }
  };

  checkCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Hey! You need to authorize my app ');
    }
  };

  _pickImageFromCamera = async () => {
    await this.checkCameraPermissions();
    await this.checkPhotoGalleryPermissions();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({
        img: result.uri,
      });
    }
  };

  _pickImage = async () => {
    await this.checkPhotoGalleryPermissions();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({
        img: result.uri,
      });
    }
  };

  _onAdd = () => {
    const onAdd = this.props.navigation.state.params.onAdd;
    const place = {
      name: this.state.name,
      img: this.state.img,
      address: this.state.address,
      tel: this.state.tel,
      site: this.state.site,
      info: this.state.info,
      tags: this.state.tags,
    };
    onAdd(place, this.state.remind);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <FormLabel labelStyle={{ fontSize: 24 }}>Nome dell'immagine</FormLabel>

            <FormInput
              value={this.state.name}
              inputStyle={{ fontSize: 22, textAlign: 'center' }}
              onChangeText={value => this.setState({ name: value })}
              placeholder="Metti il nome dell'immagine"
              onSubmitEditing={null}
            />
            <FormLabel labelStyle={{ fontSize: 24 }}>Indirizzo</FormLabel>
            <FormInput
              value={this.state.address}
              inputStyle={{ fontSize: 22, textAlign: 'center' }}
              onChangeText={value => this.setState({ address: value })}
              placeholder="Metti l'indirizzo"
              onSubmitEditing={null}
            />
            <FormLabel labelStyle={{ fontSize: 24 }}>Tag</FormLabel>
            <FormInput
              value={this.state.tags}
              inputStyle={{ fontSize: 22, textAlign: 'center' }}
              onChangeText={value => this.setState({ tags: value })}
              placeholder="Metti i vari tag"
              onSubmitEditing={null}
            />
            <FormLabel labelStyle={{ fontSize: 24 }}>Telefono</FormLabel>
            <FormInput
              value={this.state.tel}
              inputStyle={{ fontSize: 22, textAlign: 'center' }}
              onChangeText={value => this.setState({ tel: value })}
              placeholder="Metti il numero di telefono"
              onSubmitEditing={null}
            />
            <FormLabel labelStyle={{ fontSize: 24 }}>Sito</FormLabel>
            <FormInput
              value={this.state.site}
              inputStyle={{ fontSize: 22, textAlign: 'center' }}
              onChangeText={value => this.setState({ site: value })}
              placeholder="Metti il sito internet"
              onSubmitEditing={null}
            />
            <FormLabel labelStyle={{ fontSize: 24 }}>Descrizione</FormLabel>
            <FormInput
              value={this.state.info}
              inputStyle={{ fontSize: 22, textAlign: 'center' }}
              onChangeText={value => this.setState({ info: value })}
              placeholder="Metti delle info"
              onSubmitEditing={null}
            />
          </View>
          <View style={styles.box}>
            {this.state.img ? (
              <Image source={{ uri: this.state.img }} style={styles.image} />
            ) : null}
          </View>
          <View style={{ alignItems: 'center' }}>
            <Button title="Carica immagine dalla PhotoGallery" onPress={this._pickImage} />
            <Button title="Carica immagine dalla camera" onPress={this._pickImageFromCamera} />
            <Button title="Salva" onPress={this._onAdd} />

            {/*    <Switch
              onValueChange={() => {
                this.setState({ remind: !this.state.remind });
              }}
              value={this.state.remind}
              style={{
                transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
                marginTop: 14,
                paddingBottom: 10,
              }}
              onTintColor={'rgb(4,159,239)'}
              tintColor={'lightgray'}
            /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    //justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  image: {
    width: 350,
    height: 350,
  },
  box: {
    paddingTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
