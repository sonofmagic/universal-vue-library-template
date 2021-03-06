import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import * as path from 'path'

const buildMap = {
  HelloWorld: {
    dir: path.resolve(__dirname, 'src/components/HelloWorld'),
    entry: 'src/index.vue',
    name: 'HelloWorld'
  },
  'vue-frame-selection': {
    dir: path.resolve(__dirname, 'src/components/vue-frame-selection'),
    entry: 'src/index.ts',
    name: 'vue-frame-selection'
  },
  Calendar: {
    dir: path.resolve(__dirname, 'src/components/Calendar'),
    entry: 'index.vue',
    name: 'Calendar'
  }
}

const Target = buildMap[process.env.COM_TARGET] || {}
const dir = Target.dir || __dirname

process.chdir(dir)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      root: dir,
      outputDir: 'dist/types'
    })
  ],
  build: {
    outDir: path.resolve(dir, 'dist'),
    lib: {
      entry: Target.entry,
      name: Target.name,
      fileName: (format) => `lib.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // preserveModules: true,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
