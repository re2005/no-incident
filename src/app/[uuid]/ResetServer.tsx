"use client";

import {Button} from "@nextui-org/react";

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
            <Button onClick={() => resetCounter(uuid)}
                    size={'sm'}
                    variant={'bordered'}
                    color={'secondary'}>
                Reset to today
            </Button>
        </div>
    );
}
