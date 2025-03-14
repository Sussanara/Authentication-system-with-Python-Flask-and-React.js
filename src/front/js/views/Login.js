import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginSuccess, setLoginSuccess] = useState(false)


    const sendDatabase = (userdata) => {
        fetch('https://5000-4geeksacade-reactflaskh-eekacvxs32u.ws-us64.gitpod.io/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userdata)
        })
            .then((response) => {
                if (response.status === 401) {
                    toast.error('User credentials does not exist or are incorrect.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                } else {
                    return response.json()
                }
            })
            .then((data) => { console.log(data); data.status === "success" ? (setLoginSuccess(true), sessionStorage.setItem('token', data.data.access_token, sessionStorage.setItem('user', data.data.user.email))) : null })
            .catch((error) => { console.log(error) })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var userData = {
            "email": email,
            "password": password
        }
        sendDatabase(userData)
    }

    if (loginSuccess) {
        let history = useHistory();
        history.push('/private')
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        <form className="m-5" style={{ width: '450px' }} onSubmit={(e) => handleSubmit(e)}>
                            <div className='col-md-12 text-center mb-4'><h4>Login</h4></div>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    Email:
                                </label>
                                <div className="col-sm-13">
                                    <input type="email" className="form-control" id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">
                                    Contraseña:
                                </label>
                                <div className="col-sm-13">
                                    <input type="password" className="form-control" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-success gap-1">
                                    Sign up
                                </button>
                            </div>
                            <div className='mt-3 d-flex justify-content-center'><p>¿No tienes una cuenta? <Link to='/register'>Registrate</Link></p></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login