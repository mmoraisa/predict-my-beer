import React, { Component } from 'react'

import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, GradientDefs, HorizontalGridLines, VerticalGridLines, XAxis, YAxis } from 'react-vis';

class BarChart extends Component{
    render () {

        const gradient = (<GradientDefs>
            <linearGradient
                id="myGradient"
                gradientUnits="userSpaceOnUse"
                x1="0" y1="0" x2="200" y2="200">
                <stop offset="10%" stopColor="#c6e48b" />
                <stop offset="33%" stopColor="#7bc96f" />
                <stop offset="66%" stopColor="#239a3b" />
                <stop offset="90%" stopColor="#196127" />
            </linearGradient>
          </GradientDefs>);
        
        const { data, showXAxis = true, showYAxis = false } = this.props

        return (
            <div className="bar-chart">
                <XYPlot height={300} width={300}>
                    {gradient}
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    {showXAxis && (<XAxis />)}
                    {showYAxis && (<YAxis />)}
                    <VerticalBarSeries animation={'wobbly'} color={'url(#myGradient)'} data={data}/>
                </XYPlot>
            </div>
        )
    }
}

export default BarChart