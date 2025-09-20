import { useEffect, useRef, useCallback } from 'react';
import { AppState } from 'react-native';

const useTimeTracker = () => {
    const timeRef = useRef(0);
    const timeIntervalRef = useRef(null);
    const appStateRef = useRef(AppState.currentState);

    useEffect(() => {
        const setupInterval = () => {
            timeIntervalRef.current = setInterval(() => {
                timeRef.current += 1;
            }, 1000);
        };

        const clearTrackingInterval = () => {
            if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
            }
        };

        // Start tracking when the component mounts
        setupInterval();

        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active' && appStateRef.current !== 'active') {
                // App moved to foreground
                setupInterval();
            } else if (nextAppState !== 'active' && appStateRef.current === 'active') {
                // App moved to background
                clearTrackingInterval();
            }
            appStateRef.current = nextAppState;
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            // Cleanup on unmount
            clearTrackingInterval();
            subscription.remove();
        };
    }, []);

    const getFinalElapsedTime = useCallback(() => {
        return timeRef.current;
    }, []);

    return { getFinalElapsedTime };
};

export default useTimeTracker;
