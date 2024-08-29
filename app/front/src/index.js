import React from 'react';
import { createRoot } from 'react-dom/client';
import { format, addDays } from 'date-fns';

import './styles.scss';

import { Timeline, 
         WeeklyAverageTimeline, 
         MonthlyAverageTimeline } from './components/timeline'

function generateRandomDayValues(days) {
    const values = {};

    for (let i = 0; i < days; i++) {
        const date = format(addDays(new Date(), i), 'yyyyMMdd');

        values[date] = Math.floor(Math.random() * 5);
    }

    return values;
}

function mergeValues(allValues) {
    const nbValues = allValues.length;
    let merged     = {};
    let setKeys    = new Set();

    for (const values of allValues) {
        Object.keys(values).forEach(key => setKeys.add(key));
    }

    for (const key of setKeys) {
        merged[key] = []
        for (let i = 0; i < nbValues; i++) {
            merged[key].push(allValues[i][key]);
        }
    }

    return merged;
}

const values1 = generateRandomDayValues(365);
const values2 = generateRandomDayValues(365);
const values3 = generateRandomDayValues(365);
const values  = mergeValues([values1, values2, values3]);

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
            <br />
            <MonthlyAverageTimeline
                values={values} />
        </div>
    </div>
);

root.render(<App />);
