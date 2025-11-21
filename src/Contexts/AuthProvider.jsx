import { createContext, useEffect, useState } from "react";
import {
  
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
 const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
      .finally(() => setLoading(false));
  };
  

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const deleteAccount = () => {
  if (!auth.currentUser) return Promise.reject("No user logged in");
  return deleteUser(auth.currentUser);
};
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = { user,setUser, loading, createUser, login, googleLogin, logOut,resetPassword,deleteAccount };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;