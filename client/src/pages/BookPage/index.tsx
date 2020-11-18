import React, { useState } from 'react'

import NavBar from '../../components/NavBar'
import AddBookForm from '../../components/book/AddBookForm'
import BookList from '../../components/book/BookList'
import SearchBook from '../../components/book/SearchBook'
import './BookPage.scss'
import useBooks from '../../hooks/useBooks'
import { useSelector } from 'react-redux'
import { AppState, Book } from '../../types'

const BookPage = () => {

  const [books, error] = useBooks()
  const myBooks = useSelector((state: AppState) => state.book.allBooks)
  
  const [keyword, setKeyword] = useState('')
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    console.log(inputText)
    setKeyword(inputText)
  }

  const filtered = myBooks.filter((book: Book) => {
    if (keyword == null)
      return book
    else if (book.title.toLowerCase().includes(keyword.toLowerCase())) {
      return book
    }
  })
  return (
    <div className="book-page">
      <NavBar />
      <div className="book-container">
        <div className="book-page__book-form-container">
          <AddBookForm />
        </div>
        <div className="book-page__book-list-container">
          <SearchBook
          handleSearch= {handleSearch}
          />
          <BookList
          filteredBooks = {filtered}
          />
        </div>
      </div>
    </div>
  )
}

export default BookPage