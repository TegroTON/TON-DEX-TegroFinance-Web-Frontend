import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import {nodeResolve} from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            util: 'web-encoding'
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true
                }),
            ],
        },
    },
    build: {
        target: ['ESNext'],
        rollupOptions: {
            plugins: [
                nodePolyfills(),
                NodeModulesPolyfillPlugin(),
                nodeResolve({browser: true}),
            ]
        },
        commonjsOptions: {
            transformMixedEsModules: true // fuck this
        }
    }
});
