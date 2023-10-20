import { createContext, useContext, useLayoutEffect, useState } from "react";
import Oneboarding from "../components/Oneboarding";
import { hasOneboardingStorage, setOneboardingStorage } from "../storage/oneBoarding";




type OneboardingContextType = {
    hideOneboarding: () => void
}
export const OneboardingContext = createContext({} as OneboardingContextType)

type OneboardingProviderProps = {
    children: React.ReactNode
}

export default function OneboardingProvider({ children }: OneboardingProviderProps) {
    const [showOneboarding, setShowOneboarding] = useState(false)

    useLayoutEffect(() => {
        const hasOneboarding = hasOneboardingStorage()

        if (!hasOneboarding) {
            setShowOneboarding(true)
        }
    }, [])

    const hideOneboarding = () => {
        setShowOneboarding(false)
        setOneboardingStorage()
    }

    return (
        <OneboardingContext.Provider value={{ hideOneboarding }}>
            {showOneboarding ? <Oneboarding /> : children}
        </OneboardingContext.Provider>
    )
}

