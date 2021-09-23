import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Paper, Box, Typography } from '@material-ui/core'

const data = {
  labels: ['Lunch', 'Dinner', 'Feast', 'Chef', 'Gas', 'Newspaper'],
  datasets: [
    {
      label: '# of Votes',
      data: [18000, 16000, 5000, 3000, 1200, 700],
      backgroundColor: [
        '#ffb74d',
        '#ba68c8',
        '#9575cd',
        '#81c784',
        '#64b5f6',
        '#f06292',
      ],
      borderColor: [
        '#ffb74d',
        '#ba68c8',
        '#9575cd',
        '#81c784',
        '#64b5f6',
        '#f06292',
      ],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = () => (
  <Box maxWidth="400px" padding="1rem" margin="0 auto">
    <Doughnut data={data} />
    <Typography style={{ textAlign: "center", paddingTop: "8px 0" }}>
      Different Expenses For Current Month
    </Typography>
  </Box>
);

export default DoughnutChart;