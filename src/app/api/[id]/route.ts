import {sql} from "@vercel/postgres";

export async function GET(request: Request, {params}: any) {
    const counters =
        await sql`select * from counters where uuid = ${params.id}`;
    return Response.json(counters.rows.length > 0 ? counters.rows[0] : null);
}

export async function POST(req: Request, {params}: any) {
    const {count} = await req.json();

    try {
        // Check if a counter with the given uuid already exists
        const existingCounter = await sql`select * from counters where uuid = ${params.id}`;

        if (existingCounter.rows.length > 0) {
            // If the counter exists, update it
            await sql`update counters set count = count + ${count} where uuid = ${params.id}`;
        } else {
            // If the counter doesn't exist, create it
            await sql`insert into counters (count, uuid) values (${count}, ${params.id})`;
        }

        // Fetch the updated/created counter
        const updatedCounter = await sql`select * from counters where uuid = ${params.id}`;

        return Response.json(updatedCounter.rows[0]);
    } catch (error) {
        console.error('Error updating counter:', error);
        return Response.error();
    }
}
