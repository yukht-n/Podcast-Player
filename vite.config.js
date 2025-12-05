import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const ReactCompilerConfig = {}; // Default ist meist ok: https://react.dev/reference/react-compiler/configuration

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
			},
		}),
	],
	/*   server: {
    open: true,
  }, */
});
