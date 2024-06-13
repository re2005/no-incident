import {validate} from 'uuid';
import CounterServer from "./CounterServer";
import ResetServer from "@/app/[uuid]/ResetServer";
import DatepickerServer from "@/app/[uuid]/DatepickerServer";
import QrCode from "@/app/[uuid]/QrCode";

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
                        <CounterServer uuid={currentUuid}/>
                        <div className='flex flex-col gap-5 items-center'>
                            <DatepickerServer uuid={currentUuid}/>
                            <ResetServer uuid={currentUuid}/>
                            <QrCode uuid={currentUuid} />
                        </div>
                    </div>
                    :
                    <div>Invalid UUID</div>
            }
        </div>
    );
}
