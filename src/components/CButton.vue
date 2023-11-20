<template>
  <div class="CButton" @click="$emit('click', $event)"><slot /></div>
</template>

<style scoped>
.CButton {
  display: inline-block;
  padding: 5px 10px;
  font-size: 0.9em;
  color: #fff;
  background-color: var(--main-soul);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.CButton:hover {
  background-color: var(--hover);
}
</style>
