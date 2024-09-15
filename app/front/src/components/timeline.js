import React from 'react';

import { monthsNames,
         readableDate, 
         getWeekNo, 
         getMonth,
         getYear } from '../utils/dates';

import { getColor } from '../utils/colors';

export class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { values, start, rowsTitles, kind } = this.props;
        const nbValues = Object.keys(values[0]).length - 1;

        console.log(start, values[0]["date"], nbValues)

        return (
            <div className="timeline">
                <div className="rows-titles">
                    {rowsTitles.map((rowTitle, index) => (
                        <div key={rowTitle} className="row-title">
                            {index % 2 === 0 ? rowTitle : ''}
                        </div>
                    ))}
                </div>
                <div className={"values " + kind}>
                    {Array.from({ length: start - 1 }).map((_, index) => (
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
                                    title={dateValues["date"] + " : " + value}
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
