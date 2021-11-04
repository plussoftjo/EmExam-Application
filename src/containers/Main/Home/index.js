import React from 'react';
import { View } from 'react-native';
import { Layout,Text } from '@ui-kitten/components';
import { connect } from 'react-redux';


// Contents
import {NotAuth,AuthPage} from './Contents'

let Home = (props) => {
   let {navigation} = props;
   let {auth} = props.user;

   if(auth) {
      return(
         <AuthPage navigation={navigation} />
       )
   }else {
      return(
         <NotAuth navigation={navigation} />
       )
   }

}


const mapStateToProps = (state) => {
   return {
     user:state.user
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
     
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);