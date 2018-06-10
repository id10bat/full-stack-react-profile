import React from 'react';
// api
import profileApis from '../api/requestApis';

import { Icon } from 'semantic-ui-react';

// page
import { NavBer } from './navbar_user_on'
import { ShowFrom } from './show_from'

// css
// import 'w3-css/4/w3mobile.css';
import '../css/profile.css';
import 'w3-css/w3.css';

// img
import B_G from '../img/bg-login.jpg';

const style_bg_img = {
    backgroundImage: `url(${B_G} )`,
    minHeight: '100%'
}


export default class publicProfile extends React.Component {
    state = {
        datas: []
    }

    componentDidMount() {
        const { UrlIDs } = this.props.match.params
        profileApis.publicUser((users) => {
            if (users !== null) {
                this.setState({ datas: users.slice(0, 10) })
                console.log("log users on", users);
            } else {
                console.log("log users errer");

            }
        }, UrlIDs)

    }

    render() {
        const { datas } = this.state
        return (
            <div>
                {datas.map(data => (
                    <div style={{ position: 'absolute', width: '100%', height: '100%', top: '0px', overflowX: 'hidden' }}>
                        <NavBer />
                        <div style={{ width: '104%', height: '100%', overflowX: 'hidden', overflowY: 'scroll', }}>
                            <div className="bgimg-1 w3-display-container w3-opacity-min" id="home" style={style_bg_img}>
                                <ShowFrom />
                            </div>


                            <div key={data._id} className="w3-content w3-container w3-padding-64" id="about">
                                <h3 className="w3-center">ABOUT ME</h3>
                                <p className="w3-center"><em>{data.head_story}</em></p>
                                <p>{data.story}</p>
                                <div className="w3-row">
                                    <div className="w3-col m6 w3-center w3-padding-large">
                                        <p><b><i className="fa fa-user w3-margin-right"></i>{data.name}</b></p><br />
                                        <img src={`${data.img}`} className="w3-round w3-image w3-opacity w3-hover-opacity-off" alt="Photo of Me" width="500" height="333" />
                                    </div>


                                    <div className="w3-col m6 w3-hide-small w3-padding-large">
                                        <p>{data.content_about}</p>
                                    </div>
                                </div>
                                <p className="w3-large w3-center w3-padding-16">Im really good at:</p>
                                <p className="w3-wide"><i className="fa fa-camera"></i>Photography</p>
                                <div className="w3-light-grey">
                                    <div className="w3-container w3-padding-small w3-dark-grey w3-center" style={{ width: '90%' }}>90%</div>
                                </div>
                                <p className="w3-wide"><i className="fa fa-laptop"></i>Web Design</p>
                                <div className="w3-light-grey">
                                    <div className="w3-container w3-padding-small w3-dark-grey w3-center" style={{ width: '85%' }}>85%</div>
                                </div>
                                <p className="w3-wide"><i className="fa fa-photo"></i>Photoshop</p>
                                <div className="w3-light-grey">
                                    <div className="w3-container w3-padding-small w3-dark-grey w3-center" style={{ width: '75%' }}>75%</div>
                                </div>
                            </div>

                            <div className="w3-row w3-center w3-dark-grey w3-padding-16">
                                <div className="w3-quarter w3-section">
                                    <span className="w3-xlarge">14+</span><br /> Partners</div>
                                <div className="w3-quarter w3-section">
                                    <span className="w3-xlarge">55+</span><br />Projects Done</div>
                                <div className="w3-quarter w3-section">
                                    <span className="w3-xlarge">89+</span><br />Happy Clients</div>
                                <div className="w3-quarter w3-section">
                                    <span className="w3-xlarge">150+</span><br />Meetings</div>
                                <div className="w3-quarter w3-section" />
                            </div>
                        </div>
                    </div>

                ))}
            </div>

        )
    }
}

