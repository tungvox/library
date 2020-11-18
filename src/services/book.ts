import Book, { BookDocument } from '../models/Book'

function create(book: BookDocument): Promise<BookDocument> {
  return book.save()
}

function findById(bookId: string): Promise<BookDocument> {
  return Book.findById(bookId)
    .exec()
    .then((book) => {
      if (!book) {
        throw new Error(`Book ${bookId} not found`)
      }
      return book
    })
}

function findAll(): Promise<BookDocument[]> {
  return Book.find().sort({ title: 1, publishedDate: -1 }).exec()
}

function update(
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument> {
  return Book.findById(bookId)
    .exec()
    .then((book) => {
      if (!book) {
        throw new Error(`Book ${bookId} not found`)
      }

      if (update.ISBN) {
        book.ISBN = update.ISBN
      }
      if (update.title) {
        book.title = update.title
      }
      if (update.description) {
        book.description = update.description
      }
      if (update.publisher) {
        book.publisher = update.publisher
      }
      if (update.authors) {
        book.authors = update.authors
      }
      if (update.status) {
        book.status = update.status
      }
      if (update.borrowerID) {
        book.borrowerID = update.borrowerID
      }
      if (update.publishedDate) {
        book.publishedDate = update.publishedDate
      }
      if (update.borrowDate) {
        book.borrowDate = update.borrowDate
      }
      if (update.returnDate) {
        book.returnDate = update.returnDate
      }

      // Add more fields here if needed
      return book.save()
    })
}

function deleteBook(bookId: string): Promise<BookDocument | null> {
  return Book.findByIdAndDelete(bookId).exec()
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteBook,
}
