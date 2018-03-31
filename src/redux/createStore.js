import {createStore} from 'redux';
import rootReducer from 'src/redux/rootReducer';

export default (initialState = {}) => {
	const store = createStore(rootReducer, initialState);

	if (__DEV__ && module.hot) {
		module.hot.accept('src/redux/rootReducer', module => {
			store.replaceReducer(module.default);
		});
	}

	return store;
};
