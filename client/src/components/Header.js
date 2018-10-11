import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component{
  renderContent(){
    console.log(this.props);
    switch(this.props.auth){
      case null:
        return;
      case false:
        return(
          <li>
            <a href = {'http://localhost:6969/auth/google'}>Login GG </a>
          </li>
        );
      default:
      return[
        <li key = "2">
          <a href = {'http://localhost:6969/auth/logout'}>Logout</a>
        </li>
      ]
    }
  }

  render(){
    return(
      <div>
      a
        {this.renderContent()}
      </div>
    )
  }
}

function mapStateToProps({auth}){
  return { auth };
}

export default connect(mapStateToProps)(Header);
