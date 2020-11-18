import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const AddAuthorForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  // const myAuthors = useSelector((state: AppState) => state.author.allAuthors)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = "http://localhost:3000/api/v1/authors"
    console.log(firstName)
    console.log(lastName)
    console.log(email)
    const data = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email
    }

    axios({
      method: 'post',
      url: url,
      data: data
    });
    setFirstName('')
    setLastName('')
    setEmail('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "firstname":
        setFirstName(e.target.value)
        break;
      case "lastname":
        setLastName(e.target.value)
        break;
      case "email":
        setEmail(e.target.value)
        break;
      default:
      // code block
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder='First Name'
          name='firstname'
          value={firstName}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Last Name'
          name='lastname'
          value={lastName}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Email'
          name='email'
          value={email}
          onChange={handleChange}
        />
        <Form.Button type="submit" content='Submit' />
    </Form>
  )
}

export default AddAuthorForm