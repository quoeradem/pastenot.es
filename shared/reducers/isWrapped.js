export default function isWrapped(state = true, action) {
    switch(action.type) {
    case 'TOGGLE_WRAP':
        return !state;

    default:
        return state;
    }
}