import { Paper, Box } from '@material-ui/core';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { createTheme } from '@material-ui/core';

const data = {
  labels: ['1 Sep', '2 Sep', '3 Sep ', '4 Sep', '5 Sep', '6 Sep', '7 Sep'],
  datasets: [
    {
      label: 'Shopping Cost',
      data: [500, 700, 600, 430, 650, 690, 610],
      backgroundColor: '#006064',
      borderWidth: 2,
      pointRadius: 2,
      borderColor: '#006064'
    },
    {
      label: 'Average',
      fill: false,
      data: [580, 580, 580, 580, 580, 580, 580],
      backgroundColor: '#ad1457',
      borderColor: '#ad1457',
      pointRadius: 0,
      borderWidth: 1,
    }
  ],
};

// grid style
const grid = {
  color: '#eeeeee',
  borderColor: 'gray',
  tickColor: 'gray'
}

const options = {
  plugins: {
    title: {
      display: true,
      text: "Grocery Shopping Cost ( Last 7 days )"
    }
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Shopping Cost (Tk)"
      },
      grid: { ...grid },
      ticks: {
        callback: function (val, index, values) {
          return index % 2 === 0 ? "Tk " + this.getLabelForValue(val) : '';
        },
        autoSkip: false,
      }
    },
    x: {
      title: {
        display: true,
        text: "Dates"
      },
      grid: { ...grid },
      ticks: {
        align: "center",
        maxRotation: 90,
        minRotation: 0
      }
    }
  },
}

const ShoppingCostChart = () => (
  <Paper elevation={20} style={{ padding: "16px", borderRadius: "8px"}}>
    <Line data={data} options={options} />
  </Paper>
);

export default ShoppingCostChart;