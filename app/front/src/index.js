import React from 'react';
import { createRoot } from 'react-dom/client';
import { format, addDays } from 'date-fns';

import './styles.scss';

import { Timeline, WeeklyAverageTimeline } from './components/timeline'

function generateRandomDayValues(days) {
    const values = {};

    for (let i = 0; i < days; i++) {
        const date = format(addDays(new Date(), i), 'yyyyMMdd');

        values[date] = Math.floor(Math.random() * 5);
    }

    return values;
}

const values = generateRandomDayValues(365);

const container = document.getElementById('root'),
      root = createRoot(container),
      App = () => (
    <div>
        <div>
            <h1>Timeline</h1>
            <Timeline 
                values={values} />
            <br />
            <WeeklyAverageTimeline
                values={values} />
        </div>
    </div>
);

root.render(<App />);
