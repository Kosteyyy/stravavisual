import React, { useEffect, useState } from 'react';
import { getAddress } from './functions.js';

export default function Reset() {
    const [address, setAddress] = useState('address');
    let latlng = [55.84, 37.34];

    useEffect(() => {
        getAddress(latlng)
            .then((res) => {
                console.log("res: ", res);
                setAddress(res);
            });
        
    })
    return <div>{address}</div>
}