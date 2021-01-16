import React from 'react';
import ProgBar from '../Converter/ProgBar';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios';
import { fetchPlotSummary } from '../../store/actions';
const Plot = createPlotlyComponent(Plotly);

const Stats = (props) => {

    useEffect(() => dispatch(fetchPlotSummary()));
    const plotData = useSelector(state => state.reducer.plotSummary)
    const dispatch = useDispatch();

    return (
        <div style={{ height: 600, backgroundColor: '#212121' }}>
            <Plot
                data={[{
                    type: 'bar',
                    x: plotData.x,
                    y: plotData.y1,
                    name: 'open',
                },
                {
                    type: 'bar',
                    x: plotData.x,
                    y: plotData.y2,
                    name: 'high'
                },
                {
                    type: 'bar',
                    x: plotData.x,
                    y: plotData.y3,
                    name: 'low'
                },
                ]}
                selectorOptions={{
                    buttons: [{
                        step: 'month',
                        stepmode: 'backward',
                        count: 1,
                        label: '1m'
                    }, {
                        step: 'month',
                        stepmode: 'backward',
                        count: 6,
                        label: '6m'
                    }, {
                        step: 'year',
                        stepmode: 'todate',
                        count: 1,
                        label: 'YTD'
                    }, {
                        step: 'year',
                        stepmode: 'backward',
                        count: 1,
                        label: '1y'
                    }, {
                        step: 'all',
                    }],
                }}
                layout={{
                    fixedrange: true,
                    title: 'Chart with range time series',
                    plot_bgcolor: '#212121',
                    paper_bgcolor: '#212121',
                    titlefont: {
                        color: 'white'
                    },
                    font: {
                        color: 'white',
                        size: 15
                    },
                    xaxis: {
                        rangemode: true,
                        // rangeselector: selectorOptions,
                        rangeslider: {},
                    },
                    yaxis: {
                        // gridwidth: 1,
                        gridcolor: 'black',
                        fixedrange: true,
                    }
                }}
                config={{
                    mapboxAccessToken: "pk.eyJ1IjoicmExZGVyIiwiYSI6ImNram9mdXhhODFoMWsyeXMyenMyc2x1ZnEifQ.AAW0m9LcTLFbF81Mdl2dvA",
                    responsive: true
                }}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    );
}

export default Stats;