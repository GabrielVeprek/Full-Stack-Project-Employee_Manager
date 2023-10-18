import {CancelButton} from "../../buttonComponent/CancelButton.jsx";
import {Buffer} from "buffer";
import {useState} from "react";
import axios from "axios";

export function LoginPage() {

    const [user, setUser] = useState({
        username: "",
        password:"",
    })
    function handleUsernameChange(event) {
        setUser({...user, username: event.target.value});
    }

    function handlePasswordChange(event) {
        setUser({...user, password: event.target.value});
    }

    function handleLogin() {
        const headers = new Headers();
        const auth = Buffer.from(user.username + ':' + user.password).toString('base64');
        headers.set('Authorization', 'Basic ' + auth);

        axios.get('http://localhost:8080/login', { headers })
            .then(response => {
                const jwt = response.data;
                localStorage.setItem('jwt', jwt);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="container">
            <div className="row text-center">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Login</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="FirstName" className="form-label">
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="User-Name"
                                name="username"
                                value={user.username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="FirstName" className="form-label">
                                Password
                            </label>
                            <input
                                type={"password"}
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={user.password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </form>
                        <button type="submit" className="btn btn-outline-success mx-2" onSubmit={handleLogin}>Login</button>
                        <button type="submit" className="btn btn-outline-primary mx-2">Register</button>
                    <CancelButton/>
                </div>
            </div>
        </div>
    )
}