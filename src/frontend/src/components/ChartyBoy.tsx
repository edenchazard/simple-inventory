
import { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import {CategoryScale} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

import { fetchAPI } from "../functions";

ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title, annotationPlugin);

const chartDefaults ={
    labels: [],
    datasets: [{
        label: 'My First Dataset',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0
    }]
};

const chartOptions = {
    scales: {
        y: {
            ticks: {
                precision: 0
            }
        }
    },

    annotation: {
        drawTime: "afterDatasetsDraw",
        annotation: {
            annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 5,
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 4,
              label: {
                enabled: false,
                content: 'Test label'
              }
            }]
          }
        }
};

export default function ChartyBoy({stockID}){
    const [chartData, setChartData] = useState(chartDefaults);

    useEffect(() => {
        (async () => {
            const response = await fetchAPI(`/stocks/${stockID}/level/24hours`);
            const data = await response.json();

            console.log(data)
            setChartData({
                ...chartDefaults,
                labels: data.map(d => new Date(d.period).getHours()),
                datasets: [{
                  label: 'My First Dataset',
                  data: data.map(d => d.quantity),
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0,
                  // TS complains about this but it actually works...
                  // @ts-ignore
                  stepped: true
                }]
              });
        })();
    }, [stockID])

    return (
        <div style={ {"height": "500", "width": '500px'} }>
            <Chart
                type='line'
                data={chartData}
                options={chartOptions} />
        </div>
    )
}