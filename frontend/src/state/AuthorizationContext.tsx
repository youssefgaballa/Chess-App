import { createContext, useContext, useState } from "react";

export interface AuthContextType {
  userAuth: {username: string, role: string, accessToken: string};
  setUserAuth: React.Dispatch<React.SetStateAction<{username: string, role: string, accessToken: string}>>;
}

const AuthContext = createContext<AuthContextType | null>(null);
export default AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userAuth, setUserAuth] = useState({username:"", role:"", accessToken:""});

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
// export default useAuth;