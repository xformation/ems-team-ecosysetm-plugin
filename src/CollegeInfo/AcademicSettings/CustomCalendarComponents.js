import * as React from 'react';

import mImage from '../../_static/img/uicon_m.png';
import wImage from '../../_static/img/uicon_w.png';
export function EventUI({ event }) {
    return (
        <div className="calendar-event-container">
            <div>
                <div className="image-container">
                    {
                        event.sex === "MALE" &&
                        <img src={event.img || mImage} />
                    }
                    {
                        event.sex === "FEMALE" &&
                        <img src={event.img || wImage} />
                    }
                </div>
                <div className="text-container">
                    <strong>{event.subject}</strong>
                </div>
            </div>
        </div>
    )
}
