import * as Highcharts from 'highcharts';
export const chartOptions: Highcharts.Options = {

  chart: {
    renderTo: 'chart',
    marginLeft: 100,
  },

  title: {
    text: 'Balance over time'
  },

  yAxis: {
    title: {
      text: ''
    }
  },

  xAxis: {
    type: 'datetime',
    min: new Date().getTime(),
    labels: {
    }
  },

  legend: {
    enabled: false
  },

  series: [{
    type: 'line',
    zoneAxis: 'x',
    dataLabels: {
      enabled: true,
      format: '{y:,.2f}'
    },
    data: []
  }]

}
