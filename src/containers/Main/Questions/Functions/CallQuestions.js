import React from 'react';
import { View } from 'react-native';
import { Layout,Text } from '@ui-kitten/components';
import { connect } from 'react-redux';

// Services
import {apis} from '../../../../services'

// Stores
import {QuestionsActions} from '../../../../stores'

let  CallQuestions= (props) => {
    let {setQuestions} = props
    let {category} = props.settings
    let CategoryID = category.ID
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    let _CallQuestion = () => {
        apis.questions.index(CategoryID,res => {
            if(res.questions.length >= 1) {
                let _questions = shuffle(res.questions)
                setQuestions(_questions)
            }
        },err => {
            console.log(err)
        })
    }
     React.useEffect(() => {
        _CallQuestion() 
     },[])

     return null
}


const mapStateToProps = (state) => {
     return {
         settings:state.settings
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         setQuestions:item => dispatch(QuestionsActions.setQuestions(item))
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(CallQuestions);