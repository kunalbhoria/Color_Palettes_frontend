import React, { Component, useContext } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios'
import { login, register } from '../Hooks/useAuth';
// import { userContext } from '../Context/userContext';
export default class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = { name: '', email: '', password: '', showPassword: false, message: { show: false, message: 'Something Went Wrong' } }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, message: { show: false, message: 'Something Went Wrong' }
    })
  };

  handleLogin = async () => {
    let { name, email, password } = this.state;
    if (name.trim().length <= 0 || email.trim().length <= 0 || password.length <= 0) {
      return this.setState({ message: { show: true, message: 'Enter all fields Name, Email and password ' } })
    }
    let isLogin = await login({ name: name.trim(), email: email.trim(), password });
    if (isLogin.success) {
      console.log('suucessfuly login');
      this.props.closeLoginDialog();
      this.props.setUser()
      this.props.RefreshUserPalettes()
    } else {
      console.log('login failed');
      this.setState(prState => {
        return { ...prState, message: { show: true, message: isLogin.message } }
      })
    }
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  handleRegister = async () => {
    let { name, email, password } = this.state;
    if (name.trim().length <= 0 || email.trim().length <= 0 || password.length <= 0) {
      return this.setState({ message: { show: true, message: 'Enter all fields Name, Email and password ' } })
    }
    let isRegister = await register({ name: name.trim(), email: email.trim(), password });
    if (isRegister.success) {
      console.log('suucessfuly register');
      this.props.closeLoginDialog();
      this.props.setUser()
      this.props.RefreshUserPalettes()
    }
    else {
      console.log('register failed');
      this.setState(prState => {
        return { ...prState, message: { show: true, message: isRegister.message } }
      })
    }
  }


  render() {
    const { open, closeLoginDialog } = this.props;
    let { name, email, password, showPassword, message } = this.state;

    return (<Dialog
      open={open}
      //  fullWidth={true}
      maxWidth='xs'
      onClose={closeLoginDialog}
    >

      <DialogTitle color="secondary">Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message.show ? message.message : "Login to access your palettes."}

        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          value={name}
          name='name'
          type="text"
          onChange={this.handleChange}
          fullWidth
          required
          variant="standard"
        />
        <TextField
          margin="dense"
          id="email"
          name='email'
          label="Email Address"
          type="email"
          value={email}
          onChange={this.handleChange}
          fullWidth
          required
          variant="standard"
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          name='password'
          value={password}
          onChange={this.handleChange}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          variant="standard"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={closeLoginDialog}>Cancel</Button>
        <Button color="primary" onClick={this.handleRegister}>Register</Button>
        <Button type="submit" onClick={this.handleLogin} color="secondary" variant="contained" >Login</Button>
      </DialogActions>
    </Dialog>
    )
  }
}
