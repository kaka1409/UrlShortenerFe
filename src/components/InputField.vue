<script setup lang="ts">
  const props = defineProps({
    labelText: {
      type: String,
      default: 'Label text',
    },

    name: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: 'text',
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: ''
    },
    autoComplete: {
      type: Boolean,
      default: true
    },
    autoCorrect: {
      type: Boolean,
      default: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue'])
  function onInput(e: Event) {
    const value = (e.target as HTMLInputElement).value
    emit('update:modelValue', value)
  }

</script>

<template>
  <div class="w-full mb-4 text-black-violet/80">
    <label
      class="float-left pl-1 lg:text-lg md:text-md text-sm font-bold"
      :for="props.name"
    >{{ props.labelText }}</label>

    <input
      :class="
        `w-full lg:h-14 md:h-12 h-10 lg:p-4 md:p-3 p-2 lg:mt-2
        border-2 border-gray-400 lg:rounded-2xl md:rounded-xl sm:rounded-lg rounded-md
        lg:text-lg md:text-md text-sm text-black-violet/60
        focus:outline-none focus:ring-2 ` +
        ( props.errorMessage ?
          'focus:ring-red-500 focus:border-red-500' :
          'focus:ring-light-violet focus:border-light-violet')
      "
      :name="props.name"
      :type="props.type"
      :placeholder="props.placeholder"
      :autocomplete="props.autoComplete ? 'on' : 'off'"
      :autocorrect="props.autoCorrect ? 'on' : 'off'"
      :disabled="isDisabled"
      :value="modelValue"
      @input="onInput"
    />

    <p class="text-red-500 lg:text-sm text-xs lg:h-2 md:h-2 h-3">{{ props.errorMessage }}</p>
  </div>
</template>
