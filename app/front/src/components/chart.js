import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { readableDate } from '../utils/dates';

import { getColor } from '../utils/colors';

export class LineChartComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, height } = this.props;

        const lines = Object.keys(Object.values(data)[0]);

        return (
            lines.length ? 
                <ResponsiveContainer height={height || 400}>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        {lines.map((line, index) => (
                            line !== "date" ?
                                <Line 
                                    key={"line-" + line + "-" + index}
                                    type="monotone"
                                    stroke={getColor(index, index)}
                                    dataKey={line} /> : ""

                        ))}
                    </LineChart>
                </ResponsiveContainer> : ""
        );
    }
};
