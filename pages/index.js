import { Calendar } from '../components/calendar'
import { TimePicker } from '../components/time-picker'

import { bookingAvailabilities } from '../data'

export default function Homepage({ selectedDay, setSelectedDay }) {
  return (
    <div className="mx-auto grid h-full max-w-lg grid-rows-[auto,1fr] gap-8 md:max-w-none">
      <div className="mt-10 px-4 sm:px-8 xl:px-10">
        <h1 className="text-2xl font-semibold">Select a date and time</h1>
      </div>
      <div className="grid min-h-0 md:grid-cols-[1fr,360px] md:divide-x xl:grid-cols-[1fr,360px]">
        <div>
          <Calendar
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            bookingAvailabilities={bookingAvailabilities}
          />
          <div className="p-4 sm:p-8 xl:p-10">
            <p>// TODO: Timezone picker</p>
          </div>
        </div>
        <div className="min-h-0">
          <TimePicker selectedDay={selectedDay} bookingAvailabilities={bookingAvailabilities} />
        </div>
      </div>
    </div>
  )
}
