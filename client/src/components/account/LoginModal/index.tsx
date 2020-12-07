import React from 'react'
import { Button, Checkbox, Form, Header, Image, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import { useForm } from "react-hook-form";

import './LoginModal.scss'


const LoginModal = () => {
  const [open, setOpen] = React.useState(false)
  const [secondOpen, setSecondOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [registerEmail, setRegisterEmail] = React.useState('')
  const [registerPassword, setRegisterPassword] = React.useState('')
  const [logStatus, setLogStatus] = React.useState(false)
  const [logButton, setLogButton] = React.useState(<Button>{logStatus ? 'Logout' : 'Login'}</Button>)
  const [message, setMessage] = React.useState(null)
  const { register, handleSubmit, watch, errors } = useForm();

  const handleSignIn = () => {
    console.log('submit')
    const url = "http://localhost:3000/api/v1/auth/login"
    const data = {
      "email": email,
      "password": password
    }
    axios({
      method: 'post',
      url: url,
      data: data
    }).then(function (res) {
      if (res.status === 200) {
        console.log('You are logged in')
        setLogStatus(true)
        sessionStorage.setItem('token', res.data.token);
      } else {
        sessionStorage.removeItem('token');
      }
    })
      .catch(function (error) {
        sessionStorage.removeItem('token');
      });

    setEmail('')
    setPassword('')
    setOpen(false)
  }

  const handleSignUp = () => {
    console.log('submit')
    const url = "http://localhost:3000/api/v1/auth/register"
    const data = {
      "firstName": firstName,
      "lastName": lastName,
      "email": registerEmail,
      "password": registerPassword,
      "isAdmin": false
    }

    let response: any = null

    axios.post(url, data)
      .then(function (res) {
        console.log(res.data)
        if (res.status === 400) {
          // Do something
        } else {
          console.log('Registered successful!')
          setSecondOpen(false)
        }
      })
      .catch(async function (error) {
        console.log(error.response.data)
        setMessage(error.response.data)
        console.log(message)
      });

    setLastName('')
    setFirstName('')
    setRegisterEmail('')
    setRegisterPassword('')

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value)
        break;
      case "password":
        setPassword(e.target.value)
        break;
      default:
      // code block
    }
  }

  const handleChangeSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "first-name":
        setFirstName(e.target.value)
        break;
      case "last-name":
        setLastName(e.target.value)
        break;
      case "register-email":
        setRegisterEmail(e.target.value)
        break;
      case "register-password":
        setRegisterPassword(e.target.value)
        break;
      default:
      // code block
    }
  }



  const handleModalTrigger = () => {

  }

  const handleLogout = () => {

  }

  return (
    <Modal
      centered={true}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={logStatus ? null : logButton}
      className="login-modal"
    >
      <div className="modal-container">
        <div className="modal-container__wrapper">
          <Form className="modal-container__wrapper__input">
            <Form.Field>
              <label>Email</label>
              <input onChange={handleChange} name="email" value={email} placeholder='Email' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input onChange={handleChange} name="password" value={password} placeholder='Password' />
            </Form.Field>
          </Form>
          <Modal.Actions className="modal-container__wrapper__action">
            <Button color='black' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              content="Submit"
              onClick={() => handleSignIn()}
              positive
            />
            <Button onClick={() => setSecondOpen(true)} primary>
              Sign Up
          </Button>
          </Modal.Actions>
        </div>
      </div>
      <Modal
        onClose={() => setSecondOpen(false)}
        open={secondOpen}
        size='small'
      >
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Content>
          <Form className="modal-container__wrapper__input">
            <Form.Field>
              <label>First name</label>
              <input onChange={handleChangeSignUp} name="first-name" value={firstName} placeholder='First name' 
              ref={
                register({
                  required: true,
                  maxLength: 255,
                  minLength: 1,
                  pattern: /^[A-Za-z]+$/i
                })
              } />
              {errors.firstName && errors.firstName.type === "required" && (
                <p>This field is required</p>
              )}
            </Form.Field>
            <Form.Field>
              <label>Last name</label>
              <input onChange={handleChangeSignUp} name="last-name" value={lastName} placeholder='Last name' />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input onChange={handleChangeSignUp} name="register-email" value={registerEmail} placeholder='Email' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input onChange={handleChangeSignUp} name="register-password" value={registerPassword} placeholder='Password' />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon='check'
            content='All Done'
            onClick={handleSubmit(handleSignUp)}
          />
        </Modal.Actions>
      </Modal>
    </Modal>
  )
}

export default LoginModal