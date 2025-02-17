import { useEffect, useState } from 'react';
import axios from 'axios'

export default function RequestFormHelper(listingId) {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    console.log("in the Request form use effect...")
    axios.get(`${process.env.REACT_APP_DB_HOST}/requests/approved/${listingId}`, { withCredentials: true })
      .then(resp => {
        setRequests(resp.data)
      })
      .catch(error => console.log(error))

    return function cleanup() {
      console.log("all done");
    }
  }, [])


  return requests
}