import React from 'react';

import { daysNames,
         monthsNames,
         readableDate, 
         getDay, 
         getWeekNo, 
         getMonth,
         getYear } from '../utils/dates';

import { getColor } from '../utils/colors';

export class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { values } = this.props;
        const daysOfWeek = daysNames;
        const startDay   = getDay(values[0]["date"]);
        const nbValues   = Object.keys(values[0]).length - 1;

        console.log(startDay, values[0]["date"], nbValues)

        return (
            <div className="timeline">
                <div className="days">
                    {daysOfWeek.map((day, index) => (
                        <div key={day} className="day">
                            {index % 2 === 0 ? day : ''}
                        </div>
                    ))}
                </div>
                <div className="values">
                    {Array.from({ length: startDay }).map((_, index) => (
                        <div className="date-values" key={"date-values-" + index}>
                            {Array.from({ length: nbValues }).map((_, index) => (
                                <div key={`empty-${index}`} className="empty" />
                            ))}
                        </div>
                    ))}
                    {values.map((dateValues, index) => (
                        <div className="date-values" key={"date-values-" + dateValues["date"]}>
                            {Object.entries(dateValues).map(([key, value], index) => (
                                key !== "date" ? <div 
                                    key={"value-" + dateValues["date"] + "-" + index} 
                                    className="value"
                                    title={readableDate(dateValues["date"]) + " : " + value}
                                    style={{ backgroundColor: getColor(value, index) }}>
                                </div> : ""
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export class WeeklyAverageTimeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weeklyAverages: {}
        };
    }

    calculateWeeklyAverages() {
        let weeklyAverages = {};
        const { values }   = this.props;
        const entries      = Object.entries(values);
        
        for (let i = 0; i < entries.length; i++) {
            const entry    = entries[i];
            const date     = entry[0];
            const values   = entry[1];
            const nbValues = values.length;
            const week     = "" + getYear(date) + "." + getWeekNo(date);

            if (!weeklyAverages[week]) {
                weeklyAverages[week] = {
                    total: Array(nbValues).fill(0),
                    count: Array(nbValues).fill(0),
                    average: Array(nbValues).fill(0) 
                };
            }

            for (let i = 0; i < nbValues; i++) {
                weeklyAverages[week].total[i] += values[i];
                weeklyAverages[week].count[i] += 1;
            }
        }

        Object.keys(weeklyAverages).forEach(week => {
            const nbValues = weeklyAverages[week].average.length;
            for (let i = 0; i < nbValues; i++) {
                weeklyAverages[week].average[i] = 
                    (weeklyAverages[week].total[i] / weeklyAverages[week].count[i]);
            }
        });

        return weeklyAverages;
    }

    render() {
        const { values } = this.props;
        const weeks      = ["1", "2", "3", "4"];
        const averages   = this.calculateWeeklyAverages(values);
        const entries    = Object.entries(averages);
        const nbWeeks    = 52;
        const nbValues   = entries[0][1].total.length;

        return (
            <div className="weeks-timeline">
                <div className="weeks">
                    {weeks.map((week, index) => (
                        <div key={week} className="week">
                            {index % 2 === 0 ? week : ''}
                        </div>
                    ))}
                </div>
                <div className="weeks-averages">
                    {Array.from({ length: nbWeeks }).map((_, index) => (
                        <div className="week-values" key={"week-values-" + index}>
                            {Array.from({ length: nbValues }).map((_, index) => (
                                <div key={`empty-${index}`} className="empty" />
                            ))}
                        </div>
                    ))}
                    {entries.map(([week, dateAverages]) => (
                        <div className="week-values" key={"week-values-" + week}>
                            {dateAverages.average.map((average, index) => (
                                <div 
                                    key={"week-" + week + "-" + index} 
                                    className="week-average"
                                    title={week + " : " + average}
                                    style={{ backgroundColor: getColor(average, index) }}>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}


export class MonthlyAverageTimeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            monthlyAverages: {}
        };
    }

    calculateMonthlyAverages() {
        let monthlyAverages = {};
        const { values }   = this.props;
        const entries      = Object.entries(values);
        
        for (let i = 0; i < entries.length; i++) {
            const entry    = entries[i];
            const date     = entry[0];
            const values   = entry[1];
            const nbValues = values.length;
            const month    = "" + getYear(date) + "." + getMonth(date);

            if (!monthlyAverages[month]) {
                monthlyAverages[month] = {
                    total: Array(nbValues).fill(0),
                    count: Array(nbValues).fill(0),
                    average: Array(nbValues).fill(0) 
                };
            }

            for (let i = 0; i < nbValues; i++) {
                monthlyAverages[month].total[i] += values[i];
                monthlyAverages[month].count[i] += 1;
            }
        }

        Object.keys(monthlyAverages).forEach(month => {
            const nbValues = monthlyAverages[month].average.length;
            for (let i = 0; i < nbValues; i++) {
                monthlyAverages[month].average[i] = 
                    (monthlyAverages[month].total[i] / monthlyAverages[month].count[i]);
            }
        });

        return monthlyAverages;
    }

    render() {
        const { values } = this.props;
        const months     = monthsNames;
        const averages   = this.calculateMonthlyAverages(values);
        const entries    = Object.entries(averages);
        const startMonth = getMonth(Object.keys(values)[0]) - 1;
        const nbValues   = entries[0][1].total.length;

        return (
            <div className="months-timeline">
                <div className="months">
                    {months.map((month, index) => (
                        <div key={month} className="month">
                            {index % 2 === 0 ? month : ''}
                        </div>
                    ))}
                </div>
                <div className="months-averages">
                    {Array.from({ length: startMonth }).map((_, index) => (
                        <div className="month-values" key={"month-values-" + index}>
                            {Array.from({ length: nbValues }).map((_, index) => (
                                <div key={`empty-${index}`} className="empty" />
                            ))}
                        </div>
                    ))}
                    {entries.map(([month, dateAverages]) => (
                        <div className="month-values" key={"month-values-" + month}>
                            {dateAverages.average.map((average, index) => (
                                <div 
                                    key={"month-" + month + "-" + index} 
                                    className="month-average"
                                    title={month + " : " + average}
                                    style={{ backgroundColor: getColor(average, index) }}>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}