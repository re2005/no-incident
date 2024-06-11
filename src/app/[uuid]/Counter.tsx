import {useEffect, useState} from 'react';

export default function Counter({uuid}: { uuid: string }) {
    const [amount, setAmount] = useState(0);

    async function increaseCounter(uuid: string) {
        const response = await fetch(`/api/${uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({count: 1}),
        });

        if (!response.ok) {
            throw new Error('Error increasing counter');
        }

        return await response.json();
    }

    useEffect(() => {
        const fetchUuid = async () => {
            try {
                console.log('fetching uuid:', uuid);
                const response = await fetch(`/api/${uuid}`);
                const data = await response.json();
                if (!data){
                    await handleIncrease();
                } else {
                    setAmount(data.count);
                }
            } catch (error) {
                console.error('Error fetching UUID:', error);
            }
        };

        fetchUuid();
    }, [uuid]);


    const handleIncrease = async () => {
        try {
            console.log('increasing counter:', uuid);
            const data = await increaseCounter(uuid);
            setAmount(data.count);
        } catch (error) {
            console.error('Error increasing counter:', error);
        }
    };

    return (
        <div className='flex flex-col items-center gap-10 mt-10'>
            <h2 className="text-5xl text-pink-600">{amount} DAYS</h2>
            <button onClick={handleIncrease}>Increase counter</button>
        </div>
    );
}
