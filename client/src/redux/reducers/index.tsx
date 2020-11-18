import { combineReducers } from 'redux'

import author from './author'
import book from './book'
// import user from './user'

const createRootReducer = () =>
  combineReducers({
    author,
    book,
    // user,
  })

export default createRootReducer
