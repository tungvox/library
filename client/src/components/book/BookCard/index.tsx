import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Card, Image, Button } from 'semantic-ui-react'
import { BookCardProps } from '../../../types'
import './BookCard.scss'

const BookCard = ({book}: BookCardProps) => {
  return (
    <div>
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{book.title}</Card.Header>
          <Card.Meta>{book.ISBN}</Card.Meta>
          <Card.Description>
            {book.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Borrow
          </Button>
            {/* <Button basic color='red'>
              Decline
          </Button> */}
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default BookCard