import { createVuePlugin } from 'vite-plugin-vue2'
import * as path from 'path'

// process.chdir(path.resolve(__dirname, 'src/components/HelloWorld'))
export default {
  plugins: [createVuePlugin()],
  build: {
    outDir: path.resolve(__dirname, 'src/components/HelloWorld/dist'),
    lib: {
      entry: path.resolve(__dirname, 'src/components/HelloWorld/src/index.vue'),
      name: 'HelloWorld',
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
}
