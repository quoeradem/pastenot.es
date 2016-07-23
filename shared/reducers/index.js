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
import isWrapped from './isWrapped';

const rootReducer = combineReducers({
    content,
    meta,
    mode,
    readOnly,
    router,
    isCopy,
    isWrapped,
    user,
    ui
});

export default rootReducer;