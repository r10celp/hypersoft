import React, {Component} from 'react'
import { AppRegistry } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import startPage from './src/screen/startPage';
import Maps from './src/screen/Maps';
import Camera from './src/screen/Camera';
import Ilac_detay from './src/screen/Ilac_detay';
import Profil from './src/screen/Profil';
import Home from './src/screen/Home';

console.disableYellowBox = true

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends Component {
        static navigationOptions = SomeComponent.navigationOptions;
        render() {
            const {navigation: {state: {params}}} = this.props
            return <SomeComponent {...params} {...this.props} />
        }
    }
}


const stack = createStackNavigator({
        startPage: {screen:startPage,
            navigationOptions:({navigation}) => ({          
                header:null,
                gesturesEnabled:true,
            })
        },
        Home: {screen:Home,
            navigationOptions:({navigation}) => ({          
                header:null,
                gesturesEnabled:true,
            }),
        },
        Maps: {screen:Maps,
        navigationOptions:({navigation}) => ({          
            header:null,
            gesturesEnabled:true,
        }),
        },
        Camera: {screen:Camera,
            navigationOptions:({navigation}) => ({          
                header:null,
                gesturesEnabled:true,
            }),
        },
        Ilac_detay: {screen:mapNavigationStateParamsToProps(Ilac_detay),
            navigationOptions:({navigation}) => ({          
                header:null,
                gesturesEnabled:true,
            }),
        },
        Profil: {screen:Profil,
            navigationOptions:({navigation}) => ({          
                header:null,
                gesturesEnabled:true,
            }),
        },
})


AppRegistry.registerComponent('HyperCare', () => stack);
