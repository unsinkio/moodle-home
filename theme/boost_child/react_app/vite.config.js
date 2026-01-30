import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../javascript', // Output directly to theme/javascript
        emptyOutDir: false, // Don't delete other files in javascript folder
        rollupOptions: {
            input: 'src/main.jsx',
            output: {
                entryFileNames: 'react_bundle.js',
                format: 'iife', // Immediately Invoked Function Expression for browser compatibility
                name: 'MoodleReactApp',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') return 'react_styles.css';
                    return assetInfo.name;
                },
                // Force manual chunks to undefined to ensure single file if possible (though React usually splits)
                // For simple apps, standard build is fine, but we want a single entry point file name fixed.
            }
        },
        // Ensure CSS is injected or handled. Vite usually emits a css file.
        // In Moodle we verify if we want to import that CSS or if we bundled it.
        // For simplicity, we'll let it verify and just include the css in config.php.
    }
})
