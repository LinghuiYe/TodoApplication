import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { NavMenu } from './components/NavMenu';
import ToDoApp from './components/ToDoApp';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={ToDoApp} />
      </Layout>
    );
  }
}
