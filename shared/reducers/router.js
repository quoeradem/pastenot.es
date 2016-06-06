import {UPDATE_ROUTER} from '../actions';

export default function router(state = "/", action) {
    switch(action.type) {
    case 'UPDATE_ROUTER':
        return action.router.pathname;

    default:
        return state;
    }
}
