export default function content(state = "", action) {
    switch(action.type) {
    case 'ABOUT_NAV':
        return action.res.content;

    case 'GET_PASTE':
        return action.res.content;

    case 'NEW_PASTE':
        return "";

    case 'SET_CONTENT':
        return action.text;

    default:
        return state;
    }
}