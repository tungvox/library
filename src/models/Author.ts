import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
}

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
