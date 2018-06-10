import React from 'react';

// api
import profileApis from '../api/requestApis';

import { Icon } from 'semantic-ui-react';

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


export default class personalProfile extends React.Component {
    state = {
        datas: []
    }

    logOut = () => {
        profileApis.signOutAuth()
    } 

    componentDidMount() {

        const { UrlID } = this.props.match.params

        profileApis.personalUser((user) => {
            if (user !== null) {
                this.setState({ datas: user.slice(0, 10) })
                console.log("personal user on", user);

            } else {
                console.log("log user errer");

            }
        }, UrlID)
    }

    render() {
        const { datas } = this.state
        return (
            <div>
                {datas.map(data => (
                    <div style={{ position: 'absolute', width: '100%', height: '100%', top: '0px', overflowX: 'hidden' }}>
                        <div className="w3-bar" id="myNavbar" style={{ position: 'absolute', zIndex: 1, }}>
                            <a onClick={this.logOut} className="w3-bar-item w3-button w3-hover-black w3-right">
                                <Icon name="log out" />
                            </a>
                            <a href="/" className="w3-bar-item w3-button w3-hover-black"><Icon name="home" /></a>
                        </div>
                        <div style={{ width: '104%', height: '100%', overflowX: 'hidden', overflowY: 'scroll', }}>
                            <div className="bgimg-1 w3-display-container w3-opacity-min" id="home" style={style_bg_img}>
                                <div className="w3-display-middle" style={{ whiteSpace: "nowrap" }}>
                                    <span className="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity">MY <span className="w3-hide-small">WEBSITE</span> PROFILE</span>
                                </div>
                            </div>

                            <div key={data._id} className="w3-content w3-container w3-padding-64" id="about">
                                <h3 className="w3-center">ABOUT ME</h3>
                                <div>
                                <p className="w3-center"><em>{data.head_story}<a style={{ margin: "5px" }}><Icon name="pencil alternate" /></a></em></p>
                                
                                </div>
                                <p>{data.story}<a style={{ margin: "5px" }}><Icon name="pencil alternate" /></a></p>
                                <div className="w3-row">
                                    <div className="w3-col m6 w3-center w3-padding-large">
                                        <p><b><i className="fa fa-user w3-margin-right"></i>{data.name}<a style={{ margin: "5px" }}><Icon name="pencil alternate" /></a></b></p><br />
                                        <div style={{position: 'relative'}}>
                                            <img src={`${data.img}`} className="w3-round w3-image w3-opacity w3-hover-opacity-off" alt="Photo of Me" width="500" height="333" />
                                            <a style={{
                                                backgroundColor: 'rgba(255, 255, 255, .8)',
                                                borderTopLeftRadius: '4px',
                                                bottom: 0,
                                                minWidth: '50px',
                                                padding: '4px 10px',
                                                position: 'absolute',
                                                right: 0,
                                            }}><Icon name="camera"/> แก้ไข</a>
                                        </div>
                                    </div>


                                    <div className="w3-col m6 w3-hide-small w3-padding-large">
                                        <p>{data.content_about}<a style={{ margin: "5px" }}><Icon name="pencil alternate" /></a></p>
                                    </div>
                                </div>
                                <p className="w3-large w3-center w3-padding-16">Im really good at:<a style={{ margin: "5px" }}><Icon name="pencil alternate" /></a></p>
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

