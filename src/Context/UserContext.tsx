import {createContext,useState} from 'react'
import { User } from '../model/model';
export const UserDetails = createContext({})
function UserContext({children}) {
    const [user,setUser] = useState<User>()
  return (
   <UserDetails.Provider value={{user,setUser}}>
    {children}
   </UserDetails.Provider>
  )
}

export default UserContext
