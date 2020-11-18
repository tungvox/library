import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AuthorPage from './pages/AuthorPage'
import Home from './pages/Home'
import Book from './pages/BookPage'



const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route
      exact
      path="/"
      render={(props) => <Main {...props} countries={countries} />}
    />
    <Route
      exact
      path="/countries/:name"
      render={(props) => <Product {...props} countries={countries} />}
    /> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/author" component={AuthorPage} />
      <Route exact path="/book" component={Book}/>
    </Switch>
  </BrowserRouter>
)

export default Routes