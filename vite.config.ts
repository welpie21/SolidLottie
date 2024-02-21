/// <reference types="vitest" />

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'node:path';
import ts from "typescript";

const declarationPlugin = () => {
	const libDir = resolve('lib');

	const program = ts.createProgram([resolve(libDir, 'index.tsx')], {
		target: ts.ScriptTarget.ESNext,
		module: ts.ModuleKind.ESNext,
		moduleResolution: ts.ModuleResolutionKind.Node10,
		jsx: ts.JsxEmit.Preserve,
		jsxImportSource: "solid-js",
		allowSyntheticDefaultImports: true,
		esModuleInterop: true,
		// outDir: 'dist/source',
		declarationDir: 'dist/types',
		declaration: true,
		allowJs: true,
		// TEMP
		emitDeclarationOnly: true,
	});

	const emitResult = program.emit();

	if (emitResult.emitSkipped) {
		console.error('Failed to emit declaration files');
	}
};

export default defineConfig({
	plugins: [
		solid(),
		{
			name: 'solid-source',
			enforce: 'pre',
			generateBundle: declarationPlugin
		}
	],
	build: {
		target: 'esnext',
		lib: {
			entry: './lib/index.tsx',
			name: 'solid-lottie',
			fileName: 'solid-lottie'
		},
		minify: "esbuild",
		rollupOptions: {
			external: [
				'solid-js',
				'solid-js/web',
				'solid-js/store',
				"lottie-web"
			],
			output: {
				globals: {
					'solid-js': 'solid',
					'solid-js/web': 'solid',
					'solid-js/store': 'solid',
					"lottie-web": "lottie-web"
				}
			}
		}
	}
});
