<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="data"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import i18n from '@/i18n';

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
    data: {
      type: Object,
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
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chartOptions: {
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
                sign: 'negative',
                callback: function(value) {
                    return value === Math.round(value) ? value : null;
                },
            },
            beginAtZero: true,
          },
          y1: {
            type: "linear",
            position: "right",
            ticks: {
                callback: function(value) {
                  return `${Math.round(value)} ${i18n.t('ms')}`;
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
};
</script>
