import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    Image
} from "react-native";
var {height, width} = Dimensions.get('window');

class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'}/>
                <View style={styles.header}>
                </View>


                <View style={styles.comp}>
                    <Image style={styles.imgPP} source={require('../img/furkan.png')} />
                    <View style={styles.kisi}>
                        <Text style={styles.nameText}>Furkan Gökçen</Text>
                        <Text style={styles.mekan}>Ortaköy/İstanbul</Text>
                    </View>


                    <View style={styles.bilgiler}>
                        <View>
                            <Text style={styles.mekan}>YAŞ</Text>
                            <Text style={styles.nameText}>21</Text>
                        </View>
                        <View>
                            <Text style={styles.mekan}>BOY</Text>
                            <Text style={styles.nameText}>178cm</Text>
                        </View>
                        <View>
                            <Text style={styles.mekan}>KiLO</Text>
                            <Text style={styles.nameText}>92</Text>
                        </View>
                        <View>
                            <Text style={styles.mekan}>KAN</Text>
                            <Text style={styles.nameText}>ABrh+</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',alignSelf:'center',marginTop:20}}>
                        <Image style={{height:25,width:25}} source={require('../img/doktor2.png')}/>
                        <Text style={styles.doctorText}>Dr. Hakan Başsezgin</Text>
                    </View>


                </View>
                <View style={styles.footer}>
                </View>
            </View>
        );
    }
}
export default Profile;

const styles = StyleSheet.create({
    doctorText:{
        fontSize:14,
        textAlign: 'center',
        fontWeight: '600'

    },
    kisi:{
        flexDirection: 'column',
        position: 'absolute',
        alignSelf:'center',
        marginTop:70
    },
    bilgiler:{
        width: width/1.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:width/2.9,
        padding:12
    },
    mekan:{
        textAlign:'center',
        fontSize:13,
        color:'gray'
    },
    nameText:{
        fontSize:20,
        fontWeight: '600'
    },
    imgPP:{
        width:115,
        height:120,
        backgroundColor:'white',
        borderRadius: 55,
        alignSelf: 'center',
        position:'absolute',
        marginTop:-50
    },
    comp:{
        backgroundColor:'white',
        width:width/1.2,
        borderRadius:10,
        height:250,
        alignSelf: 'center',
        zIndex:1,
        marginTop:-50,
        shadowColor: "rgba(32, 32, 32, 0.51)",
        shadowOffset: {
            width: 0,
            height: 13
        },
        shadowRadius: 46.4,
        shadowOpacity: 1,
        elevation: 2
    },
    footer:{
        flex:1,
        width:100,
        height:100
    },
    header:{
        flex:0.5,
        backgroundColor:'#254FD2',
        width:width,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});