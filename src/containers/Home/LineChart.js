import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3 ', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
  datasets: [
    {
      label: '# of Votes',
      data: [30, 30, 35, 32, 33, 39, 32, 40, 34, 35, 56, 35, 80, 120, 45],
      fill: false,
      backgroundColor: 'white',
      borderColor: 'blue',
    }
  ],
};

const options = {
  scales: {
    y: {
      grid: {
        color: 'lightgray',
        borderColor: 'black',
        tickColor: 'blue'
      }
    },
    x: {
      grid: {
        color: 'lightgray',
        borderColor: 'black',
        tickColor: 'blue'
      },
      ticks: {
        color: 'red',
        mirror: true
      }
    }
  },
};

const LineChart = () => (
  <>
    <Line data={data} options={options} />
  </>
);

export default LineChart;