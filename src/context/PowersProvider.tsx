import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { BackgroundProps, PowerProps } from "../types/models";
import RealmContext from "./RealmContext";
const { useRealm, useQuery } = RealmContext;


interface PowersContextProps {
    powers: PowerProps[];
    storeCharacterPowers: PowerProps[];
    corePowers: PowerProps[];
    currentBackground: BackgroundProps;
    setBackgroundInContext: (background: BackgroundProps) => void;
    optionalPowers: PowerProps[];
}

// inits the context
export const PowersContext = createContext<PowersContextProps>(null as any as ReturnType<typeof usePowersContext>)

// hook to provide the context data
export const usePowersProvider = () => {

    const [powers, setPowers] = useState<PowerProps[]>([]);
    const [storeCharacterPowers, setStoreCharacterPowers] = useState<PowerProps[]>([])
    const [corePowers, setCorePowers] = useState<PowerProps[]>([])
    const [optionalPowers, setOptionalPowers] = useState<PowerProps[]>([])
    const [currentBackground, setCurrentBackground] = useState<BackgroundProps>()

    const realm = useRealm();

    useEffect(() => {
        console.log('powers from context');
        getPowers();
    }, [])

    // get core powers
    useEffect(() => {
        setCorePowers(filterPowersByBackground());
    }, [currentBackground])

    // get optional powers
    useEffect(() => {
        setOptionalPowers(filterPowersByNonBackground())
    }, [corePowers])

    const getPowers = () => {
        const _powers = realm.objects<PowerProps>('Power');
        if (!_powers.isEmpty()) setPowers(Array.from(_powers));
    }

    const setBackgroundInContext = (background: BackgroundProps) => {
        setCurrentBackground(background)
    }

    const filterPowersByBackground = () => {
        const filtered = powers.filter(x => {
            return currentBackground?.DefaultPowers.find(y => y == x.PowerId);
        })
        return filtered;

    }
    const filterPowersByNonBackground = () => {
        const filtered = powers.filter(x => {
            return !corePowers?.includes(x);
        })
        return filtered;
    }

    return {
        powers,
        storeCharacterPowers,
        corePowers,
        optionalPowers,
        currentBackground,
        setBackgroundInContext
    } as PowersContextProps
}

// simply returns the provider component
export const PowersProvider = ({ children }: { children: ReactNode }): ReactElement => {
    return <PowersContext.Provider value={usePowersProvider()}>
        {children}
    </PowersContext.Provider>
}

// hook
export const usePowersContext = (): PowersContextProps => useContext<PowersContextProps>(PowersContext);
