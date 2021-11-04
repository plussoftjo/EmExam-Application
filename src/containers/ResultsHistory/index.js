import React from "react";
import { View,ScrollView } from "react-native";
import { Layout, Text, useTheme,TopNavigation,Icon,Button } from "@ui-kitten/components";
import { connect } from "react-redux";
import {translate} from '../../translations'
import { LinearGradient } from "expo-linear-gradient";

let ResultsHistory = (props) => {
  let {user,auth,userResults} = props.user
  let {navigation} = props;
  let theme = useTheme();
  let ResultList = ({result}) => (
    <View style={{flex:1,borderRadius:10,borderColor:'#7e7e7e',borderWidth:0.5,padding:16,marginTop:10,backgroundColor:'rgba(0,0,0,0.02)',marginHorizontal:16,marginVertical:3}}>
    <Icon name="color-palette-outline" style={{width:16,height:16}} fill={theme['text-hint-color']} />
      <Text category="s1" style={{fontFamily:'CairoBold'}}>Result :{result.results} / {result.questions}</Text>
      <Text category="s1" style={{fontFamily:'CairoBold'}}>{result.CreatedAt}</Text>
    </View>
  )
  return (
    <Layout style={{ flex: 1 }}>
      <LinearGradient
        // Button Linear Gradient
        colors={[theme["color-info-500"], theme["color-danger-500"]]}
        start={{ x: 0.3, y: 0.2 }}
        end={{ x: 0.9, y: 0.6 }}
        style={{ flex: 1 }}
      >
        <TopNavigation title={translate("results.header")} />
        {userResults.length == 0 &&
          <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:16}}>
          <Icon name="color-palette-outline" style={{width:32,height:32}} fill={theme['text-hint-color']} />
            <Text category="h5" style={{color:theme['text-hint-color'],textAlign:'center'}}>{translate("results.no_results")}</Text>
            <Button size={'small'} onPress={() => {navigation.navigate("Questions")}} style={{marginTop:16}} status="info">{translate("results.start_exam")}</Button>
          </View>
        }
        <ScrollView showsVerticalScrollIndicator={false}>
        {userResults.map((trg,index) => (
          <ResultList key={index} result={trg} />
        ))}
        </ScrollView>
        
      </LinearGradient>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user:state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsHistory);
