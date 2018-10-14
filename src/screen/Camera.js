'use strict';
import React, { Component } from 'react';
import {
AppRegistry,
Dimensions,
StyleSheet,
Text,
TouchableHighlight,
View
} from 'react-native';
import Camera from 'react-native-camera';

export default class test extends Component {
render() {
return (
<View style={styles.container}>
<Camera
ref={(cam) => {
this.camera = cam;
}}
onBarCodeRead={this.onBarCodeRead.bind(this)}
style={styles.preview}
aspect={Camera.constants.Aspect.fill}>
</Camera>
</View>
);
}

onBarCodeRead(e) {
if(e.data){
    this.props.navigation.navigate('Ilac_detay',{barkod: e.data})
}
}

takePicture() {
const options = {};
//options.location = ...
this.camera.capture({metadata: options})
.then((data) => console.log(data))
.catch(err => console.error(err));
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
flexDirection: 'row',
},
preview: {
flex: 1,
justifyContent: 'flex-end',
alignItems: 'center'
},
capture: {
flex: 0,
backgroundColor: '#fff',
borderRadius: 5,
color: '#000',
padding: 10,
margin: 40
}
});