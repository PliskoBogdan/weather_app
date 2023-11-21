<template>
  <div class="weather-chart">
    <LineChartGenerator
      ref="chart"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :css-classes="cssClasses"
      :width="width"
      :height="height"
    />
  </div>
</template>
<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

import i18n from "@/i18n";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);
export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartData: Array,
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartWidth: 900,
      chartHeight: 300,
      chartOptions: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
        grid: {
          drawOnChartArea: false,
        },

        scales: {
          y: {
            type: "linear",
            position: "left",
            ticks: {
              sign: "negative",
              callback: function (value) {
                return value === Math.round(value) ? value : null;
              },
            },
            beginAtZero: true,
          },
          y1: {
            type: "linear",
            position: "right",
            ticks: {
              callback: function (value) {
                return `${Math.round(value)} ${i18n.t("ms")}`;
              },
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    };
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      const stage = this.$refs.chart.getCurrentChart();
      if (window.innerWidth < 1200 && window.innerWidth > 650) {
        stage.canvas.parentNode.style.width = `${window.innerWidth - 100}px`;
        stage.resize();
      } else if (window.innerWidth <= 650) {
        stage.canvas.parentNode.style.width = `${window.innerWidth - 80}px`;
        stage.resize();
      } else {
        stage.resize()
      }
    },
  },
};
</script>
