import {sql} from '@vercel/postgres';

function calculateTimeDifference(givenTimestamp: string): number {
    const now: Date = new Date();
    const givenDate: Date = new Date(givenTimestamp);
    now.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);
    const diffInMilliseconds: number = now.getTime() - givenDate.getTime();
    return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
}

async function fetchData(uuid: string) {
    const host = process.env.NODE_ENV === 'development' ? process.env.VERCEL_PROJECT_PRODUCTION_URL : `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    const url = `${host}/api/${uuid}?timestamp=${Date.now()}`;
    const data = await fetch(url).then((response) => response.json());
    return data?.last_updated;
}

async function createRecord(uuid: string) {
    const result = await sql`
        INSERT INTO incidents (uuid, last_updated)
        VALUES (${uuid}, NOW())
        RETURNING last_updated
    `;
    if (result.rowCount === 0) {
        throw new Error('Error creating counter record');
    }
    return result.rows[0];
}

export default async function CounterServer({uuid}: { uuid: string }) {
    let lastUpdate = 0;

    try {
        const resp = await fetchData(uuid);
        console.log('Data:', resp);
        if (!resp) {
            const newData = await createRecord(uuid);
            console.log('newData:', newData);
            lastUpdate = calculateTimeDifference(newData.last_updated);
        } else {
            lastUpdate = calculateTimeDifference(resp);
        }
    } catch (error) {
        console.error('Error handling counter data:', error);
        return (
            <div className='flex flex-col items-center gap-10 mt-10'>
                <h2 className="text-5xl">Something went wrong</h2>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center'>
            <h2 className="text-7xl text-violet-600 font-black">{lastUpdate} DAY{lastUpdate !== 1 && 'S'}</h2>
        </div>
    );
}
