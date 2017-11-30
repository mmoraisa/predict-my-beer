import React, { Component } from "react"
import BarChart from './BarChart'

import { predict } from '../actions/predictActions'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './Home.css'

var PD = require("probability-distributions");

class Home extends Component{

    state = {
        interactions: 3000,
        drinkMin: 400,
        drinkMax: 800,
        peopleCount: 10,
        percentage: 0.8,
        presentPeople: [],
        beerConsumeSeparetedInBlocks: [],
        beerConsumeAverage: 0,
        standardDeviation: 0
    }

    generate = () => {

        const { predict } = this.props
        const { interactions, peopleCount, percentage, drinkMin, drinkMax } = this.state

        predict(interactions,peopleCount,percentage,drinkMin,drinkMax)

        
        //return this.monteCarlo(interactions,peopleCount,percentage,drinkMin,drinkMax)
    }

    monteCarlo = (interactions,peopleCount,percentage,drinkMin,drinkMax) => {
        const presentPeople = []
        
        const binomialDistribution = PD.rbinom(interactions, peopleCount, percentage)

        let len
        for(let i = 1; i <= interactions; i++){
            len = binomialDistribution.filter(_ => _ === i).length
            if(len > 0)
                presentPeople.push({ x: i, y: (len / interactions * 100) })
        }

        const beerConsume = []
        const uniformDistribution = PD.runif(interactions, drinkMin, drinkMax)
        
        let uniformValue;
        binomialDistribution.forEach((binomialValue,i) => {
            uniformValue = uniformDistribution[i];
            beerConsume[i] = binomialValue * uniformValue
        });

        const beerConsumeAverage = this.calculateAverage(beerConsume)
        const standardDeviation = this.calculateStdDeviation(beerConsume)

        const minValue = Math.round(this.getMinValue(beerConsume))
        const maxValue = Math.round(this.getMaxValue(beerConsume))
        
        const beerConsumeSeparetedInBlocks = [];

        const stepsCount = 15;
        const stepSize = (maxValue - minValue) / stepsCount;

        const calculateBlock = (beerConsume,minValue,maxValue,stepSize,i) => {
            const minValueInStep = minValue + stepSize * (i - 1)
            const maxValueInStep = minValue + stepSize * i
            const countInStep = beerConsume.filter(_ => _ >= minValueInStep && _ < maxValueInStep).length
            return { x: minValueInStep, y: countInStep }
        }

        for(let i = 1; i <= stepsCount; i++){
            beerConsumeSeparetedInBlocks.push(calculateBlock(beerConsume,minValue,maxValue,stepSize,i))
        }

        this.setState({
            presentPeople: presentPeople,
            beerConsumeSeparetedInBlocks: beerConsumeSeparetedInBlocks,
            beerConsumeAverage: beerConsumeAverage,
            standardDeviation: standardDeviation
        })
    }
    
    getMinValue = dataArray => {
        let minValue = dataArray[0]

        for(let val of dataArray)
            if(val < minValue)
                minValue = val
        
        return minValue
    }
    
    getMaxValue = dataArray => {
        let maxValue = dataArray[0]

        for(let val of dataArray)
            if(val > maxValue)
                maxValue = val
        
        return maxValue
    }

    calculateAverage = data => data.reduce((acc,val) => acc+val,0) / data.length

    calculateStdDeviation = data => {
        const avg = this.calculateAverage(data)
        return Math.sqrt(data.reduce((acc,val) => acc + Math.pow(val-avg,2),0) / data.length)
    }
    
    handleOnChangeInteractions = evt => {
        const intVal = parseInt(evt.target.value,10)
        this.setState({
            interactions: Number.isNaN(intVal) ? 1 : intVal
        })
    }

    handleOnChangePeopleCount = evt => {
        const intVal = parseInt(evt.target.value,10)
        this.setState({
            peopleCount: Number.isNaN(intVal) ? 0 : intVal
        })
    }
    
    handleOnChangePercentage = evt => {
        let intVal = parseInt(evt.target.value,10)
        intVal = Number.isNaN(intVal) ? 0 : intVal / 100
        this.setState({
            percentage: intVal > 100 ? 100 : intVal
        })
    }
    
    handleOnChangeDrinkMin = evt => {
        const intVal = parseInt(evt.target.value,10)
        this.setState({
            drinkMin: Number.isNaN(intVal) ? 0 : intVal
        })
    }
    
    handleOnChangeDrinkMax = evt => {
        const intVal = parseInt(evt.target.value,10)
        this.setState({
            drinkMax: Number.isNaN(intVal) ? 0 : intVal
        })
    }

    componentWillMount = () => {
        this.generate()
    }

    render () {
        const {
            interactions,
            peopleCount,
            percentage,
            drinkMin,
            drinkMax,
            beerConsumeSeparetedInBlocks,
            presentPeople,
            beerConsumeAverage,
            standardDeviation
        } = this.state

        return (
            <div className="home">
                <h1>Predict my beer</h1>
                <div className="input-data">
                    <div className="input-group">
                        <div>
                            <label>Interactions</label>
                            <input type="text" onChange={this.handleOnChangeInteractions} value={interactions}/>
                        </div>
                        <div>
                            <label>People Count</label>
                            <input type="text" onChange={this.handleOnChangePeopleCount} value={peopleCount}/>
                        </div>
                        <div>
                            <label>Attendance</label>
                            <input type="text" onChange={this.handleOnChangePercentage} value={percentage * 100}/>
                        </div>
                        <div>
                            <label>Drink Min. (ml)</label>
                            <input type="text" onChange={this.handleOnChangeDrinkMin} value={drinkMin}/>
                        </div>
                        <div>
                            <label>Drink Max. (ml)</label>
                            <input type="text" onChange={this.handleOnChangeDrinkMax} value={drinkMax}/>
                        </div>
                    </div>
                    <button onClick={this.generate}><i className="fa fa-refresh"></i>Update</button>
                </div>
                <div className="output-data">
                    <BarChart data={presentPeople} showYAxis={true}/>
                    <BarChart data={beerConsumeSeparetedInBlocks}/>
                </div>
                <div className="output-extra-info">
                    <label>Average<br/>{ parseFloat(beerConsumeAverage.toFixed(2)) }</label>
                    <label>Standard Deviation<br/>{ parseFloat(standardDeviation.toFixed(2)) }</label>
                </div>
            </div>
        )
    }

}

function mapStateToProps({ prediction }){
    return { prediction }
}

export default withRouter(connect(mapStateToProps, {
    predict
})(Home))