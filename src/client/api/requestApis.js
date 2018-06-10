
exports.onAuthState = function (User) {
    const requestApiOn = new XMLHttpRequest();

    requestApiOn.open("GET", "http://localhost:3000/api/onAuth", true);
    requestApiOn.setRequestHeader('Content-type', 'application/json; ');
    requestApiOn.send();

    requestApiOn.onreadystatechange = function () {
        if (requestApiOn.readyState == 4 && requestApiOn.status == "200") {
            let data = JSON.parse(requestApiOn.response);
            let user = data.result
            User(true)
            // console.log(user);
        } else if (requestApiOn.readyState == 4 && requestApiOn.status == "401") {
            let data = JSON.parse(requestApiOn.response);
            let user = data.result
            User(false)
            // console.log(user);
        }
    }


}


exports.signInAuth = function (email, password) {

    const signIn = {
        email: email,
        password: password
    }

    const requestApiSignIn = new XMLHttpRequest();

    requestApiSignIn.open('POST', "http://localhost:3000/api/signin", true);
    requestApiSignIn.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    requestApiSignIn.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data_show = JSON.parse(requestApiSignIn.response);
            console.log(data_show);
            location.reload();
        }

    }
    const data_signIn = JSON.stringify(signIn);

    requestApiSignIn.send(data_signIn);



}

exports.signUpAuth = function (username, email, password, passwordConf) {
    const signUp = {
        email: email,
        username: username,
        password: password,
        passwordConf: passwordConf
    }

    const requestApiSignUp = new XMLHttpRequest();

    requestApiSignUp.open("POST", "http://localhost:3000/api/signup", true);
    requestApiSignUp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    requestApiSignUp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            let data_show = JSON.parse(requestApiSignUp.response);
            console.log(data_show);
            location.reload();
        }

    }
    const data_singUp = JSON.stringify(signUp);

    requestApiSignUp.send(data_singUp);
    console.log(data_singUp);


}



exports.signOutAuth = function () {
    const requestApisOutAuth = new XMLHttpRequest();

    requestApisOutAuth.open('GET', "http://localhost:3000/api/logout", true);
    requestApisOutAuth.setRequestHeader('Content-type', 'application/json; ');
    requestApisOutAuth.send()

    requestApisOutAuth.onreadystatechange = function () {
        if (requestApisOutAuth.readyState == 4 && requestApisOutAuth.status == "401") {
            let data = JSON.parse(requestApisOutAuth.response);
            let user = data.result
            location.reload();
            Log(user)
            console.log(user);
        } else if (requestApisOutAuth.readyState == 4 && requestApisOutAuth.status == "200") {
            let data = JSON.parse(requestApisOutAuth.response);
            let user = data.result
            location.reload();
            Log(user)
            console.log(user);
        }
    }
}


exports.logUsers = function (Log) {
    const requestApiLogUser = new XMLHttpRequest();

    requestApiLogUser.open("GET", "http://localhost:3000/api/log_users", true);
    requestApiLogUser.setRequestHeader('Content-type', 'application/json; ');
    requestApiLogUser.send();

    requestApiLogUser.onreadystatechange = function () {
        if (requestApiLogUser.readyState == 4 && requestApiLogUser.status == "200") {
            let data = JSON.parse(requestApiLogUser.response);
            let user = data.result
            Log(user)
            console.log(user);
        } else if (requestApiLogUser.readyState == 4 && requestApiLogUser.status == "401") {
            let data = JSON.parse(requestApiLogUser.response);
            let user = data.result
            Log(user)
            console.log(user);
        }
    }
}

exports.personalUser = function (User, UrlID) {
    const requestApiPersonolUsers = new XMLHttpRequest();

    requestApiPersonolUsers.open("GET", `http://localhost:3000/api/user/id=${UrlID}`, true);
    requestApiPersonolUsers.setRequestHeader('Content-type', 'application/json; ');
    requestApiPersonolUsers.send();

    requestApiPersonolUsers.onreadystatechange = function () {
        if (requestApiPersonolUsers.readyState == 4 && requestApiPersonolUsers.status == "200") {
            let data = JSON.parse(requestApiPersonolUsers.response);
            let user = data.result
            User(user)
            console.log(user);
        } else if (requestApiPersonolUsers.readyState == 4 && requestApiPersonolUsers.status == "401") {
            let data = JSON.parse(requestApiPersonolUsers.response);
            let user = data.result
            User(user)
            console.log(user);
        }
    }
}

