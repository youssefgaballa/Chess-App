import { useContext,  } from "react";
import axios from "axios";
import { type AuthContextType } from "../state/AuthorizationContext";


export const getRefreshToken = async (userAuth: {username: string, role: string, accessToken: string}) => {
      //console.log(useContext(AuthContext));
       const username = userAuth?.username;
      // const username = "root";
      const response = await axios.post('http://localhost:5000/refresh', { username: username },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
      return response.data.refreshToken;
};