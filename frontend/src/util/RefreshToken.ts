import axios from "axios";


export const getNewAccessToken = async (username: string | null) => {
  //console.log(useContext(AuthContext));
  console.log("getRefreshToken called");
      // const username = "root";
      const response = await axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/refresh`, { username: username },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
  //console.log("response from getRefreshToken: ", response);
      return response.data.accessToken;
};