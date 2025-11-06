<script setup lang="ts">
import { LinkIcon } from '@heroicons/vue/24/outline'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { QrCodeIcon } from '@heroicons/vue/24/outline'

// import QrCode from '../components/QrCode.vue'
// import QrCode from '@/components/QrCode.vue'
import QrCode from './QrCode.vue'
import InputField from './InputField.vue'
import Form from './Form.vue'

import { useUrlFormStore } from '@/stores/urlForm.store'
const urlFormStore = useUrlFormStore()
</script>

<template>
  <main class="h-full w-full flex flex-col justify-center items-center gap-2">
    <h1 class="relavtive z-10 lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white font-bold">URL Shortener</h1>
    <p class="relavtive z-10 text-white lg:text-lg md:text-md sm:text-sm text-xs">Thank you for using our service, have a nice day!</p>

    <Form
      v-if="!urlFormStore.isShortLinkCreated"
      :onSubmit="urlFormStore.createShortUrl"
      submitButtonText="Get your shorten URL"
      method="post"
    >
      <template v-slot:fieldsContainer>
        <InputField
          labelText="Shorten a long link:"
          name="orginalUrl"
          type="text"
          v-model="urlFormStore.originalUrl"
          placeholder="Paste your url here e.g: https://example.com/really-long-code"
        />
      </template>
    </Form>

    <Form v-else submitButtonText="Shorten another" :onsubmit="urlFormStore.resetFormState">
      <template v-slot:fieldsContainer>
        <InputField
          labelText="Original URL:"
          name="orginalUrl"
          type="text"
          :isDisabled="true"
          v-model="urlFormStore.originalUrl"
        />

        <InputField
          labelText="Shortened URL:"
          name="orginalUrl"
          type="text"
          v-model="urlFormStore.shortenedUrl"
          :isDisabled="true"
        />

        <div class="my-10 flex flex-col items-center justify-center">
          <QrCode :url="urlFormStore.shortenedUrl" />
        </div>

        <div class="flex items-center justify-start gap-3">
          <button
            class="flex items-center justify-between gap-1 px-3 py-2 border-2 border-gray-400 rounded-xl hover:cursor-pointer hover:bg-black-violet/80 hover:text-white hover:border-black-violet/80 transition-all duration-200"
            @click="urlFormStore.copyToClipBoard"
          >
            <LinkIcon class="w-5 h-5" />
            <span>Copy</span>
          </button>

          <a
            class="flex items-center justify-between gap-1 px-3 py-2 border-2 border-gray-400 rounded-xl hover:bg-black-violet/80 hover:text-white hover:border-black-violet/80 transition-all duration-200"
            :href="urlFormStore.shortenedUrl"
            target="_blank"
          >
            <ArrowTopRightOnSquareIcon class="w-5 h-5" />
            <span>Open</span>
          </a>

          <button
            class="flex items-center justify-between gap-1 px-3 py-2 border-2 border-gray-400 rounded-xl hover:cursor-pointer hover:bg-black-violet/80 hover:text-white hover:border-black-violet/80 transition-all duration-200"
            @click="urlFormStore.copyToClipBoard"
          >
            <QrCodeIcon class="w-5 h-5" />
            <span>QR code</span>
          </button>
        </div>

      </template>
    </Form>
  </main>
</template>
