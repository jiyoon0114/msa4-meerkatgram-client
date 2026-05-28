<script setup>
const props = defineProps({
  'type': String,
  'placeholder': String,
  'readonly': Boolean,
  'required': Boolean,
});

// 부모의 v-model과 연결되는 반응형 변수(v.3.4+)
const model = defineModel();
</script>

<template>
<input 
  :type="props.type"
  :placeholder="props.placeholder"
  :readonly="props.readonly"
  :required="props.required"
  v-model="model"
  />
</template>

<style scoped> 
input {
  padding: 0 10px;
  width: 300px;
  height: 85px;
  font-size: 20px;
  outline: none;
  border: 2px solid var(--personal-color-black);
  border-radius: 10px;
  display: flex;
  align-items: center;
}
</style>