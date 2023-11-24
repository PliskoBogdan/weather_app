<template>
  <div v-if="isOpen" class="confirm-modal">
    <div class="modal-content">
      <p class="modal-text">{{ message }}</p>
      <CButton @click="confirmAction(true)">{{ $t("Yes") }}</CButton>
      <CButton @click="confirmAction(false)">{{ $t("Cancel") }}</CButton>
    </div>
  </div>
</template>

<script>
import CButton from '@/components/CButton.vue';

export default {
  data() {
    return {
      isOpen: false,
      message: "",
    };
  },

  components: {
    CButton
  },

  methods: {
    confirmAction(value) {
      this.isOpen = false;
      this.$emit("confirm", value);
    },
  },
};
</script>

<style scoped>
.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  box-shadow: -4px 3px 19px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -4px 3px 19px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -4px 3px 19px 0px rgba(0, 0, 0, 0.75);
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.modal-content p {
  font-size: 1.3em;
}

button {
  margin: 0 10px;
}
.CButton:last-child {
  margin-top: 0.3em;
}
</style>
