import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../lib/axios'
import useAuth from '../hooks/useAuth'

function DeletePost () {
  const { auth } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const confirmed = window.confirm("Are you sure you want to delete this post?")
    if(confirmed) {
        axios.delete(`/posts/${id}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
              'Content-Type': 'application/json'
            }
          }
        )
        .then(response => {
          if (response.status === 200) {
            console.log('successful delete')
            navigate('/admin/posts')
          }
          else{
            throw new Error('Failed to delete post')
          }
        })
        .catch(err => {
          if (!err?.response) {
            setErrMsg('No Server Response')
          } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password')
          } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized')
          } else {
            setErrMsg('Delete Failed')
          }
        })
    } else {
        console.log("Deletion cancelled");
        navigate("/admin/posts");
      }
  }, [id, auth.token, navigate])
  
  return null;
}

export default DeletePost
