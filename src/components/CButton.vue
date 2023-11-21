<template>
  <div class="CButton" @click="$emit('click', $event)"><slot /></div>
</template>

<style scoped>
.CButton {
  display: inline-block;
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
</style>
