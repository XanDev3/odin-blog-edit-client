import { Outlet } from 'react-router-dom';
import { userState, useEffect } from "react";
import useAuth from '../hooks/useAuth';
//import useRefreshToken from '../hooks/useRefreshToken';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    //const { refresh } = useRefreshToken()
    const { auth } = useAuth()


    useEffect(() => {
      const verifyToken = async () => {
        try {
            await //refresh()
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
      }
    
      !auth?.token ? verifyToken() : setIsLoading(false)
    }, [])

    useEffect(() => {
      console.log(`isLoading: ${isLoading}`)
      console.log(`token: ${JSON.stringify(auth?.token)}`)
    }, [isLoading])
    
    return(
        <>
        {isLoading
        ? <p>Loading...</p> 
        : <Outlet />
        }
        </>
    )
}
