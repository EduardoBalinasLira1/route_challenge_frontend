import React, { useEffect, useState } from "react"

const GeoCoding: React.FC<any> = ({
    lat,
    lng,
    info
}) => {
    const [originPlace, setOriginPlace] = useState<string>("")
    useEffect(() => {
        const searchPlace = async () => {
            const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=d777857679404c5e803e7a5950850838`)
            console.log(response);
            if(!response.ok) {
                return
            }
            const data = await response.json()
            console.log(data);
            setOriginPlace(data.features[0].properties.street)
        }
        searchPlace()
    },[])
    return(
        <span className="blockquote-footer">{info} {originPlace}</span>
    )
}

export default GeoCoding