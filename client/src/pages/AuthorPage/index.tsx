import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import AuthorList from '../../components/author/AuthorList'
import AddAuthorForm from '../../components/author/AddAuthorForm'
import NavBar from '../../components/NavBar'
import SearchAuthor from '../../components/author/SearchAuthor'
import useAuthor from '../../hooks/useAuthors'
import './AuthorPage.scss'
import { AppState, Author } from '../../types'
import useAuthors from '../../hooks/useAuthors'

const AuthorPage = () => {
  const [authors, error] = useAuthors()
  const myAuthors = useSelector((state: AppState) => state.author.allAuthors)
  
  // setAuthors(myAuthors)
  const [keyword, setKeyword] = useState('')
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    console.log(inputText)
    setKeyword(inputText)
  }

  const filtered = myAuthors.filter((author: Author) => {
    if (keyword == null)
      return author
    else if (author.firstName.toLowerCase().includes(keyword.toLowerCase()) || author.lastName.toLowerCase().includes(keyword.toLowerCase())) {
      return author
    }
  })

  return (
    <div className="author-page">
      <NavBar />
      <div className="author-container">
        <div className="author-page__author-form-container">
          <AddAuthorForm />
        </div>
        <div className="author-page__author-list-container">
          <SearchAuthor
            handleSearch={handleSearch}
          />
          <AuthorList
            filteredAuthors = {filtered}
          />
        </div>
      </div>
    </div>
  )
}

export default AuthorPage
