export default function mode(state = {login: '', avatar: '', pastes: [], totalPastes: 0, totalViews: 0}, action) {
    switch(action.type) {

    case 'SET_USER':
        return {
            ...state,
            login: action.login,
            avatar: action.avatar
        }

    case 'USER_LOGIN':
        return {
            ...state,
            login: action.res.login,
            avatar: action.res.avatar_url
        }

    case 'USER_LOGOUT':
        return {login: '', avatar: '', pastes: [], totalPastes: 0, totalViews: 0};

    case 'GET_PASTES':
        const pastes = action.res.items;
        const views = pastes.reduce((total, elem) => total + elem.meta.views, 0);

        return {
            ...state,
            pastes: action.res.items,
            totalPastes: action.res.totalItems,
            totalViews: views
        }

    default:
        return state;
    }
}