import React from 'react';
import { View,Keyboard,Pressable } from 'react-native';
import { Button,Text,Input } from '@ui-kitten/components';
import { connect } from 'react-redux';

import {apis} from '../../../services'
import {UserActions} from '../../../stores'
import {translate} from '../../../translations'

let EditUser = (props) => {
    let {user} = props.user
    let {onSnap,setUser} = props
    let [data,setData] = React.useState(user)

    let UpdateInfo = () => {
        apis.auth.update(data,(res) => {
            setUser(data)
            Keyboard.dismiss()
            onSnap(2)
        },err => {
            console.log(err)
        })
    }
     return(
         <Pressable onPress={() => {Keyboard.dismiss()}} style={{backgroundColor: "white", padding: 16, height: 550 }}>
            <Text style={{fontFamily:'CairoBold',fontSize:22}}>{translate("settings.user_edit.title")}</Text>
            <Input label={translate("settings.user_edit.name")} value={data.name} onChangeText={(val) => {setData({...data,name:val})}}  />
            <Input label={translate("settings.user_edit.phone")} value={data.phone} onChangeText={(val) => {setData({...data,phone:val})}} />
            <View style={{marginTop:18}}></View>
            <Button status="info" size={'small'} onPress={UpdateInfo}>{translate("settings.user_edit.update_info")}</Button>
         </Pressable>
     )
}


const mapStateToProps = (state) => {
     return {
         user:state.user
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         setUser:item => dispatch(UserActions.setUser(item))
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);