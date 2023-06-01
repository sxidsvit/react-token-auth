/* This code sets up the authentication context using React's context API. 
It provides the authentication token and the setToken function 
to child components through the context. 
It also ensures that the default authorization header in axios is updated 
with the authentication token whenever it changes.
*/

import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken_] = useState(localStorage.getItem('token'))

  // Create the setToken function to update the authentication token:
  const setToken = (newToken) => setToken_(newToken);


  // Use useEffect() to set the default authorization header in axios and stores the token value in the local storage using localStorage.setItem()


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
    }
  }, [token])

  // Create the memoized context value using useMemo()

  const contextValue = useMemo(() => ({ token, setToken, }), [token]);

  // Provide the authentication context to the child components

  return (
    <AuthContext.Provider value={contextValue} >
      {children}
    </AuthContext.Provider>
  )
}

// Export the useAuth hook for accessing the authentication context

export const useAuth = () => {
  return useContext(AuthContext)
};

// Export the AuthProvider component as the default export

export default AuthProvider;
