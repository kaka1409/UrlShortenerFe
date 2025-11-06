<!-- filepath: src/components/QrCode.vue -->
<template>
  <div class="flex flex-col items-center gap-4">
    <!-- QR Code Display -->
    <div v-if="qrData" class="bg-white p-4 rounded-lg shadow-lg">
      <img :src="qrData" alt="QR Code" class="w-64 h-64 border-4 border-gray-200 rounded" />
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center">
      <div class="inline-block animate-spin">
        <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
      <p class="text-gray-600 font-poppins mt-2">Generating QR Code...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-600 font-poppins">❌ Error: {{ error }}</p>
    </div>

    <!-- Download Button -->
    <button
      v-if="qrData"
      @click="downloadQrCode"
      class="bg-blue-500 hover:bg-blue-600 text-white font-poppins py-2 px-6 rounded-lg transition-colors cursor-pointer"
    >
      ⬇️ Download QR Code
    </button>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'
import { ref, watch } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const qrData = ref<string>('')
const isLoading = ref(false)
const error = ref<string>('')

// ✅ FIX: Generate QR code immediately when url prop changes
const generateQrCode = async () => {
  try {
    isLoading.value = true
    error.value = ''

    if (!props.url || props.url.trim() === '') {
      error.value = 'Please provide a valid URL'
      qrData.value = ''
      return
    }

    qrData.value = await QRCode.toDataURL(props.url)

    console.log('✅ QR Code generated successfully')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to generate QR code'
    console.error('❌ Error generating QR code:', err)
    qrData.value = ''
  } finally {
    isLoading.value = false
  }
}

// ✅ Watch the url prop and regenerate when it changes
watch(
  () => props.url,
  (newUrl) => {
    if (newUrl) {
      generateQrCode()
    }
  },
  { immediate: true }, // ✅ Run immediately on component mount
)

// Download QR Code as image
const downloadQrCode = () => {
  try {
    const link = document.createElement('a')
    link.href = qrData.value
    link.download = `qr-code-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    console.log('✅ QR Code downloaded')
  } catch (err) {
    console.error('❌ Error downloading QR code:', err)
  }
}
</script>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
