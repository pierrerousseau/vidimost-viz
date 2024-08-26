import React from 'react';
import { format, addDays, parse } from 'date-fns';

export class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contributions: this.generateRandomContributions(),
        };
    }

    generateRandomContributions() {
        const { days } = this.props;
        const contributions = {};
        for (let i = 0; i < days; i++) {
            const date = format(addDays(new Date(), i), 'yyyyMMdd');
            contributions[date] = Math.floor(Math.random() * 5);
        }
        return contributions;
    }

    getColor(contributionCount) {
        if (contributionCount === 0) return '#ebedf0';
        if (contributionCount < 2) return '#9be9a8';
        if (contributionCount < 3) return '#40c463';
        if (contributionCount < 4) return '#30a14e';

        return '#216e39';
    }

    toDate(date) {
        return parse(date, 'yyyyMMdd', new Date());
    }

    readableDate(date) {
        return format(this.toDate(date), 'dd/MM/yyyy');
    }

    getDay(date) {
        return this.toDate(date).getDay() - 1;
    }

    render() {
        const { days } = this.props;
        const { contributions } = this.state;
        const entries = Object.entries(contributions);
        const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        const startDay = this.getDay(entries[0][0]);

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
                            key={date} 
                            className="value"
                            title={this.readableDate(date) + " : " + value}
                            style={{ backgroundColor: this.getColor(value) }}>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}