import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllBooks } from '../redux/actions/book'
import { Book } from '../types/index'

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(fetchAllBooks())
      } catch (error) {
        console.log(error.name)
        setError(error)
      }  
    }
    loadData()
  }, [dispatch])
  return [books, error]
}

export default useBooks