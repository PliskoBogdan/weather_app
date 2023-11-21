<template>
  <div class="CButton" @click="$emit('click', $event)"><slot /></div>
</template>

<style scoped>
.CButton {
  padding: 5px 10px;
  font-size: 0.9em;
  color: var(--text-main);
  background-color: var(--bg-button);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}
.CButton:hover {
  background-color: var(--hover);
}

@media screen and (max-width: 1200px) {
  .CButton {
    font-size: 1.3em;
  }
}

@media screen and (max-width: 1000px) {
  .CButton {
    font-size: 0.9em;
  }
}
</style>
