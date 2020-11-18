import React, { useState } from 'react'
import { pure } from 'recompose'

import { AppState, SearchAuthorProps } from '../../../types'
import './SearchAuthor.scss'

const SearchAuthor = ({handleSearch}: SearchAuthorProps) => {
  return (
    <div className="search-bar">
      <input
        id="my-input"
        type="text"
        onChange={(e) => handleSearch(e)}
        placeholder="Search by name..."
      />
    </div>
  )
}

export default pure(SearchAuthor)