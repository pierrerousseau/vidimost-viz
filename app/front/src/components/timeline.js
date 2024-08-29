import React from 'react';

import { daysNames,
         monthsNames,
         readableDate, 
         getDay, 
         getWeekNo, 
         getMonth,
         getYear } from '../utils/dates'

export class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    toHex(value) {
        return value.toString(16).padStart(2, "0");
    }

    adjust(component, value) {
        return Math.min(255, component + value * 20);
    }

    getColor(value, index = 0) {
        const baseColors = [
            {"r": 128, "g": 0,   "b": 0},
            {"r": 0,   "g": 128, "b": 0},
            {"r": 0,   "g": 0,   "b": 128},
        ]
        const baseValue = Math.floor(value);
        const color     = baseColors[index % baseColors.length];

        let red   = this.adjust(color.r, baseValue);
        let green = this.adjust(color.g, baseValue);
        let blue  = this.adjust(color.b, baseValue);

        let rgb = "#ebedf0";

        if (!!value) {
            rgb = `#${this.toHex(red)}${this.toHex(green)}${this.toHex(blue)}`;
        }

        return rgb;
    }

    render() {
        const { values } = this.props;
        const entries    = Object.entries(values);
        const daysOfWeek = daysNames;
        const startDay   = getDay(entries[0][0]);

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
                        <div key={`empty-${index}`} className="empty" />
                    ))}
                    {entries.map(([date, dateValues]) => (
                        <div className="date-values">
                            {dateValues.map((value, index) => (
                                <div 
                                    key={"value-" + date + "-" + index} 
                                    className="value"
                                    title={readableDate(date) + " : " + value}
                                    style={{ backgroundColor: this.getColor(value, index) }}>
                                </div>
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
            const entry = entries[i];
            const date  = entry[0];
            const value = entry[1];
            const week  = "" + getYear(date) + "." + getWeekNo(date);

            if (!weeklyAverages[week]) {
                weeklyAverages[week] = {
                    total: 0,
                    count: 0,
                    average: 0
                };
            }

            weeklyAverages[week].total += value
            weeklyAverages[week].count += 1;
        }

        Object.keys(weeklyAverages).forEach(week => {
            weeklyAverages[week].average = 
                (weeklyAverages[week].total / weeklyAverages[week].count);
        });

        return weeklyAverages;
    }

    getColor(averageValue) {
        if (averageValue == 0) return '#ebedf0';
        if (averageValue <= 2) return '#c6e48b';
        if (averageValue <= 3) return '#7bc96f';
        if (averageValue <= 4) return '#239a3b';
        return '#196127';
    }

    render() {
        const { values } = this.props;
        const weeks      = ["1", "2", "3", "4"];
        const averages   = this.calculateWeeklyAverages(values);
        const entries    = Object.entries(averages);
        const nbWeeks    = 52;

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
                        <div key={`empty-${index}`} className="empty" />
                    ))}
                    {entries.map(([week, average]) => (
                        <div 
                            key={"week-" + week} 
                            className="week-average"
                            title={week + " : " + average.average}
                            style={{ backgroundColor: this.getColor(average.average) }}>
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
            const entry = entries[i];
            const date  = entry[0];
            const value = entry[1];
            const month = "" + getYear(date) + "." + getMonth(date);

            if (!monthlyAverages[month]) {
                monthlyAverages[month] = {
                    total: 0,
                    count: 0,
                    average: 0
                };
            }

            monthlyAverages[month].total += value
            monthlyAverages[month].count += 1;
        }

        Object.keys(monthlyAverages).forEach(month => {
            monthlyAverages[month].average = 
                (monthlyAverages[month].total / monthlyAverages[month].count);
        });

        return monthlyAverages;
    }

    getColor(averageValue) {
        if (averageValue == 0) return '#ebedf0';
        if (averageValue <= 2) return '#c6e48b';
        if (averageValue <= 3) return '#7bc96f';
        if (averageValue <= 4) return '#239a3b';
        return '#196127';
    }

    render() {
        const { values } = this.props;
        const months     = monthsNames;
        const averages   = this.calculateMonthlyAverages(values);
        const entries    = Object.entries(averages);
        const startMonth = getMonth(Object.keys(values)[0]) - 1;

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
                        <div key={`empty-${index}`} className="empty" />
                    ))}
                    {entries.map(([month, average]) => (
                        <div 
                            key={"month-" + month} 
                            className="month-average"
                            title={month + " : " + average.average}
                            style={{ backgroundColor: this.getColor(average.average) }}>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}