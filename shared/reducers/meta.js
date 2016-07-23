export default function meta(state = {chars: 0, lines: 0}, action) {
    switch(action.type) {
    case 'GET_PASTE':
        return {
            chars: action.res.meta.chars,
            lines: action.res.meta.lines,
            views: action.res.meta.views,
        };

    case 'SAVE_PASTE':
        return {
            chars: action.res.meta.chars,
            lines: action.res.meta.lines,
            views: action.res.meta.views,
        };

    case 'SET_LINEC':
        state.lines = action.lc;
        return state;

    default:
        return state;
    }
}