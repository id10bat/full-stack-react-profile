import React from 'react';
// api
import profileApis from '../api/requestApis';

import { Icon } from 'semantic-ui-react';

// page

import { ButtonUserAction } from './signin';
// css
// import 'w3-css/4/w3mobile.css';
import '../css/profile.css';
import 'w3-css/w3.css';

// img
import B_G from '../img/bg-login.jpg';

const style_bg_size = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    zIndex: 1,
    opacity: 1,


}

const style_bg_img = {
    backgroundImage: `url(${B_G} )`,
    minHeight: '100%'
}



export default class publicProfileOffline extends React.Component {
    state = {
        data_offline: []
    }

    componentDidMount() {
        const { ID } = this.props.match.params
        profileApis.publicUserOffline((users) => {
            if (users !== null) {
                this.setState({ data_offline: users.slice(0, 10) })
                console.log("log users on", users);
            } else {
                console.log("log users errer");

            }
        }, ID)

    }

    render() {
        const { data_offline } = this.state
        return (
            <div>
                {data_offline.map(data_check => (
                    <div>
                        <div key={data_check._id} style={{ position: 'absolute', width: '100%', height: '100%', top: '0px', overflowX: 'hidden' }}>
                            <div className="w3-bar" id="myNavbar" style={{ position: 'absolute', zIndex: 1, }}>
                                <a href="/" className="w3-bar-item w3-button w3-hover-black"><Icon name="home" /> </a>
                            </div>
                            <div style={{ width: '104%', height: '100%', overflowX: 'hidden', overflowY: 'scroll' }}>
                                <div className="bgimg-1 w3-display-container w3-opacity-min" id="home" style={style_bg_img}>
                                    <div className="w3-display-middle" style={{ whiteSpace: "nowrap" }}>
                                        <span className="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity">MY <span className="w3-hide-small">WEBSITE</span> PROFILE</span>
                                    </div>
                                </div>


                                <div className="w3-content w3-container w3-padding-64" id="about">
                                    <h3 className="w3-center">ABOUT ME</h3>
                                    <p className="w3-center"><em>{data_check.head_story}</em></p>
                                    <p>{data_check.story}</p>
                                    <div className="w3-row">
                                        <div className="w3-col m6 w3-center w3-padding-large">
                                            <p><b><i className="fa fa-user w3-margin-right"></i>{data_check.name}</b></p><br />
                                            <img src={`${data_check.img}`} className="w3-round w3-image w3-opacity w3-hover-opacity-off" alt="Photo of Me" width="500" height="333" />
                                        </div>


                                        <div className="w3-col m6 w3-hide-small w3-padding-large">
                                            <p>{data_check.content_about}</p>
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
                    </div>

                ))}

                <div style={{
                    bottom: '20px',
                    left: '20px',
                    padding: 0,
                    margin: 0,
                    position: 'absolute',
                }}>
                    <ButtonUserAction />
                </div>

            </div>

        )
    }
}

