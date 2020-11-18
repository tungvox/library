import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import axios from 'axios'
import { useDispatch } from 'react-redux'


const AddBookForm = () => {
  const [ISBN, setISBN] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [publisher, setPublisher] = useState("")
  const [authors, setAuthors] = useState("")
  const [status, setStatus] = useState("Available")
  const [borrowerID, setBorrowerID] = useState(null)
  const [publishedDate, setPublishedDate] = useState("")
  const [borrowDate, setBorrowDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)
  // const myAuthors = useSelector((state: AppState) => state.author.allAuthors)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = "http://localhost:3000/api/v1/books"
    // console.log(ISBN)
    // console.log(title)
    // console.log(description)
    const data = {
      "ISBN": ISBN,
      "title": title,
      "description": description,
      "publisher": publisher,
      "authors": authors,
      "status": status,
      "borrowerID": borrowerID,
      "publishedDate": publishedDate,
      "borrowDate": borrowDate,
      "returnDate": returnDate
    }

    axios({
      method: 'post',
      url: url,
      data: data
    });
    setISBN('')
    setTitle('')
    setDescription('')
    setPublisher('')
    setAuthors('')
    setPublishedDate('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "ISBN":
        setISBN(e.target.value)
        break;
      case "title":
        setTitle(e.target.value)
        break;
      case "description":
        setDescription(e.target.value)
        break;
      case "publisher":
        setPublisher(e.target.value)
        break;
      case "authors":
        setAuthors(e.target.value)
        break;
      case "publishedDate":
        setPublishedDate(e.target.value)
        break;
      default:
      // code block
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder='ISBN'
          name='ISBN'
          value={ISBN}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Title'
          name='title'
          value={title}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Description'
          name='description'
          value={description}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Publisher'
          name='publisher'
          value={publisher}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Authors'
          name='authors'
          value={authors}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Published Date'
          name='publishedDate'
          value={publishedDate}
          onChange={handleChange}
        />
        <Form.Button type="submit" content='Submit' />
    </Form>
  )
}

export default AddBookForm