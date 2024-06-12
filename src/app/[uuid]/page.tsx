import {validate} from 'uuid';
import CounterServer from "./CounterServer";
import ResetServer from "@/app/[uuid]/ResetServer";

export default function CounterPage({params}: { params: { uuid: string } }) {
    const currentUuid = params.uuid || '';

    let isValid = false;
    if (typeof window === 'undefined') {
        // This code runs only on the server
        if (currentUuid) {
            isValid = validate(currentUuid);
            if (!isValid) {
                console.error('Invalid UUID:', currentUuid);
            }
        }
    }

    return (
        <div className="flex justify-center p-10">
            {
                isValid
                    ?
                    <div className='flex flex-col gap-10'>
                        <CounterServer uuid={currentUuid as string}/>
                        <ResetServer uuid={currentUuid as string}/>
                    </div>
                    :
                    <div>Invalid UUID</div>
            }
        </div>
    );
}
