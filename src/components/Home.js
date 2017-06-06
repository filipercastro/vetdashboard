import React, { Component } from 'react';
import { connect } from 'react-redux';



class Home extends Component {
  render() {
    return (
        <div>{this.props.user.role}</div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);;
