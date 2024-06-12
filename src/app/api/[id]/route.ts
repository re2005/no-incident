import {sql} from "@vercel/postgres";

export async function GET(request: Request, {params}: any) {
    const incidents =
        await sql`select * from incidents where uuid = ${params.id}`;
    return Response.json(incidents.rows.length > 0 ? incidents.rows[0] : null);
}

async function updateToOlderDate(uuid: string, lastUpdated?: string) {
    const result = await sql`
        UPDATE incidents
        SET last_updated = ${lastUpdated ? lastUpdated : 'NOW()'}
        WHERE uuid = ${uuid}
        RETURNING last_updated
    `;
    if (result.rowCount === 0) {
        throw new Error('Error updating counter record');
    }
    return Response.json(result.rows[0]);
}

export async function POST(req: Request, {params}: any) {
    const {reset} = await req.json();

    try {
        // Check if a counter with the given uuid already exists
        const existingUuid = await sql`select * from incidents where uuid = ${params.id}`;

        // Use to simulate older date
        // const formattedDate = new Date('Wed Jun 12 2023 22:38:47').toISOString();

        if (existingUuid.rows.length > 0 && reset) {
            return await updateToOlderDate(params.id);
        } else {
            // If the counter doesn't exist, create it
            await sql`insert into incidents (uuid, last_updated) values (${params.id}, NOW())`;
        }

        // Fetch the updated/created counter
        const updatedCounter = await sql`select * from incidents where uuid = ${params.id}`;

        return Response.json(updatedCounter.rows[0]);
    } catch (error) {
        console.error('Error updating:', error);
        return Response.error();
    }
}

