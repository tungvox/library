import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import BookCard from '../../components/book/BookCard'
import NavBar from '../../components/NavBar'
import useBooks from '../../hooks/useBooks'
import HomeBookSearch from '../../components/home/HomeBookSearch'
import { AppState, Book } from '../../types'
import './Home.scss'

const Home = () => {
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
    <div className="home">
      <NavBar />
      <HomeBookSearch
        handleSearch = {handleSearch}
      />
      <div className="home-book-container">
      {
        filtered.map((book)=>{
          return <BookCard 
                   key={book._id}
                   book = {book}
                 />
        })
      }
      </div>
      
    </div>
  )
}

export default Home