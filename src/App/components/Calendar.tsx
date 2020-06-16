import React from 'react'

const Calendar = () => (
    <div>
        <iframe
            src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=bmc0aGgxa2pvOWkzdDVubmdzcXFyYzFvc2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23616161&amp;showTitle=0&amp;showTz=1&amp;mode=AGENDA&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0"
            style={{ borderWidth: 0, backgroundColor: 'transparent' }}
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
        />
    </div>
)

export default Calendar