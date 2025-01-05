import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Component } from 'react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
  resolve:{
    alias : {
      src : '/src',
      Components: "/src/Components",
      Pages: "/src/Pages",
      Assets: "/src/Assets",
      Layouts: "/src/Layouts",
      Redux: "/src/Redux",
      Configs: "/src/Configs",
      Helpers: "/src/Helpers",
      Routes: "/src/Routes"
    }
  }
})
