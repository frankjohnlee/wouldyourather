import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionCard, {CONST_NORMAL_MODE} from "./QuestionCard";

export const CONST_All_Questions = "CONST_ALL_QUESTIONS";
export const CONST_UNANSWERED_ONLY = "CONST_UNANSWERED_ONLY";
export const CONST_ANSWERED_ONLY = "CONST_ANSWERED_ONLY";
class QuestionList extends Component {

    constructor(props){
        super(props);
        const { mode, questionIds, currentUser } = this.props;
        const answeredObject = currentUser.answers;
        const answeredListKeys = Object.keys(answeredObject);
        let questionIdsList = questionIds; // set this to all Ids
        if (mode === CONST_UNANSWERED_ONLY){
            questionIdsList = questionIdsList.filter((id) => (answeredListKeys.indexOf(id) === -1) );
        }
        else if (mode === CONST_ANSWERED_ONLY){
            questionIdsList = questionIdsList.filter((id) => !(answeredListKeys.indexOf(id) === -1))
        }

        this.state = {questionIds: questionIdsList};
    }

    render() {
    return (
        <div>
            <ul className= 'dashboard-list'>
                {
                    this.state.questionIds.map((id) =>
                        <li key = {id}>
                            <QuestionCard
                                mode = { CONST_NORMAL_MODE}
                                key = {`QuestionCard ${id}`}
                                id = {id}/>
                        </li>
                    )
                }
            </ul>
        </div>
    );
  }


}
function mapStateToProps({ questions, users, authedUser }){

    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        currentUser: users[authedUser],
    }

}
export default connect(mapStateToProps)(QuestionList);
