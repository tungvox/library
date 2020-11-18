import {
  AuthorState,
  AuthorActions,
  ADD_AUTHOR,
  REMOVE_AUTHOR,
  FETCH_AUTHORS
} from '../../types/index'

export default function author(
  state: AuthorState = {
    allAuthors: [],
  },
  action: AuthorActions
): AuthorState {
  switch (action.type) {
  case ADD_AUTHOR: {
    const { author } = action.payload
    if (state.allAuthors.find((c) => c.email === author.email)) {
      return state
    }
    // Always return new state (e.g, new object) if changed
    return { ...state, allAuthors: [...state.allAuthors, author] }
  }

  case REMOVE_AUTHOR: {
    const { author } = action.payload
    const index = state.allAuthors.findIndex((c) => c._id === author._id)
    if (index >= 0) {
      state.allAuthors.splice(index, 1)
      return { ...state, allAuthors: [...state.allAuthors] }
    }
    return state
  }

  case FETCH_AUTHORS: {
    const { authors } = action.payload
      return { ...state, allAuthors: authors }
  }

  default:
    return state
  }
}