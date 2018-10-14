import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from "react-native";
var {height, width} = Dimensions.get('window');
import axios from 'axios';

class İlac extends Component {

    constructor(props) {
        super(props);
        this.state = {
          data: [],
        };
      }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=> {

                }}>
                    <Image source={require('../img/close.png')} style={styles.closepng} />
                </TouchableOpacity>
                <Text style={styles.headerText}>TYLOLHOT C</Text>
                <View style={styles.ilacView}>
                    <Image resizeMode={'stretch'} source={require('../img/tylol.jpg')} style={styles.ilacpng} />
                </View>

                <ScrollView>
                    <View style={styles.urunDetay}>
                        <View style={styles.urunText}>
                            <Text style={styles.urunbaslikText}>Kimler kullanabilir?</Text>
                            <Text style={styles.urundetayText}>-12 yaşın üzerindeki çocuklar ve yetişkinler kullanabilir.</Text>
                        </View>

                        <View style={styles.urunText}>
                            <Text style={styles.urunbaslikText}>Kimler kullanamaz??</Text>
                            <Text style={styles.urundetayText}>-12 yaşın altında ki çocuklar, şiddetli kalp-damar ve böbrek hastalığınız varsa, Şiddetli yüksek tansiyon.</Text>
                        </View>
                    </View>
                </ScrollView>

                <Text style={styles.uyariText}>Bütün ilaçları kullanmadan önce mutlaka doktorunuza veya eczacınıza danışınız??</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    uyariText:{
        fontSize:16,
        textAlign:'center',
        fontWeight:'400',
        marginTop:50
    },
    urundetayText:{
        textAlign: 'center',
        fontSize:14
    },
    urunbaslikText:{
        fontSize:27,
        textAlign: 'left',
        marginLeft:10
    },
    urunText:{
    marginBottom: 30
    },
    urunDetay:{
    flexDirection: 'column'
    },
    ilacView:{
        paddingTop:35,
        paddingBottom: 35,
    },
    ilacpng:{
        width:width,
        height:210,
    },
    container: {
        flex: 1,

    },
    closepng:{
        width:25,
        height:25,
        marginTop: 30,
        marginLeft: 20
    },
    headerText:{
        fontFamily:'Arial',
        marginTop:20,
        marginLeft:25,
        fontSize:25,
        fontWeight: '400'
    }
});

export default İlac;
