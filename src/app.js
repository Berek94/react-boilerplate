import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createStore from 'src/redux/createStore';
import TestComponent from 'src/TestComponent';

const renderApp = Component => {
	render(
		<Provider store={createStore()}>
			<Component />
		</Provider>,
		document.getElementById('root'),
	);
};

renderApp(TestComponent);

if (__DEV__ && module.hot) {
	module.hot.accept('src/TestComponent', () => {
		import('src/TestComponent').then(module => {
			renderApp(module.default);
		});
	});
}
