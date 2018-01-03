import React, { Component } from "react"
import BarChart from './BarChart'

import { predictFromBackend, predictFromFrontend } from '../actions/predictActions'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './Home.css'

class Home extends Component{

    state = {
        interactions: 3000,
        drinkMin: 400,
        drinkMax: 800,
        peopleCount: 10,
        percentage: 80,
        fetchType: 'F'
    }

    generate = () => {
        const { predictFromBackend, predictFromFrontend } = this.props
        const { interactions, peopleCount, percentage, drinkMin, drinkMax, fetchType } = this.state

        if(fetchType === 'F'){
            predictFromFrontend(interactions,peopleCount,percentage,drinkMin,drinkMax)
        } else{
            predictFromBackend(interactions,peopleCount,percentage,drinkMin,drinkMax)
        }
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
        intVal = Number.isNaN(intVal) ? 0 : intVal
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

    handleFetchTypeChange = evt => {
        this.setState({
            fetchType: evt.target.value
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
            fetchType
        } = this.state

        const {
            beerConsumeAverage = 0,
            standardDeviation = 0,
            presentPeople = [],
            beerConsumeSeparatedInBlocks = []
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
                            <input type="text" onChange={this.handleOnChangePercentage} value={percentage}/>
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
                    <div className="fetch-types">
                        <label>Calulating by:</label>
                        <label>
                            <input name="fetch_type" value="B" type="radio" onChange={this.handleFetchTypeChange} checked={fetchType === 'B'}/> Backend with Python and Numpy library
                        </label>
                        <label>
                            <input name="fetch_type" value="F" type="radio" onChange={this.handleFetchTypeChange} checked={fetchType === 'F'}/> Frontend with Probability Distribution library
                        </label>
                    </div>
                    <button onClick={this.generate}><i className="fa fa-refresh"></i>Update</button>
                </div>
                <div className="output-data">
                    <BarChart data={presentPeople} showYAxis={true}/>
                    <BarChart data={beerConsumeSeparatedInBlocks}/>
                </div>
                <div className="output-extra-info">
                    <label>Average<br/>{ parseFloat(beerConsumeAverage.toFixed(2)) }</label>
                    <label>Standard Deviation<br/>{ parseFloat(standardDeviation.toFixed(2)) }</label>
                </div>
            </div>
        )
    }

}

function mapStateToProps({ beerConsumeAverage, standardDeviation, presentPeople, beerConsumeSeparatedInBlocks }){
    return {
        beerConsumeAverage,
        standardDeviation,
        presentPeople,
        beerConsumeSeparatedInBlocks
    }
}

export default withRouter(connect(mapStateToProps, {
    predictFromBackend,
    predictFromFrontend
})(Home))