exports.publicUser = function (User, userIDs) {
    const requestApiPubliclUser = new XMLHttpRequest();

    requestApiPubliclUser.open("GET", `http://localhost:3000/api/users/${userIDs}`, true);
    requestApiPubliclUser.setRequestHeader('Content-type', 'application/json; ');
    requestApiPubliclUser.send();

    requestApiPubliclUser.onreadystatechange = function () {
        if (requestApiPubliclUser.readyState == 4 && requestApiPubliclUser.status == "200") {
            let data = JSON.parse(requestApiPubliclUser.response);
            let user = data.result
            User(user)
            console.log(user);
        } else if (requestApiPubliclUser.readyState == 4 && requestApiPubliclUser.status == "401") {
            let data = JSON.parse(requestApiPubliclUser.response);
            let user = data.result
            User(user)
            console.log(user);
        }
    }
}

exports.publicUserOffline = function (User, userIDs) {
    const requestApiPubliclUserOffline = new XMLHttpRequest();

    requestApiPubliclUserOffline.open("GET", `http://localhost:3000/api/users/${userIDs}`, true);
    requestApiPubliclUserOffline.setRequestHeader('Content-type', 'application/json; ');
    requestApiPubliclUserOffline.send();

    requestApiPubliclUserOffline.onreadystatechange = function () {
        if (requestApiPubliclUserOffline.readyState == 4 && requestApiPubliclUserOffline.status == "200") {
            let data = JSON.parse(requestApiPubliclUserOffline.response);
            let user = data.result
            User(user)
            console.log(user);
        } else if (requestApiPubliclUserOffline.readyState == 4 && requestApiPubliclUserOffline.status == "401") {
            let data = JSON.parse(requestApiPubliclUserOffline.response);
            let user = data.result
            User(user)
            console.log(user);
        }
    }
}

exports.publicUsers = function (User) {
    const requestApiPubliclUser = new XMLHttpRequest();

    requestApiPubliclUser.open("GET", `http://localhost:3000/api/users`, true);
    requestApiPubliclUser.setRequestHeader('Content-type', 'application/json; ');
    requestApiPubliclUser.send();

    requestApiPubliclUser.onreadystatechange = function () {
        if (requestApiPubliclUser.readyState == 4 && requestApiPubliclUser.status == "200") {
            let data = JSON.parse(requestApiPubliclUser.response);
            let user = data.result
            User(user)
            console.log(user);
        } else if (requestApiPubliclUser.readyState == 4 && requestApiPubliclUser.status == "401") {
            let data = JSON.parse(requestApiPubliclUser.response);
            let user = data.result
            User(user)
            console.log(user);
        }
    }
}



exports.deleteLogUsers = function (userId) {
    const requestApiDeleteLogUser = new XMLHttpRequest();

    requestApiDeleteLogUser.open("DELETE", `http://localhost:3000/api/delete_log_users/${userId}`, true);
    requestApiDeleteLogUser.setRequestHeader('Content-type', 'application/json; ');
    requestApiDeleteLogUser.send();

    requestApiDeleteLogUser.onreadystatechange = function () {
        if (requestApiDeleteLogUser.readyState == 4 && requestApiDeleteLogUser.status == "200") {
            let data = JSON.parse(requestApiDeleteLogUser.response);
            let user = data.result
            // Log(user)
            console.log(user);
        } else if (requestApiDeleteLogUser.readyState == 4 && requestApiDeleteLogUser.status == "401") {
            let data = JSON.parse(requestApiDeleteLogUser.response);
            let user = data.result
            // Log(user)
            console.log(user);
        }
    }


}