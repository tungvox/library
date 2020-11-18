import React from 'react'
import { pure } from 'recompose'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'

import { removeBook } from '../../../redux/actions'
import { AppState, BookListProps } from '../../../types'
import useBooks from '../../../hooks/useBooks'
import './BookList.scss'


const BookList = ({filteredBooks} : BookListProps) => {
  const [books, error] = useBooks()
  const myBooks = useSelector((state: AppState) => state.book.allBooks)
  const dispatch = useDispatch()
  console.log(myBooks)

  const handleDeleteBook = (book:any) => {
    const url = `http://localhost:3000/api/v1/books/${book._id}`
    console.log(book._id)
    axios({
      method: 'delete',
      url: url,
      // data: data
    });
    dispatch(removeBook(book))
  }
  return (
    <Table className="book-list" striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Publisher</th>
          {/* <th>Edit</th> */}
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          filteredBooks.map((book) => {
            return (
              <tr key={book.ISBN}>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.publisher}</td>
                <td>
                  <Button
                    // disabled={added(name)}
                    onClick={() => {
                      handleDeleteBook(book)
                    }}
                    variant="info"
                  >
                    Delete
                  </Button>
                </td>
                {/* <td></td> */}
              </tr>)
          })
        }
      </tbody>
    </Table>
  )
}

export default pure(BookList)