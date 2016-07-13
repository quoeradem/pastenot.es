import {TOGGLE_DRAWER} from '../actions';

export default function mode(state = {drawer: false}, action) {
    switch(action.type) {

    case 'TOGGLE_DRAWER':
        return {
            ...state,
            drawer: !state.drawer,
        }

    default:
        return state;

    }
}