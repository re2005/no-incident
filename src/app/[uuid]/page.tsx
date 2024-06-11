"use client"

import {useEffect, useState} from "react";
import {validate} from 'uuid';
import Counter from "./Counter";

export default function CounterPage({params}: { params: { uuid: string } }) {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const currentUuid = params.uuid || localStorage.getItem('UUID');
        if (!validate(currentUuid as string)) {
            console.error('Invalid UUID:', currentUuid);
        }
        setIsValid(validate(currentUuid as string));
    }, [params.uuid]);

    const currentUuid = params.uuid || localStorage.getItem('UUID');

    return (
        <div className="flex justify-center p-10">
            {isValid ? <Counter uuid={currentUuid as string}/> : <div>Invalid UUID</div>}
        </div>
    );
}
