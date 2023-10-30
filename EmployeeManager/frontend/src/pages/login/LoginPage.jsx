import {useState} from "react";
import {CancelButton} from "../../buttonComponent/CancelButton.jsx";
import {FormLoginError} from "./component/FormLoginError.jsx";
import {FormLogin} from "./component/FormLogin.jsx";
import {ButtonLogin} from "./component/ButtonLogin.jsx";
import {ButtonRegister} from "./component/ButtonRegister.jsx";
import {DefaultMask} from "./component/DefaultMask.jsx";
import {setTokenToHeader} from "../../utils/sendToken.js";
import {employeeLoginURL} from "../../URLs/EmployeeURLs.js";

export function LoginPage({setIsLoggedIn}) {
    const [wrongLogIn, setWrongLogIn] = useState(false);

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    function handleUsernameChange(event) {
        setUser({...user, username: event.target.value});
    }

    function handlePasswordChange(event) {
        setUser({...user, password: event.target.value});
    }

    function handleLogin() {
        const headers = setTokenToHeader(user);

        fetch(employeeLoginURL, {method: 'GET', headers: headers})
            .then(response => {
                if (response.status !== 401) {
                    setIsLoggedIn(true);
                    window.location.href = "http://localhost:5173"
                } else {
                    setWrongLogIn(true);
                }
                return response.text();
            }).then(jwt => localStorage.setItem('jwt' ,jwt))
    }

    const errorLoginForm =
        <DefaultMask>
            <FormLoginError user={user} handleUsernameChange={handleUsernameChange}
                            handlePasswordChange={handlePasswordChange}/>
            <ButtonLogin handleLogin={handleLogin}/>
            <ButtonRegister/>
            <CancelButton/>
        </DefaultMask>


    const loginForm =
        <DefaultMask>
            <FormLogin user={user} handleUsernameChange={handleUsernameChange}
                       handlePasswordChange={handlePasswordChange}/>
            <ButtonLogin handleLogin={handleLogin}/>
            <ButtonRegister/>
            <CancelButton/>
        </DefaultMask>

    return (wrongLogIn ? errorLoginForm : loginForm)
}




