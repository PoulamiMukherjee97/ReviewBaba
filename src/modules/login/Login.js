import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const LogIn = () => {
    const navigation = useNavigate();
    const signUp = (e) => {
        e.preventDefault();
        navigation('/signup');
    };
    const logIn = (e) => {
        e.preventDefault();
        navigation('/home');
    }

    return <div className="d-flex pt-4 justify-content-center">
        <div className="border shadow-lg p-5 w-50">
            <h1 className="text-center">LogIn</h1>
            <form className="py-2">
                <div className="form-group">
                    <label htmlFor="username" className="d-block py-2">Username: </label>
                    <input type="text" className="form-control d-block px-2" placeholder="Enter your Username" id="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd" className="d-block py-2">Password: </label>
                    <input type="password" className="form-control d-block px-2" placeholder="Enter your Password" id="pwd" />
                </div>
                <div className="d-flex flex-direction-sm-column justify-content-end mt-3">
                    <button className="btn btn-lg btn-success mx-md-2 mx-0 mt-md-0 mt-2" onClick={signUp}>SignUp</button>
                    <button className="btn btn-lg btn-primary mt-md-0 mt-2" onClick={logIn}>LogIn</button>
                </div>
            </form>
        </div>
    </div>;
};

export default LogIn;