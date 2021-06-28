import { useEffect, useState } from 'react';

    
const useGeolocation = () => {
    const [geolocation, setGeolocation] = useState({
        loaded: false,
        coordinates: { lat: '', long: '' }
    })

    const onSuccess = geolocation => {
        setGeolocation({
            loaded: true, coordinates: { 
                lat: geolocation.coordinates.latitude, 
                long: geolocation.coordinates.longitude}
        })
    }

    const onError = error => {
        setGeolocation({
            loaded: true, 
            error
        })
    
    }

    useEffect(() => {
        if (!('geolocation' in navigator)) { // if the browser doesn't support geolocation
            onError({code: 0, message: "Geolocation not supported"})
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, [])

    return geolocation
}

export default useGeolocation;