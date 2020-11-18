import React from 'react'
import { pure } from 'recompose'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'

import { removeAuthor } from '../../../redux/actions'
import { AppState, AuthorListProps } from '../../../types'
import useAuthors from '../../../hooks/useAuthors'

import './AuthorList.scss'


const AuthorList = ({filteredAuthors} : AuthorListProps) => {
  const dispatch = useDispatch()
  console.log(filteredAuthors)

  const handleDeleteAuthor = (author:any) => {
    const url = `http://localhost:3000/api/v1/authors/${author._id}`
    console.log(author._id)
    axios({
      method: 'delete',
      url: url,
      // data: data
    });
    dispatch(removeAuthor(author))
  }
  return (
    <Table className="author-list" striped bordered hover size="sm">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          {/* <th>Edit</th> */}
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          filteredAuthors.map((author) => {
            return (
              <tr key={author.email}>
                <td>{author.firstName}</td>
                <td>{author.lastName}</td>
                <td>{author.email}</td>
                <td>
                  <Button
                    // disabled={added(name)}
                    onClick={() => {
                      handleDeleteAuthor(author)
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

export default pure(AuthorList)