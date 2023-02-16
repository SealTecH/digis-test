import * as Highcharts from 'highcharts';

export const chartOptions: Highcharts.Options = {

   chart: {
      renderTo: 'chart',
      marginLeft: 100
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
      softMin: new Date().getTime(),
      labels: {
         format: '{value:%Y-%m-%d}'
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

};
