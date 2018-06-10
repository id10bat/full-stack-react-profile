import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App';
import registerServiceWorker from './client/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
