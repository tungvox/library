import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllAuthors } from '../redux/actions/author'
import { Author} from '../types/index'

const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([])
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(fetchAllAuthors())
      } catch (error) {
        console.log(error.name)
        setError(error)
      }  
    }
    loadData()
  }, [dispatch])
  return [authors, error]
}

export default useAuthors