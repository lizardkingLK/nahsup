import React from 'react'
import { Typography, Link } from '@material-ui/core';
import LoginForm from './components/form/LoginForm';

class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <Typography className="login-title" variant="h4" component="h2">
                    Login
                </Typography>
                <LoginForm />
                <Link href="/">Back</Link>
            </div>
        )
    }
}

export default Login