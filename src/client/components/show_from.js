import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

// api
import profileApis from '../api/requestApis';

export class ShowFrom extends React.Component {
    state = {
        datas: []
    }

    componentDidMount() {


        profileApis.personalUser((user) => {
            if (user !== null) {
                this.setState({ datas: user.slice(0, 10) })
                console.log("personal user on", user);

            } else {
                console.log("log user errer");

            }
        })
    }
    render() {
        const { datas } = this.state
        return (
            <div>
                {datas.map(data => (

                    <div className="w3-display-middle" style={{ whiteSpace: "nowrap" }}>
                        <a href={`/profile/id=${data.userID}`}>
                            <span className="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity">Hi! <span className="w3-hide-small">MR.</span> {data.name.toUpperCase()}</span>
                        </a>
                    </div>

                ))}
            </div>
        )
    }

}