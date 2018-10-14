import React, { Component } from 'react';
import {
      StyleSheet,
      Text,
      View,
      Dimensions,
      TouchableOpacity,
      Alert,
      TextInput
} from 'react-native';
import MapView from 'react-native-maps';
var {height, width} = Dimensions.get('window');
import Geolocation from 'react-native-geolocation-service';
import { Marker } from 'react-native-maps';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import AyarStore from '../mobx/AyarStore';
import {observer} from 'mobx-react';

@observer
export default class App extends Component {
    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
        region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        },
        hastane: [],
        marker: [],
        error:null,
        durum:null,
        favColor: undefined,
        items: [],
        hastalik: undefined,
        recete: [
            {
                label: 'RN23ASJ',
                value: 'RN23ASJ',
            },{
                label: 'ASDK2E',
                value: 'ASDK2E',
            }
        ],
        hastaliklar: [
                {
                    label: 'Astım',
                    value: 'Astım',
                },
                {
                    label: 'Abse',
                    value: 'Abse',
                },
                {
                    label: 'Apandist',
                    value: 'Apandist',
                },
                {
                    label: 'Ateş',
                    value: 'Ateş',
                },
                {
                    label: 'Bademcik İltihabı',
                    value: 'Bademcik İltihabı',
                },
                {
                    label: 'Bulantı&Kusma',
                    value: 'Bulantı&Kusma',
                },
                {
                    label: 'Bel Ağrısı',
                    value: 'Bel Ağrısı',
                },

                {
                    label: 'Boyun Tutulması',
                    value: 'Boyun Tutulması',
                },
                {
                    label: 'Çarpıntı',
                    value: 'Çarpıntı',
                },
                {
                    label: 'Fıtık',
                    value: 'Fıtık',
                }, {
                    label: 'Grip',
                    value: 'Grip',
                },
                {
                    label: 'Hazımsızlık',
                    value: 'Hazımsızlık',
                },
                {
                    label: 'İshal',
                    value: 'İshal',
                },
                {
                    label: 'Kabızlık',
                    value: 'Kabızlık',
                },
                {
                    label: 'Kusma',
                    value: 'Kusma',
                }, {
                    label: 'Migren',
                    value: 'Migren',
                },
                {
                    label: 'Nefes Darlığı',
                    value: 'Nefes Darlığı',
                },
                {
                    label: 'Nezle',
                    value: 'Nezle',
                },
                {
                    label: 'Öksürük',
                    value: 'Öksürük',
                }, {
                    label: 'Sara',
                    value: 'Sara',
                },
                {
                    label: 'Soğuk Algınlığı',
                    value: 'Soğuk Algınlığı',
                },
                {
                    label: 'Şeker Hastalığı',
                    value: 'Şeker Hastalığı',
                },
                {
                    label: 'Ülser',
                    value: 'Ülser',
                },
                {
                    label: 'Yanık',
                    value: 'Yanık',
                },
                {
                    label: 'Yüksek Kolestrol & Yüksek Tansiyon',
                    value: 'Yüksek Kolestrol & Yüksek Tansiyon',
                },
        ]
        }
    }

        hastaneCek(){
            var that = this;
            that.setState({ loading: true });
            axios.post('http://192.168.1.107:4234/eNabiz/EnYakinHastaneler', {
                enlem: this.state.region.latitude,
                boylam: this.state.region.longitude,
              })
              .then(function (res) {
                var veri = JSON.parse(res.data.response.sonuc);
                console.log(veri);
                if(veri.rows[0]){
                    that.setState({
                        hastane: veri.rows,
                    });
                }else{
                    Alert.alert('Hata', 'Bir hata oluştu. Sunucuya bağlanılamadı.')
                }
              })
              .catch(function (error) {
                Alert.alert('Hata', 'Bir hata oluştu. Sunucuya bağlanılamadı.')
              });
          }


          veriCek(){
            var that = this;
            that.setState({ loading: true });
            axios.post('http://192.168.1.107:4234/hastane/map_detail', {
                enlem: this.state.region.latitude,
                boylam: this.state.region.longitude,
              })
              .then(function (res) {
                if(res.data.response){
                    that.setState({
                        marker: res.data.response,
                    });
                }else{
                    Alert.alert('Hata', 'Bir hata oluştu. Sunucuya bağlanılamadı.')
                }
              })
              .catch(function (error) {
                Alert.alert('Hata', 'Bir hata oluştu. Sunucuya bağlanılamadı.')
              });
          }

        componentDidMount() {
            console.log(AyarStore.recete);
            Geolocation.getCurrentPosition(
                (position) => {
                    this.setState({ region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }})
                    this.hastaneCek();
                    this.veriCek();
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );

    }

    image(marker){
        if(marker.location_type == 1){
            return require('../img/doktor.png');
        }else if(marker.location_type == 2){
            return require('../img/hemsire.png');
        }else if(marker.location_type == 3){
            return require('../img/eczane.png');
        }
    }

    markerData(){
        return this.state.marker.map((marker, Id) => (
            <Marker
            key={Id}
            onPress={() => this.setState({durum: null})}
            image={this.image(marker)}
            coordinate={{
                latitude: marker.location_lat,
                longitude: marker.location_lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            title={marker.location_isim}
            description={marker.location_aciklama}
            />
          ))
    }    

    render() {
    return (
      <View style={styles.container}>
          <MapView style={styles.map}
              region={this.state.region}>
            {this.state.hastane.map((marker, Id) => (
                <Marker
                key={Id}
                onPress={() => this.setState({durum: null})}
                image={require('../img/hastane.png')}
                coordinate={{
                    latitude: marker.enlem,
                    longitude: marker.boylam,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                title={marker.ad}
                description={marker.tur}
                />
              ))}
              {this.markerData()} 

          </MapView>
          <View style={!this.state.durum ? styles.bottom2 : styles.bottom}>
              <View style={styles.bottomhead}>
                  <TouchableOpacity onPress={()=>{this.setState({durum:1})}} style={this.state.durum == 1 ? styles.headbuttonAktif : styles.headbuttonPasif}>
                      <Text style={this.state.durum == 1 ? styles.buttontext : styles.buttonPasifText}>Doktor</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{this.setState({durum:2})}} style={this.state.durum == 2 ? styles.eczaneButton : styles.headbuttonPasif}>
                      <Text style={this.state.durum == 2 ? styles.buttontext : styles.buttonPasifText}>Hemşire</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{this.setState({durum:3})}} style={this.state.durum == 3 ? styles.ilacButton : styles.headbuttonPasif}>
                      <Text style={this.state.durum == 3 ? styles.buttontext : styles.buttonPasifText}>İlaç</Text>
                  </TouchableOpacity>
              </View>


            {this.state.durum &&
              <View style={styles.headfooter}>
                  <View style={styles.footerbody}>
                      {this.state.durum == 3 ? (
                          <View style={{flexDirection:'column'}}>
                              <Text style={styles.hastalik}>Reçete Numarası</Text>
                              <RNPickerSelect
                                  placeholder={{
                                      label: 'Reçetenizi Seçiniz....',
                                      value: null,
                                  }}
                                  items={this.state.recete}
                                  onValueChange={(value) => {
                                      this.setState({
                                          favColor: value,
                                      });
                                  }}
                                  style={{ ...pickerSelectStyles }}
                              />

                              <TouchableOpacity onPress={() => Alert.alert('Başarılı','Reçeten en yakın eczaneye iletildi. En kısa süre içerisinde adresine ulaşacaktır.')} style={[styles.button, {backgroundColor: 'green'}]}>
                                  <Text style={styles.buttonText}>İlacımı Getir</Text>
                              </TouchableOpacity>

                          </View>

                      ):(
                          <View>
                              <View style={styles.footerRow}>
                                  <View style={{flexDirection:'column'}}>
                                      <Text style={styles.baslik}>Yaş</Text>
                                      <Text style={styles.input}>21</Text>
                                  </View>

                                  <View style={{flexDirection:'column'}}>
                                      <Text style={styles.baslik}>Boy</Text>
                                      <Text style={styles.input}>{AyarStore.user.boy}</Text>
                                  </View>
                              </View>
                              <View style={styles.footerRow}>
                                  <View style={{flexDirection:'column'}}>
                                      <Text style={styles.baslik}>Cinsiyet</Text>
                                      <Text style={styles.input}>{AyarStore.user.cinsiyet == 1 ? 'Erkek' : 'Kadın'}</Text>
                                  </View>

                                  <View style={{flexDirection:'column',marginBottom: 20}}>
                                      <Text style={styles.baslik}>Hastalık</Text>
                                      <RNPickerSelect
                                            placeholder={{
                                                label: 'Hastalığınızı Seçiniz....',
                                                value: null,
                                            }}
                                            items={this.state.hastaliklar}
                                            onValueChange={(value) => {
                                                this.setState({
                                                    hastalik: value,
                                                });
                                            }}
                                            onUpArrow={() => {
                                                this.inputRefs.name.focus();
                                            }}
                                            onDownArrow={() => {
                                                this.inputRefs.picker2.togglePicker();
                                            }}
                                            style={{ ...pickerSelectStyles }}
                                            value={this.state.favColor}
                                            ref={(el) => {
                                                this.inputRefs.picker = el;
                                            }}
                                        />
                                  </View>
                              </View>
                              <View style={{marginTop:-20}}>
                              </View>
                              {this.state.durum == 1 &&
                              <TouchableOpacity onPress={() => Alert.alert('Başarılı','Çağrın en yakın doktora iletildi.')} style={styles.button}>
                                  <Text style={styles.buttonText}>ŞİMDİ SANA EN YAKIN DOKTURU ÇAĞIR</Text>
                              </TouchableOpacity>
                              }

                              {this.state.durum == 2 &&
                              <TouchableOpacity onPress={() => Alert.alert('Başarılı','Çağrın en yakın hemşireye iletildi.')} style={[styles.button, {backgroundColor: 'red'}]}>
                                  <Text style={styles.buttonText}>ŞİMDİ SANA EN YAKIN HEMŞİREYİ ÇAĞIR</Text>
                              </TouchableOpacity>
                              }

                          </View>
                      )
                      }
                  </View>
                
              </View>
            }
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    hastalik:{
        color:'gray',
        textAlign:'center',
        fontSize:17,
        marginBottom:20
    },
    ilacButton:{
        backgroundColor: 'green',
        borderRadius:30,
        padding:15,
        width:100,
        alignItems:'center'
    },
    eczaneButton:{
        backgroundColor: 'red',
        borderRadius:30,
        padding:15,
        width:100,
        alignItems:'center'
    },
    headPasifText:{
        color:'black'
    },
    detayBaslik:{
        color:'gray',
        fontSize:13,
        alignSelf: 'center'
    },
    detaytext:{
        color:'black',
        fontSize:14,
        alignSelf: 'center',
        textAlign:'center',
    },
    button:{
        marginTop:20,
        backgroundColor:'#43569c',
        height:35,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        color:'white',
        fontSize:12
    },
    input:{
        textAlign:'center',
        fontSize:16
    },
    baslik:{
        color:'gray',
        textAlign:'center',
        fontSize:17,
    },
    footerRow:{
        flexDirection:'row',
        justifyContent: 'space-around',
        marginTop:15
    },
    footerbody:{
    flexDirection:'column',
        padding:5,
    },
    headfooter:{
    backgroundColor:'white',
        width:330,
        height:210,
         marginTop:40
    },
    buttontext:{
        color:'white'
    },
    buttonPasifText:{
        color:'black'
    },
    headbuttonPasif:{
        borderRadius:30,
        padding:15,
        width:100,
        alignItems:'center'
    },
    headbuttonAktif:{
       backgroundColor: '#43569c',
       borderRadius:30,
        padding:15,
        width:100,
        alignItems:'center'
    },
    bottomhead:{
      flexDirection:'row',
        backgroundColor:'white',
        borderRadius:30,
        position: 'absolute',
        marginLeft: 35,
        marginBottom: 15,
        marginTop: -25

    },
    bottom:{
        alignItems:'center',
        backgroundColor: '#ebebeb',
        width:width,
        height:280,
        position:'absolute',
        bottom:0,
        borderTopRightRadius:30,
        borderTopLeftRadius:30
    },
    bottom2:{
        alignItems:'center',
        width:width,
        height:20,
        position:'absolute',
        bottom:20,
        borderTopRightRadius:30,
        borderTopLeftRadius:30
    },
    map:{
       width:width,
       height:height
      }  ,
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
    inputAndroid:{
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    }
});