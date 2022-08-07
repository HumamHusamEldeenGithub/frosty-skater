// https://vitejs.dev/config/

import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        assetsInclude: ['**/*/*.gltf' , "**/*/*.mp3", "**/*/*.wav", "**/**/*.png", "**/**/*.jpg" , "**/**/*.glb", "**/**/**.**"],
        assetsInlineLimit: 50000000,
    },
})