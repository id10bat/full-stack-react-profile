import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

// api
import profileApis from '../api/requestApis';



// ui
import { Image, Icon } from 'semantic-ui-react';


// img
import B_G from '../img/bg-login.jpg';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';

// form page
// import Home from './home';



// กำหนดรูป background
const style_bg_img = {
    height: '100%',
    backgroundSize: 'cover',
    lineHeight: '1.7em',
    textAlign: 'center',
    backgroundImage: `url(${B_G} )`,
    backgroundColor: 'transparent',
    // backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    opacity: 1,

}






export default class OnAuth extends React.Component {
    state = {
        datas: []
    }
    logOut = () => {
        profileApis.signOutAuth()
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
                    <div key={data._id} style={{ position: 'absolute', width: '100%', height: '100%', top: '0px', overflowX: 'hidden' }}>
                        <div className="w3-bar" id="myNavbar" style={{ position: 'absolute', zIndex: 1, }}>
                            <a onClick={this.logOut} className="w3-bar-item w3-button w3-hover-black w3-right">
                                <Icon name="log out" />
                            </a>
                            <a href={`/profile/id=${data.userID}`} style={{
                                position: 'relative',
                                width: '120px',
                            }} className="w3-bar-item w3-button w3-hover-black" >
                                <Image style={{ float: 'left' }} avatar src={data.img} />
                                <h5 style={{
                                    position: 'absolute',
                                    left: '56px',
                                    top: 0,
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}>{data.name}</h5>
                            </a>
                        </div>

                        <div className="bgimg-1 w3-display-container w3-opacity-min" id="home" style={style_bg_img}>
                            <a href={`/profile/id=${data.userID}`}>
                                <div className="w3-display-middle" style={{ whiteSpace: "nowrap" }}>
                                    <span className="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity">HALLO <span className="w3-hide-small">MR.</span> {data.name.toUpperCase()}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

}