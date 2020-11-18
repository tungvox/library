import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import thunk from 'redux-thunk'
import throttle from 'lodash.throttle'

import { AppState } from '../types/index'
import createRootReducer from './reducers'
import useAuthors from '../hooks/useAuthors'
// import rootSaga from './sagas'
// import { loadState, saveState } from '../localStorage'

//load localStorage item
// const persistedState = loadState() ? loadState().country.inCart : []
// console.log(persistedState)

const initState: AppState = {
  // product: {
  //   inCart: [],
  // },
  // country: {
  //   inCart: persistedState,
  // },
  // ui: {
  //   dialogOpen: {},
  // },
  book: {
    allBooks: [],
    inCart: []
  },
  author: {
    allAuthors: []
  }
}

export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, thunk]
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  // save state to localStorage
  // store.subscribe(
  //   throttle(() => {
  //     saveState({
  //       book: {
  //         inCart: store.getState().book.inCart,
  //       },
  //     })
  //   }, 1000)
  // )

  // sagaMiddleware.run(rootSaga)

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
