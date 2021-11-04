import React from 'react';
import {View,StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components'


let constants = {
    border_radius:40,
    color:'white',
    border_width:1,
    border_color:'#7e7e7e'
}

export default (props) => {
     return (
        <View style={styles.container}>
            <View style={styles.lineContainer}>
                <View style={styles.line}></View>
            </View>
            <View style={styles.content}>
                {props.children}
            </View>
        </View>
     )
}

let styles = StyleSheet.create({
    container:{
        padding:15,
        borderTopLeftRadius:constants.border_radius,
        borderTopRightRadius:constants.border_radius,
        backgroundColor:constants.color,
        borderColor:constants.border_color,
        borderWidth:constants.border_width,
        
    },
    lineContainer:{
        paddingTop:5,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    line:{
        width:'30%',
        backgroundColor:constants.border_color,
        height:2
    },
    content:{
        paddingTop:15
    }
});