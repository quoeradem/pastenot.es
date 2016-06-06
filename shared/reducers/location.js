import {ABOUT_NAV, COPY_PASTE, GET_PASTE, NEW_PASTE, SAVE_PASTE} from '../actions';

export default function location(state = "/", action) {
    switch(action.type) {
    case 'ABOUT_NAV':
        return "/about";

    case 'COPY_PASTE':
        return "/";

    case 'GET_PASTE':
        return "/" + action.res.id;

    case 'NEW_PASTE':
        return "/";

    case 'SAVE_PASTE':
        return "/" + action.res.id;

    default:
        return state;
    }
    
}