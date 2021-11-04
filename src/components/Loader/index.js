import React from 'react';
import {View,} from 'react-native';
import {Spinner} from '@ui-kitten/components'

export default () => {
     return (
        <View style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',zIndex:109}}>
            <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.005)'}}>
                <Spinner />
            </View>
        </View>
     )
}