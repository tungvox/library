import React from 'react'
import { Button, Checkbox, Form, Header, Image, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'

import './LoginModal.scss'


const LoginModal = () => {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = () => {
    console.log('submit')
    const url = "http://localhost:3000/api/v1/auth/login"
    const data = {
      "email" : email,
      "password": password
    }
    axios({
      method: 'post',
      url: url,
      data: data
    })
    setEmail('')
    setPassword('')
    setOpen(false)
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

  return (
    <Modal
      centered={true}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Login</Button>}
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
              onClick={() => handleSubmit()}
              positive
            />
          </Modal.Actions>
        </div>
      </div>
    </Modal>
  )
}

export default LoginModal