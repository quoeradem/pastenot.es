import {SET_USER, GET_PASTES} from '../actions';

export default function mode(state = {login: '', avatar: '', pastes: [], totalPastes: 0, totalViews: 0}, action) {
    switch(action.type) {

    case 'SET_USER':
        return {
            ...state,
            login: action.login,
            avatar: action.avatar
        }

    case 'LOGOUT':
        return state;

    case 'GET_PASTES':
        let pastes = action.res.items;
        let views = pastes.reduce((total, elem) => total + elem.meta.views, 0);

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