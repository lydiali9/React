import React from 'react'
import { Router, Route, Switch } from 'react-router-dom';

import Header from '../components/header/index.jsx'
import Sidebar from '../components/sidebar/index.jsx'
import Footer from '../components/footer/index.jsx'
import Home from './home/index.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const { match } = this.props;

    return (
      <div>
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path={`${match.url}/`} component={Home} />
          {
          /*  <Route exact path={`${match.url}/medium`} component={Medium} />
            <Route path={`${match.url}/medium/create`} component={CreateMedium} />
            <Route path={`${match.url}/medium/edit`} component={EditMedium} />
            <Route exact path={`${match.url}/operation`} component={Operation} />
            <Route exact path={`${match.url}/subaccount`} component={SubAccount} />
            <Route exact path={`${match.url}/product`} component={Product} />*/
          }
        </Switch>
        <Footer />
      </div>
    )
  }
}