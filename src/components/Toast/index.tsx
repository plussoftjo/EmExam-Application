import React,{useState,useEffect,useRef} from 'react';
import { View, TouchableOpacity, StyleSheet,Animated } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components'
import { AntDesign } from '@expo/vector-icons'
import { transform } from '@babel/core';
export interface Props {
    title: string
    status: string
}
const Toast: React.FC<Props> = (props) => {
    let up = useRef(new Animated.Value(53)).current

    useEffect(() => {
        Animated.timing(up,{
            toValue:0,
            duration:1000,
            useNativeDriver:true
        }).start()
    },[])
    let theme = useTheme();
    let styles = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex:106
        },
        box: {
            borderLeftColor: theme[`color-${props.status}-800`],
            borderLeftWidth: 10,
            backgroundColor: theme[`color-${props.status}-500`]
        }
    });
    return (
        <Animated.View style={{...styles.container,transform:[{translateY:up}]}}>
            <View style={styles.box}>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'white',textAlign:'left' }} category="s1">{props.title}</Text>
                </View>
            </View>
        </Animated.View>
    );

}


export default Toast;