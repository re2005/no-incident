"use client";

async function resetCounter(uuid: string) {
    const agree = await window.prompt('Are you sure you want to reset the counter? Type "yes" to confirm.');
    if (agree !== 'yes') return;

    try {
        const response = await fetch(`/api/${uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({reset: true}),
        });

        if (!response.ok) {
            console.log('Error resetting counter');
        }
        return await response.json();
    } catch (error) {
        console.error('Error resetting counter:', error);
    } finally {
        location.reload();

    }
}

export default function ResetServer({uuid}: { uuid: string }) {

    return (
        <div className='flex flex-col items-center'>
            <button className="text-md text-gray-800 bg-white rounded-md px-3 py-1"
                    onClick={() => resetCounter(uuid)}> reset
            </button>
        </div>
    );
}
