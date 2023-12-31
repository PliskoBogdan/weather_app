<template>
  <div class="CAutocomplete">
    <input
      :value="inputValue"
      @input="debouncedInput"
      @focus="handleFocus"
      @blur="handleBlur"
      :placeholder="$t('Search city')"
    />
    <ul v-if="showSuggestions" class="suggestions">
      <li
        v-for="item in filteredSuggestions"
        :key="item[listKey] || index"
        @mousedown.prevent="selectSuggestion(item)"
      >
        {{ item[itemValue] }}
      </li>
    </ul>
  </div>
</template>

<script>
import debounce from "@/utils/debounce";

export default {
  props: {
    list: { type: Array, required: true },
    listKey: { type: String, required: false, default: "id" },
    itemValue: { type: String, required: false, default: "id" },
  },

  data() {
    return {
      inputValue: "",
      showSuggestions: false,
      filteredSuggestions: [],
    };
  },

  created() {
    this.debouncedInput = debounce(this.handleInput, 300);
  },

  watch: {
    list(value) {
      this.filteredSuggestions = value;
    },
  },

  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.showSuggestions = this.inputValue.length > 0;
      this.inputValue = value;
      if (value.length > 2) {
        this.$emit("search", value);
      } else {
        this.filteredSuggestions = [];
      }
    },
    handleFocus() {
      this.showSuggestions = this.inputValue.length > 0;
    },
    handleBlur() {
      this.showSuggestions = false;
    },
    selectSuggestion(item) {
      const value = item[this.itemValue];
      this.inputValue = value;
      this.showSuggestions = false;
      this.$emit("input", { item: item, value });
    },
  },
};
</script>

<style scoped>
.CAutocomplete {
  position: relative;
}
.CAutocomplete input {
  transition: 0.3s;
  background-color: var(--bg-button);
  border: none;
  border-radius: 0.2em;
  color: var(--text-main);
  padding: 5px 10px;
  box-sizing: border-box;
  width: 100%;
  font-size: 1.3em;
}
.CAutocomplete input::placeholder {
  color: var(--text-main);
}
.CAutocomplete input:focus {
  outline: none;
  border: 1px solid #8d8d8d;
}
.suggestions {
  position: absolute;
  z-index: 999;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: var(--bg-menu);
  width: 100%;
  border: 1px solid #333;
  border-radius: 5px;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #333;
  color: var(--text-main);
}

.suggestions li:last-child {
  border-bottom: none;
}

.suggestions li:hover {
  border-radius: 5px;
  background-color: var(--hover);
}
.suggestions li:hover:first-child {
  border-radius: 5px 5px 0px 0px;
}

@media screen and (max-width: 1000px) {
  .CAutocomplete input {
    font-size: 0.9em;
  }
}


@media screen and (max-width: 550px) {
  .CAutocomplete input {
    font-size: 0.9em;
  }
}
</style>
