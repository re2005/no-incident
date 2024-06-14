import {sql} from '@vercel/postgres';

function calculateTimeDifference(givenTimestamp: string): number {
    const now: Date = new Date();
    console.log('now', now);
    console.log('givenTimestamp', givenTimestamp);
    const givenDate: Date = new Date(givenTimestamp);
    now.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);
    const diffInMilliseconds: number = now.getTime() - givenDate.getTime();
    return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
}

async function fetchData(uuid: string) {
    const result = await sql`SELECT last_updated FROM incidents WHERE uuid = ${uuid}`;
    if (result.rowCount === 0) {
        return null;
    }
    return result.rows[0];
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
        const data = await fetchData(uuid);
        if (!data) {
            const newData = await createRecord(uuid);
            console.log('data', newData);
            lastUpdate = calculateTimeDifference(newData.last_updated);
        } else {
            console.log('data', data);
            lastUpdate = calculateTimeDifference(data.last_updated);
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
            <h2 className="text-7xl text-violet-600 font-black">{lastUpdate} DAY{lastUpdate > 1 && 'S'}</h2>
        </div>
    );
}
