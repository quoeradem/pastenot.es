export default function router(state = "/", action) {
    switch(action.type) {
    case 'UPDATE_ROUTER':
        return action.location;

    case 'COPY_PASTE':
        return "/"

    case 'SAVE_PASTE':
        return `/${action.res.id}`;

    default:
        return state;
    }
}