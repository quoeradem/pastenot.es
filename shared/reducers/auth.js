import {SET_AUTH_CODE} from '../actions';
import {GET_AUTH_TOKEN} from '../actions';

export default function mode(state = "", action) {
    switch(action.type) {

    case 'SET_AUTH_CODE':
        return action.code;

    case 'GET_AUTH_TOKEN':
        return state;

    default:
        return state;
    }
}