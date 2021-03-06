import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import {Button} from 'rmwc/Button';
import {addNewQuestion} from "../actions/questions";
import TextField, {HelperText, Input} from '@material/react-text-field';

class CreateQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            optionOne: "",
            optionTwo: "",
            snackbarStartIsOpen: false
        }

    }
    render(){
        const {  optionOne, optionTwo } = this.state;
        return (
            <div>
                <center>
                <div>

                 <h3> Create Question in the format of would you rather </h3>
                <TextField
                  label='Option 1'
                  helperText={<HelperText>Type something for the first option</HelperText>}>
                  <Input
                    value = {optionOne}
                     onChange = {this.handleOptionOneChange}/>
                </TextField>
                 <TextField
                  label='Option 2'
                  helperText={<HelperText>Type something for the second option</HelperText>}>
                  <Input
                    value = {optionTwo}
                      onChange = {this.handleOptionTwoChange}/>
                </TextField>

                </div>
                <div>
                    <br/><br/>
                        <NavLink to={"/"}>
                            <Button outlined
                             onClick = {() => this.handleSubmit()}>
                                Add Question
                            </Button>
                        </NavLink>
                </div>
                </center>

            </div>

        )
    }
    handleSubmit(){
        this.props.dispatch(addNewQuestion(this.state.optionOne, this.state.optionTwo));
        this.props.reloadData();
        this.setState({
            optionOne: "",
            optionTwo: "",
        })
    }


    handleOptionOneChange = (e) => {
        const text = e.target.value;
        this.setState({optionOne: text})
    };
    handleOptionTwoChange = (e) => {
        const text = e.target.value;
        this.setState({optionTwo: text})
    }


};

function mapStateToProps({users, authedUser}){
   return {
       users, authedUser
   }
}
export default connect(mapStateToProps)(CreateQuestion);