import React, { createContext, useContext, useState, useCallback } from 'react';
import { checkAndRequestPermissions } from '../Commons/Permission';

const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {

    const [permissionGranted,setPermissionGranted] = useState(false);

    const requestPermissions = useCallback(async ()=>{
        const granted = await checkAndRequestPermissions();
        setPermissionGranted(granted);
        return granted;
    },[]) 

    return (
        <PermissionContext.Provider value={{permissionGranted, setPermissionGranted}}>
            {children}
        </PermissionContext.Provider>
    )
}

export const usePermissions = () => useContext(PermissionContext);
