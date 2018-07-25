import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createStore from 'src/redux/createStore';
import TestComponent from 'src/TestComponent';

ReactDOM.render(
	<Provider store={createStore()}>
		<TestComponent />
	</Provider>,
	document.getElementById('app'),
);
