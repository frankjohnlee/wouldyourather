import { _getUsers, _getQuestions} from "../utils/_DATA";
import { getInitialData } from "../utils/api";
import { recieveQuestions } from "./questions";
import { recieveUsers} from "./users";
import { setAuthedUser } from "./authedUser";

const AUTHED_ID = 'tylermcginnis';

function handleInitialData(){
    return (dispatch) => {
        return getInitialData().then(({users, questions})=>{
            dispatch(recieveQuestions(questions));
            dispatch(recieveUsers(users));
            dispatch(setAuthedUser(AUTHED_ID));
        })
    }

}