<template>
  <div class="truncated__card" @click="onSelect">
    <h2 class="truncated__card-header">
      {{ item[0].dt | formattedDate }}, {{ midTemp }}
    </h2>

    <div class="truncated__card-body">
      <div>
        <img
          :src="`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`"
          width="50px"
          height="50px"
          alt="weather_icon"
        />
      </div>
      <div class="temp__area mr-1">
        <span> {{ Math.round(minTemp) }} / {{ Math.round(maxTemp) }}</span>
      </div>
      <div class="text-center">
        <span>{{ description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getMidDayItemIndex from "@/utils/getMidDayItemIndex";

export default {
  props: {
    item: { type: Array, required: true },
  },

  computed: {
    weatherIcon() {
      return this.item?.[getMidDayItemIndex(this.item)]?.weather?.[0]?.icon || "";
    },

    maxTemp() {
      return Math.round(this.item?.[getMidDayItemIndex(this.item)]?.main?.temp_max || 0);
    },

    minTemp() {
      return Math.round(this.item?.[getMidDayItemIndex(this.item)]?.main?.temp_min || 0);
    },

    midTemp() {
        return Math.round(this.item?.[getMidDayItemIndex(this.item)]?.main?.temp)
    },

    description() {
      return this.item?.[getMidDayItemIndex(this.item)]?.weather?.[0]?.description || "";
    },
  },

  methods: {
    onSelect() {
        this.$emit('select', this.item)
    }
  }
};
</script>

<style scoped>
.truncated__card {
  flex: 0 1 calc(30% - 20px);
  margin: 10px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.truncated__card:hover {
  transform: scale(1.05);
}

.truncated__card-header {
  text-align: center;
}

.truncated__card-body {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
}

@media screen and (max-width: 1000px) {
  .truncated__card-body {
    flex-direction: column;
  }
}

@media screen and (max-width: 700px) {
  .truncated__card {
    flex: 0 1 calc(40% - 20px);
  }
}

@media screen and (max-width: 450px) {
  .truncated__card {
    flex: 0 1 calc(50% - 20px);
  }
}
</style>
