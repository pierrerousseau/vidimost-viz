import React from 'react';
import { getWeek } from 'date-fns';

import { toDate, readableDate, getDay } from '../utils/dates'

export class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    getColor(value) {
        if (value == 0) return '#ebedf0';
        if (value <= 2) return '#9be9a8';
        if (value <= 3) return '#40c463';
        if (value <= 4) return '#30a14e';

        return '#216e39';
    }

    render() {
        const { values } = this.props;
        const entries    = Object.entries(values);
        const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
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
                    {entries.map(([date, value]) => (
                        <div 
                            key={"value-" + date} 
                            className="value"
                            title={readableDate(date) + " : " + value}
                            style={{ backgroundColor: this.getColor(value) }}>
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
            const date  = toDate(entry[0]);
            const value = entry[1];
            const week  = "" + date.getFullYear() + "." + getWeek(date, {weekStartsOn: 1});

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

        console.log("averages", averages)

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