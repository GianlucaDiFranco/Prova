import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, StyleSheet, Button } from 'react-native';

export default class Place extends React.Component {
  render() {
    return (
      <View>
        <TouchableHighlight underlayColor="blue" onPress={this.props.onTouch}>
          <View style={styles.row}>
            <Image
              style={styles.image}
              source={{
                uri:
                  this.props.data.img ||
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Pictogram_voting_question.svg/1200px-Pictogram_voting_question.svg.png',
              }}
            />
            <View style={{ flex: 1, flexDirection: 'column', marginLeft: 5 }}>
              <Text style={styles.text}>{this.props.data.name} </Text>
              <Text style={styles.text2}>{this.props.data.address} </Text>
            </View>
            <Button title="delete" onPress={this.props.onDelete} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginLeft: 10,
    // borderWidth: 1,
    // marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 80,
  },
  text: { fontSize: 18, marginLeft: 10 },
  text2: {
    marginLeft: 10,
    fontSize: 15,
    color: 'gray',
  },
});
