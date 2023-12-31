import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";


export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentuser] = useState({})
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentuser(user)
            setLoading(false)
        })
    }, []);

    if (loading) {
        return
        <>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </>
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}