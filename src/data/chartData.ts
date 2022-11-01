import {Chart} from '../types';

const chartData: Chart[] = [
  {
    id: 1,
    date: '2022.08.13',
    title: {
      text: 'USD/RUB'
    },
    series: [
      {
        showInLegend: false,
        data: [1, 5, 3, 9, 2]
      }
    ],
    credits: {
      enabled: false
    },
    colors: ['#2f7ed8'],
    chart: {
      type: 'spline'
    }
  },
  {
    id: 2,
    date: '2022.10.25',
    title: {
      text: 'BTC/USDT'
    },
    series: [
      {
        showInLegend: false,
        data: [5, 33, 22, 7, 15]
      }
    ],
    credits: {
      enabled: false
    },
    colors: ['#2f7ed8'],
    chart: {
      type: 'spline'
    }
  },
  {
    id: 3,
    date: '2022.03.05',
    title: {
      text: 'ETH/BTC'
    },
    series: [
      {
        showInLegend: false,
        data: [12, 2, 2, 5, 6]
      }
    ],
    credits: {
      enabled: false
    },
    colors: ['#2f7ed8'],
    chart: {
      type: 'spline'
    }
  },
  {
    id: 4,
    date: '2022.01.11',
    title: {
      text: 'PLN/USD'
    },
    series: [
      {
        showInLegend: false,
        data: [11, 3, 4, 5, 2]
      }
    ],
    credits: {
      enabled: false
    },
    colors: ['#2f7ed8'],
    chart: {
      type: 'spline'
    }
  },
  {
    id: 5,
    date: '2022.10.31',
    title: {
      text: 'BYN/USD'
    },
    series: [
      {
        showInLegend: false,
        data: [11, 3, 4, 5, 2]
      }
    ],
    credits: {
      enabled: false
    },
    colors: ['#2f7ed8'],
    chart: {
      type: 'spline'
    }
  }
];

export default chartData;
