import { useState, useEffect } from "react";
import axios from "axios";


const useFetch = (url) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const fetchData = async ()=> {
        setIsLoading(true)
        try {
            const response = await axios.get(url)
            setData(response.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    }, [])

    const reFetch = ()=> {
        setIsLoading(true)
        fetchData()
    }

    return {data, isLoading, error, reFetch}
}


export default useFetch