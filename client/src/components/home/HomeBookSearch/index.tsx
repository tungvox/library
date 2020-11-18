import React, { useState } from 'react'
import { pure } from 'recompose'

import { AppState, SearchBookProps } from '../../../types'
import './HomeBookSearch.scss'

const HomeBookSearch = ({handleSearch}: SearchBookProps) => {
  return (
    <div className="search-bar">
      <input
        id="my-input"
        type="text"
        onChange={(e) => handleSearch(e)}
        placeholder="Search by title..."
      />
    </div>
  )
}

export default pure(HomeBookSearch)