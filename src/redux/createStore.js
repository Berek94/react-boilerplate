import {createStore} from 'redux';
import rootReducer from 'src/redux/rootReducer';

export default () => createStore(rootReducer, {});
