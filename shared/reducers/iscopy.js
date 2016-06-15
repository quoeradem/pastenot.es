import {ABOUT_NAV, COPY_PASTE, GET_PASTE, NEW_PASTE, SAVE_PASTE} from '../actions';

export default function isCopy(state = false, action) {
    switch(action.type) {
    case 'COPY_PASTE':
        return true;

    case 'ABOUT_NAV':
    case 'GET_PASTE':
    case 'NEW_PASTE':
    case 'SAVE_PASTE':
        return false;

    default:
        return state;
    }
}