import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'

import * as Actions from '../actions/demo.js'
import './style.css'

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.value
    };
  }

  onEdit = e => {
    this.setState({
      text: e.target.value
    });
    this.props.onEdit(e);
  }

  render() {
    const { value, onEdit, onDestroy } = this.props;
    return (
      <li>
        <input type="text" value={this.state.text} onChange={this.onEdit}/>
        <button className="destroy" onClick={onDestroy}>×</button>
      </li>
    )
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAddItem = () => {
    this.props.actions.addItem({
      id: uuid(),
      value: 'test'
    });
  }

  onEdit = e => {
    console.log(e.target.value)
  }

  onDestroy = id => {
    this.props.actions.deleteItem({ id });
  }

  componentDidMount() {
    this.props.actions.getItem();
  }

  render() {
    const { itemList } = this.props.demo;

    return (
      <div>
        <h4>test demo</h4>
        <button onClick={this.onAddItem}>Add</button>
        <ul>
          {
            itemList.map(item => {
              return <ListItem
                key={item.id}
                value={item.value}
                onEdit={this.onEdit}
                onDestroy={() => this.onDestroy(item.id)}
                />
            })
          }
        </ul>
      </div>
    )
  }
}

function _uuid() {
  return Math.round(2147483647 * Math.random())
}

function uuid () {
  try {
    var a = new Uint32Array(1);
    window.crypto.getRandomValues(a);
    return a[0] & 2147483647
  } catch (b) {
    return _uuid()
  }
}


function mapState(state) {
  return {
    demo: state.demo
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Demo)