export default function mode(state = "", action) {
    switch(action.type) {

    case 'ABOUT_NAV':
        return "text/x-gfm";

    case 'GET_PASTE':
        return action.res.language;

    case 'SET_MODE':
        return action.mode;

    default:
        return state;
    }
}