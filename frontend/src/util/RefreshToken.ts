import axios from "axios";


export const getNewAccessToken = async (userAuth: {username: string, role: string, accessToken: string}) => {
  //console.log(useContext(AuthContext));
  console.log("getRefreshToken called");
       const username = userAuth?.username;
      // const username = "root";
      const response = await axios.post('http://localhost:5000/refresh', { username: username },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
  //console.log("response from getRefreshToken: ", response);
      return response.data.accessToken;
};