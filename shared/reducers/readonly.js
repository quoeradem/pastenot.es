import {ABOUT_NAV, COPY_PASTE, NEW_PASTE, SAVE_PASTE} from '../actions';

export default function readOnly(state = false, action) {
    switch(action.type) {
    case 'ABOUT_NAV':
        return true;

    case 'COPY_PASTE':
        return false;

    case 'GET_PASTE':
        return true;

    case 'NEW_PASTE':
        return false;

    case 'SAVE_PASTE':
        return true;

    default:
        return state;
    }
}
