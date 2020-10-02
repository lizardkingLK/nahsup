import React from 'react';
import { Card } from '@material-ui/core';

function BarGroup(props) {
    let barPadding = 5
    let barColour = '#5675ff'
    let widthScale = d => d * 30

    let width = widthScale(props.d.value)
    let yMid = props.barHeight * 0.5

    return <g className="bar-group">
        <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
        <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
        <text className="value-label" x={(width === 0) ? width + 8 : width - 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
    </g>
}

export default function BarChart({ data }) {
    let barHeight = 30

    let barGroups = data.map((d, i) => <g key={Math.random()} transform={`translate(0, ${i * barHeight})`}>
        <BarGroup d={d} barHeight={barHeight} />
    </g>)

    return (
        <Card variant="outlined" style={{ padding: 30, backgroundColor: 'transparent' }}>
            <svg width="900" height="300" >
                <g className="container">
                    <text className="title" x="10" y="30">In inserted order</text>
                    <g className="chart" transform="translate(100,60)">
                        {barGroups}
                    </g>
                </g>
            </svg>
        </Card>
    )
}