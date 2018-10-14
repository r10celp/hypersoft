import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Dimensions,
  Image,
  AsyncStorage,
  Alert
} from 'react-native';
import LottieView from 'lottie-react-native';
var {width,height} = Dimensions.get('window');
import axios from 'axios';
import AyarStore from '../mobx/AyarStore';
import {observer} from 'mobx-react';

@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount(){
    this.veriCek();
  }

  veriCek(){
    var that = this;
    that.setState({ loading: true });
    axios.post('http://192.168.1.107:4234/eNabiz/ProfilBilgileri')
      .then(function (res) {
        if(res.data.response.sonuc){
          AyarStore._user(res.data.response.sonuc);
          that.hekimCek();
          }else{
            Alert.alert('Hata', 'Bir hata oluştu. Sunucuya bağlanılamadı.')
          }
      })
      .catch(function (error) {
        Alert.alert('Hata', 'Bir hata oluştu. Sunucuya bağlanılamadı.')
      });
  }


  hekimCek(){
    var that = this;
    that.setState({ loading: true });
    axios.post('http://192.168.1.107:4234/eNabiz/GetHekim')
      .then(function (res) {
        if(res.data.response.sonuc){
          AyarStore._hekim(res.data.response.sonuc);
          that.receteListele();
          }else{
            Alert.alert('Hata', 'Bir hata oluştu. Sunucuya bağlanılamadı.')
          }
      })
      .catch(function (error) {
        Alert.alert('Hata', 'Bir hata oluştu. Sunucuya bağlanılamadı.')
      });
  }

  receteListele(){
    var that = this;
    that.setState({ loading: true });
    axios.post('http://192.168.1.107:4234/eNabiz/GetReceteBilgileri')
      .then(function (res) {
        if(res.data.response.sonuc){
          AyarStore._recete(that.changeData(res.data.response.sonuc[0]));
          that.props.navigation.navigate('Home');
          }else{
            Alert.alert('Hata', 'Bir hata oluştu. Sunucuya bağlanılamadı.')
          }
      })
      .catch(function (error) {
        Alert.alert('Hata', 'Bir hata oluştu. Sunucuya bağlanılamadı.')
      });
  }

  changeData(data,test){
    var data = data;
    for(var i = 0; i < data.length; i++){
        if(data[i].hasOwnProperty("receteNumarasi")){
            data[i]["label"] = data[i]["receteNumarasi"];
            delete data[i]["receteNumarasi"];
        }
        if(data[i].hasOwnProperty("sysTakipNo")){
          data[i]["value"] = data[i]["sysTakipNo"];
          delete data[i]["sysTakipNo"];
      }
    }
    return data;
}

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor={'#0193db'} barStyle={'light-content'} />
      <ImageBackground style={{width:width,height:height,justifyContent: 'center', alignItems: 'center'}} source={require('../img/background.png')}>
      <Image resizeMode={'contain'} style={{height: 300, width: 300}} source={require('../img/logo.png')} />
      <LottieView
        autoPlay
        source={require('../dots.json')}
        style={{width:150,height:150}}
        />
      </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    fontSize: 18,
  },
});