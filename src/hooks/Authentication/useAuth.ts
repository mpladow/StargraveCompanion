import { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useRealm must be used within the RealmProvider');        
    }
    return context;
}