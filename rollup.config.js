import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
dotenv.config();

const smelte = require("smelte/rollup-plugin-smelte");
const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		replace({
			FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
			FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
			FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
			FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
			FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
			FIREBASE_APP_ID: JSON.stringify(process.env.FIREBASE_APP_ID),
		}),
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		smelte({ 
			purge: production,
			output: "public/global.css", // it defaults to static/global.css which is probably what you expect in Sapper 
			postcss: [], // Your PostCSS plugins
			whitelist: [], // Array of classnames whitelisted from purging
			whitelistPatterns: [], // Same as above, but list of regexes
			tailwind: { 
				colors: { 
					primary: "#79B4B7",
					secondary: "#F8F0DF",
					accent: "#9D9D9D",
					background: "#FEFBF3",
					white: "#FFFFFF",
					error: "#f44336",
					success: "#4caf50",
					alert: "#ff9800",
					blue: "#2196f3",
					dark: "#212121" 
				}, // Object of colors to generate a palette from, and then all the utility classes
				darkMode: true, 
			},
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
