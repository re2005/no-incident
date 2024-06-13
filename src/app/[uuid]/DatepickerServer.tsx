"use client";

import React, {useState} from "react";
import {DatePicker, DateValue} from "@nextui-org/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {I18nProvider} from "@react-aria/i18n";

export default function DatepickerServer({uuid}: { uuid: string }) {
    const userLocale = typeof window !== 'undefined' && window.navigator ? window.navigator.language : 'en-GB';
    const [selectedDate, setSelectedDate] = useState<DateValue>();

    function convertDateString(dateString: DateValue) {
        const date = dateString.toString();
        const jsDate = new Date(date);
        return jsDate.toISOString();
    }

    async function saveDate(uuid: string, date: string) {
        try {
            const response = await fetch(`/api/${uuid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({date}),
            });

            return await response.json();
        } catch (error) {
            console.error('Error setting new date:', error);
        } finally {
            location.reload();

        }
    }

    const handleDateChange = (newValue: DateValue) => {
        saveDate(uuid, convertDateString(newValue));
    };
    return (
        <div>
            <I18nProvider locale={userLocale}>
                <DatePicker
                    label="Select a date"
                    size="sm"
                    color="secondary"
                    labelPlacement="outside-left"
                    showMonthAndYearPickers
                    value={selectedDate}
                    onChange={handleDateChange}
                    hideTimeZone
                    granularity="day"
                    maxValue={today(getLocalTimeZone()).subtract({ days: 1 })}
                />
            </I18nProvider>
        </div>
    );
}
