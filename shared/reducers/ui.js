import {TOGGLE_DRAWER, TOGGLE_MENU} from '../actions';

export default function ui(state = {drawer: false, menu: false}, action) {
    switch(action.type) {

    case 'TOGGLE_DRAWER':
        return {
            ...state,
            drawer: !state.drawer,
        }

    case 'TOGGLE_MENU':
        return {
            ...state,
            menu: !state.menu,
        }

    default:
        return state;

    }
}