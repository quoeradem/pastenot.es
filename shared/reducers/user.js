import {SET_USER} from '../actions';

export default function mode(state = {login: '', avatar: ''}, action) {
    switch(action.type) {

    case 'SET_USER':
        return {
            login: action.login,
            avatar: action.avatar
        }

    default:
        return state;
    }
}