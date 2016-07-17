import {combineReducers} from 'redux';

/* Reducers */
import readOnly from './readonly';
import mode from './mode';
import content from './content';
import router from './router';
import meta from './meta';
import isCopy from './iscopy';
import user from './user';
import ui from './ui';

const rootReducer = combineReducers({
    content: content,
    meta: meta,
    mode: mode,
    readOnly: readOnly,
    router: router,
    isCopy: isCopy,
    user: user,
    ui: ui
});

export default rootReducer;