import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
  Image,
  Button,
  AsyncStorage,
} from 'react-native';
import Voice from 'react-native-voice';
import LottieView from 'lottie-react-native';
import Tts from 'react-native-tts';
var {width,height} = Dimensions.get('window');
import Modal from "react-native-modal";
import axios from 'axios';
import AyarStore from '../mobx/AyarStore';
import {observer} from 'mobx-react';

@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
      microphone: 0,
      isVisible: false,
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }

  onSpeechEnd(e) {
    this.animation.reset();
    this.setState({
      end: '√',
      started: '',
    });
  }

  onSpeechError(e) {
    this.setState({
      error: JSON.stringify(e.error),
    });
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }

  async onSpeechPartialResults(e) {

    await this.setState({
      partialResults: e.value,
    });

    var aranacak = this.state.partialResults.toString().toLowerCase();
    if(aranacak.indexOf('ateşim çıktı') != -1) {
      await this.speechFunction('Elini yüzünü yıkayıp ılık bir duş alabilirsin. En kısa zamanda da bir doktora muayene olmanı öneririm.');
    }else if(aranacak.indexOf('ayak bileği') != -1 || aranacak.indexOf('ayak bileyi') != -1) {
        this.setState({isVisible: true});
      }
  }

  async speechFunction(message){
    await Voice.destroy();
    await Tts.speak(message, { iosVoiceId: 'com.apple.ttsbundle.Yelda-compact' });
    await this._destroyRecognizer();
  }

  onSpeechVolumeChanged(e) {
    this.setState({
      pitch: e.value,
    });
  }

  async _startRecognizing(e) {
    Tts.stop();
    this.animation.play();
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
      microphone: 1,
    });
    try {
      await Voice.start('tr-TR');
    } catch (e) {
      console.error(e);
    }
  }

  async _resetRecognizing(e) {
    this.animation.reset();
    await this.setState({
      microphone: 0,
    });
    await Voice.close();
  }

  async _cancelRecognizing(e) {
    this.animation.reset();
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  }

  async _destroyRecognizer(e) {
    this.animation.reset();
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
      microphone: 0,
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor={'#0193db'} barStyle={'light-content'} />
      <ImageBackground style={{width:width,height:height}} source={require('../img/background.png')}>
      <View style={{flexDirection:'row', marginTop:50, width: width, justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20,}}>
      <Image resizeMode={'contain'} style={{width:width/2.4,height:height/10}} source={require('../img/logo.png')} />
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Profil')}>
        <Image style={{width:60,height:60, marginTop: 20,}} source={require('../img/furkan.png')}/>
      </TouchableOpacity>
      </View>
        
        {this.state.partialResults[0] ?
        <View style={{marginTop:80,padding:20}}>
          <Text style={{fontFamily:'Gilroy-Medium',fontSize:28,color:'white'}}>Merhaba ben Hackim</Text>
          {this.state.partialResults.map((result, index) => {
            return (
              <Text key={`partial-result-${index}`} style={{fontFamily:'Gilroy-Light',fontSize:17,color:'white'}}> {result} </Text>
            )
          })}
        </View>
        :
        <View style={{marginTop:80,padding:20}}>
        <Text style={{fontFamily:'Gilroy-Medium',fontSize:28,color:'white'}}>Merhaba ben Hackim</Text>
        <Text style={{fontFamily:'Gilroy-Light',fontSize:17,color:'white'}}>Nasıl yardımcı olabilirim?</Text>
        </View>
        }


      <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        source={require('../volume.json')}
        style={{width:150,height:175,padding:25,alignSelf:'center',marginBottom:-15}}
        />

      <View style={{flexDirection:'row',justifyContent:'space-between',padding:20,marginTop:120, height: 200}}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps')}>
      <Image style={{width:50,height:50}} source={require('../img/search.png')}/>
      </TouchableOpacity>

      {!this.state.started ?
      <TouchableOpacity onPress={this._startRecognizing.bind(this)} style={{marginTop: -50}}>
      <Image  style={{width:100,height:100}} source={require('../img/mic.png')}/>
      </TouchableOpacity>
      :
      <TouchableOpacity  onPress={this._destroyRecognizer.bind(this)} style={{marginTop: -50}}>
      <Image  style={{width:100,height:100}} source={require('../img/mic.png')}/>
      </TouchableOpacity>
      }

      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Camera')}>
      <Image style={{width:50,height:50}} source={require('../img/camera.png')}/>
      </TouchableOpacity>

      </View>
      </ImageBackground>

        <Modal style={{flex:0.4,width:300,backgroundColor:'transparent',alignSelf:'center',marginTop:width/2,alignItems:'center'}} isVisible={this.state.isVisible}>
              <View>
                  <TouchableOpacity onPress={()=>{
                      this.setState({isVisible:false})
                  }} style={{position:'absolute',zIndex:1,marginLeft:10}}>
                      <Text style={{color:'black',fontSize:20,fontWeight: 'bold'}}>X</Text>
                  </TouchableOpacity>
                  <Image style={{borderRadius:20,width:width/1}} source={require('../img/15395224412746466.gif')}/>

              </View>
          </Modal>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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