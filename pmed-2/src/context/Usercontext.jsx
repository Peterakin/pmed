import { createContext, useContext, useState } from "react";

const UserContext = createContext()

 export const useUserContext = () =>{
    const context = useContext(UserContext)
    if(!context){
        throw newError("Context cannot be found in the child element")
    }
    return context
}

const UsercontextProvider = ({children}) => {
    const [userValue, setUserValue] = useState({})
    const [userExist, setUserExist] = useState(false)

    const updateUser = (user) =>{
        setUserValue(user)
        setUserExist(true)
    }

    const logout = () => {
        setUserValue({})
        setUserExist(false)
    }

  return (
    <UserContext.Provider value={{userValue, userExist, updateUser, logout}}>    
    {children}
    </UserContext.Provider>
  )
}

export default UsercontextProvider