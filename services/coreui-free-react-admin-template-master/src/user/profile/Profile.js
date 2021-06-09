import React, { Component } from 'react';
import './Profile.css';
import { connect } from "react-redux";

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                                this.props.currentUser.imageUrl ? (
                                    <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.props.currentUser.name}</h2>
                           <p className="profile-email">{this.props.currentUser.email}</p>
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //setLoggedIn: (token, user) => dispatch({
        //    type: LOGIN_SUCCESS,
        //    payload: {}
        //})
      }
  };
  
  const mapStateToProps = state => {
    return {
        currentUser: state.auth.user
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Profile);