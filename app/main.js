import React from 'react';
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom';
import App from './components/main.jsx';
import Dashboard from './components/dashboard/Document-list.jsx';
import Document from './components/dashboard/Document-page.jsx';
import Create from './components/create-page/CreateDoc-page.jsx';

require('./styles/style.css');

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="/document/:id" component={Document} />
      <Route path="/category" component={Dashboard} />
      <Route path="/author" component={Dashboard} />
      <Route path="/create" component={Create} />
      <Route path="/edit" component={Create} />
    </Route>
  </Router> ), document.getElementById('container'));
