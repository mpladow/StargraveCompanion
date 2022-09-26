import { useContext } from "react"
import { RealmContext } from "../../context/RealmProvider"

export const useRealm = () => {
    const context = useContext(RealmContext);
    if (!context) {
        throw new Error('useRealm must be used within the RealmProvider');
    }
    return context;
}