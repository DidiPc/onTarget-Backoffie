import {Injectable} from '@angular/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import {LabelBullet} from "@amcharts/amcharts4/charts";

export enum ChartsNames {
  shootingSkillsChart = 'shootingSkillsChart',
  fireSkillsChart = 'fireSkillsChart',
  physicalRateChartMetaData = 'physicalRateChartMetaData',
  personalTrainingMetaData = 'personalTrainingMetaData'
}


@Injectable({
  providedIn: 'root'
})
export class DashboardChartsService {


  private chartShootingSkills: am4charts.XYChart;
  private chartFireDrillAchievement: am4charts.XYChart;
  private chartPhysicalRate: am4charts.XYChart;


  categories: ChartMetaData = {
    shootingChartMetaData: {
      chart: this.chartShootingSkills,
      name: ChartsNames.shootingSkillsChart,
      categories: ['FIRE DRILL', 'SHOOTING RANGE'],
      mainColor: '#009DA0',
      simulationColor: '#d67e5e'
    },

    fireChartMetaData: {
      chart: this.chartFireDrillAchievement,
      name: ChartsNames.fireSkillsChart,
      categories: ['COMBAT FITNESS', 'STRESS', 'SLEEP[H]', 'DISTANCE'],
      mainColor: '#009DA0',
      simulationColor: '#d67e5e'

    },
    physicalRateChartMetaData: {
      chart: this.chartPhysicalRate,
      name: ChartsNames.physicalRateChartMetaData,
      categories: ['COMBAT FITNESS', 'STRESS', 'SLEEP[H]', 'DISTANCE[KM]'],
      mainColor: '#d15467',
      simulationColor: '#d67e5e'
    }
  };


  constructor() {

  }

  initCharts() {
    this.createChart(this.categories['shootingChartMetaData']);
    this.createPhysicalRateChart(this.categories['physicalRateChartMetaData']);
  }

  createChart(chartMetaData: ChartMetaDataItem) {
    chartMetaData.chart = am4core.create(chartMetaData.name, am4charts.XYChart);
    const chart = chartMetaData.chart;
    chart.data = [{
      category: chartMetaData.categories[0],
      value: 70,
      valueOffset: 30
    }, {
      category: chartMetaData.categories[1],
      simulationValue: 65,
      simulationOffset: 35
    }];


    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.stroke = am4core.color('#ffffff');
    categoryAxis.renderer.grid.template.strokeOpacity = 1;
    categoryAxis.renderer.grid.template.strokeWidth = 2;
    categoryAxis.renderer.labels.template.fill = am4core.color('#fff');
    categoryAxis.renderer.line.strokeOpacity = 1;
    categoryAxis.renderer.line.strokeWidth = 2;
    categoryAxis.renderer.line.stroke = am4core.color("#fff");


    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.labels.template.fill = am4core.color('#fff');
    valueAxis.renderer.labels.template.fontSize = 8;
    valueAxis.max = 100;
    valueAxis.fill = am4core.color("#845EC2");
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.renderer.line.stroke = am4core.color('#fff');


    // Second value axis
    const valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.strokeOpacity = 0;
    valueAxis2.calculateTotals = true;
    valueAxis2.renderer.labels.template.fill = am4core.color('#fff');
    valueAxis2.max = 100;
    valueAxis2.renderer.line.strokeOpacity = 1;
    valueAxis2.renderer.line.strokeWidth = 2;
    valueAxis2.renderer.line.stroke = am4core.color('#fff');


    this.createSeries(chart, 'value', false, chartMetaData.mainColor);
    this.createSeries(chart, 'valueOffset', true, chartMetaData.mainColor);
    this.createSeries(chart, 'simulationValue', false, chartMetaData.simulationColor);
    this.createSeries(chart, 'simulationOffset', true, chartMetaData.simulationColor);

  }

  createPhysicalRateChart(chartMetaData: ChartMetaDataItem) {

    chartMetaData.chart = am4core.create(chartMetaData.name, am4charts.XYChart);
    const chart = chartMetaData.chart;
    chart.data = [{
      category: chartMetaData.categories[0],
      combatFitnesvalue: 8.6,
      combatFitnesvalueOffset: 2.4
    }, {
      category: chartMetaData.categories[1],
      stressValue: 2.6,
      stressOffset: 7.4
    }, {
      category: chartMetaData.categories[2],
      sleepValue: 6.36,
      sleepOffset: 0.64
    }, {
      category: chartMetaData.categories[3],
      distanceValue: 12.6,
      distanceOffset: 2.4
    }];


    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.stroke = am4core.color('#ffffff');
    categoryAxis.renderer.grid.template.strokeOpacity = 1;
    categoryAxis.renderer.grid.template.strokeWidth = 2;
    categoryAxis.renderer.labels.template.fill = am4core.color('#fff');
    categoryAxis.renderer.line.strokeOpacity = 1;
    categoryAxis.renderer.line.strokeWidth = 2;
    categoryAxis.renderer.line.stroke = am4core.color("#fff");


    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.labels.template.fill = am4core.color('#fff');
    valueAxis.renderer.labels.template.fontSize = 8;
    valueAxis.max = 15;
    valueAxis.fill = am4core.color("#845EC2");
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.renderer.line.stroke = am4core.color('#fff');


    this.createSeries(chart, 'combatFitnesvalue', false, chartMetaData.mainColor, true);
    this.createSeries(chart, 'combatFitnesvalueOffset', true, chartMetaData.mainColor,true) ;
    this.createSeries(chart, 'stressValue', false, chartMetaData.mainColor, true);
    this.createSeries(chart, 'stressOffset', true, chartMetaData.mainColor, true);
    this.createSeries(chart, 'sleepValue', false, chartMetaData.mainColor, true);
    this.createSeries(chart, 'sleepOffset', true, chartMetaData.mainColor, true);
    this.createSeries(chart, 'distanceValue', false, chartMetaData.mainColor, true);
    this.createSeries(chart, 'distanceOffset', true, chartMetaData.mainColor, true);

  }

  createSeries(chart, valueY, withOpacity, mainColor, isWide?) {
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = valueY;
    series.stacked = true;
    series.dataFields.categoryX = 'category';
    series.columns.template.fill = am4core.color(mainColor);
    series.columns.template.strokeWidth = 0;
    series.columns.template.strokeOpacity = 0;
    series.columns.template.strokeOpacity = 0;
    if (isWide) {
      series.columns.template.width = am4core.percent(40);

    } else {

      series.columns.template.width = am4core.percent(20);
    }

    if (withOpacity) {
      series.columns.template.fillOpacity = 0.6;
    }
    const bullet: LabelBullet = series.bullets.push(new am4charts.LabelBullet());
    bullet.interactionsEnabled = false;
    bullet.label.text = '{valueY}';
    bullet.label.fill = am4core.color('#ffffff');
    bullet.locationY = 0.5;
    //bullet.rotation = 90;
    bullet.label.fontSize = 15;
  }

}


export interface ChartMetaData {
  shootingChartMetaData: ChartMetaDataItem;
  fireChartMetaData: ChartMetaDataItem;
  physicalRateChartMetaData: ChartMetaDataItem;
}

export interface ChartMetaDataItem {
  chart: am4charts.XYChart;
  name: string;
  categories: string[];
  mainColor: string;
  simulationColor: string;
}
