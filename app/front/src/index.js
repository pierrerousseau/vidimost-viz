import React from 'react';
import { createRoot } from 'react-dom/client';
import { parse, getISOWeek, format, addDays } from 'date-fns';

import './styles.scss';

import { getDay, 
         getWeekNo, 
         getMonth, 
         daysNames,
         weeksNames,
         monthsNames} from './utils/dates';

import { Timeline } from './components/timeline'
import { LineChartComponent } from './components/chart'

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
    let merged     = [];
    let setKeys    = new Set();

    for (const values of allValues) {
        Object.keys(values).forEach(key => setKeys.add(key));
    }

    for (const key of setKeys) {
        let value = {"date": key}
        for (let i = 0; i < nbValues; i++) {
            const subKey = "value_" + i;
            value[subKey] = allValues[i][key];
        }
        merged.push(value);
    }

    return merged;
}

function calculateWeeklyAverages(data) {
    const weeklyData     = {};
    const weeklyAverages = {};

    Object.entries(data).forEach(([dateString, value]) => {
        const date       = parse(dateString, 'yyyyMMdd', new Date());
        const weekNumber = getISOWeek(date);
        const year       = format(date, 'yyyy');
        const weekKey    = `${year}-W${String(weekNumber).padStart(2, '0')}`;

        if (!weeklyData[weekKey]) {
            weeklyData[weekKey] = { total: 0, count: 0 };
        }
        weeklyData[weekKey].total += value;
        weeklyData[weekKey].count += 1;
    });

    Object.entries(weeklyData).forEach(([weekKey, { total, count }]) => {
        weeklyAverages[weekKey] = total / count;
    });

    return weeklyAverages;
}

function calculateMonthlyAverages(data) {
    const monthlyData     = {};
    const monthlyAverages = {};

    Object.entries(data).forEach(([dateString, value]) => {
        const date     = parse(dateString, 'yyyyMMdd', new Date());
        const monthKey = format(date, 'yyyy-MM');

        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { total: 0, count: 0 };
        }

        monthlyData[monthKey].total += value;
        monthlyData[monthKey].count += 1;
    });

    Object.entries(monthlyData).forEach(([monthKey, { total, count }]) => {
        monthlyAverages[monthKey] = total / count;
    });

    return monthlyAverages;
}

const dayValues1 = generateRandomDayValues(365);
const dayValues2 = generateRandomDayValues(365);
const dayValues3 = generateRandomDayValues(365);
const dayValues  = mergeValues([dayValues1, dayValues2, dayValues3]);

const weekValues1 = calculateWeeklyAverages(dayValues1);
const weekValues2 = calculateWeeklyAverages(dayValues2);
const weekValues3 = calculateWeeklyAverages(dayValues3);
const weekValues  = mergeValues([weekValues1, weekValues2, weekValues3]);

const monthValues1 = calculateMonthlyAverages(dayValues1);
const monthValues2 = calculateMonthlyAverages(dayValues2);
const monthValues3 = calculateMonthlyAverages(dayValues3);
const monthValues  = mergeValues([monthValues1, monthValues2, monthValues3]);

const firstDate = dayValues[0]["date"];

const container = document.getElementById('root'),
      root = createRoot(container),
      App = () => (
    <div>
        <div>
            <h1>Timeline</h1>
            <Timeline 
                kind="days"
                values={dayValues} 
                rowsTitles={daysNames}
                start={getDay(firstDate) + 1} />
            <br />
            <LineChartComponent data={dayValues} />
            <hr />
            <Timeline 
                kind="weeks"
                values={weekValues} 
                rowsTitles={weeksNames}
                start={getWeekNo(firstDate)} />
            <br />
            <LineChartComponent data={weekValues} />
            <hr />
            <Timeline 
                kind="months"
                values={monthValues} 
                rowsTitles={monthsNames}
                start={getMonth(firstDate)} />
            <br />
            <LineChartComponent data={monthValues} />
        </div>
    </div>
);

root.render(<App />);
