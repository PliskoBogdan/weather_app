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

import debounce from "@/utils/debounce";
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
    chartData: {
      required: true,
    },
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
      debouncedResize: null,
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
                return `${value} ${i18n.t("ms")}`;
              },
            },
            beginAtZero: true,
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    };
  },

  mounted() {
    this.debouncedResize = debounce(this.handleResize, 200);

    window.addEventListener("resize", this.debouncedResize);

    this.handleResize();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.debouncedResize);
  },

  methods: {
    handleResize() {
      requestAnimationFrame(() => {
        const container = document.querySelector(".main__wrapper");
        const chart = document.querySelector(".weather-chart");

        const maxHeight = Math.max(container.offsetHeight, chart.offsetHeight);
        container.style.height = maxHeight;

        const stage = this.$refs.chart.getCurrentChart();
        if (window.innerWidth > 600) {
          stage.canvas.parentNode.style.width = `${
            container.offsetWidth - 95
          }px`;
        } else {
          stage.canvas.parentNode.style.width = `${
            container.offsetWidth - 110
          }px`;
        }

        stage.resize();
      });
    },
  },
};
</script>
