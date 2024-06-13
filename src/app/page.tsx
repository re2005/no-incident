"use client"

import { useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import {useRouter} from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let currentUuid = localStorage.getItem('UUID');
            if (!currentUuid) {
                const newUuid = uuidv4();
                localStorage.setItem('UUID', newUuid);
                currentUuid = newUuid;
            }
            router.push(`/${currentUuid}`);
        }
    }, [router]);

    return (
        <></>
    );
}
