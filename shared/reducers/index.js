import {combineReducers} from 'redux';

/* Reducers */
import readOnly from './readonly';
import mode from './mode';
import content from './content';
import router from './router';
import meta from './meta';
import location from './location';

const rootReducer = combineReducers({
    content: content,
    location: location,
    meta: meta,
    mode: mode,
    readOnly: readOnly,
    router: router,
});

export default rootReducer;