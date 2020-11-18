import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  ISBN: number;
  title: string;
  description: string;
  publisher: string;
  authors: string[];
  status: string;
  borrowerID: number;
  publishedDate: Date;
  borrowDate: Date;
  returnDate: Date;
}

const bookSchema = new mongoose.Schema({
  ISBN: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  authors: [{
    type: String,
    required: true,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    }
  }],
  status: {
    type: String,
    required: true,
  },
  borrowerID: {
    type: Number,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  borrowDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
