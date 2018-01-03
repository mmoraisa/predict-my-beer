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
        percentage: 0.8
    }

    generate = () => {
        const { predict } = this.props
        const { interactions, peopleCount, percentage, drinkMin, drinkMax } = this.state

        predict(interactions,peopleCount,percentage,drinkMin,drinkMax)
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
        } = this.state

        const {
            beerConsumeAverage = 0,
            standardDeviation = 0,
            presentPeople = [],
            beerConsumeSeparetedInBlocks = []
        } = this.props

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

function mapStateToProps({ beerConsumeAverage, standardDeviation, presentPeople, beerConsumeSeparetedInBlocks }){
    return {
        beerConsumeAverage,
        standardDeviation,
        presentPeople,
        beerConsumeSeparetedInBlocks
    }
}

export default withRouter(connect(mapStateToProps, {
    predict
})(Home))