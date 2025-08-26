import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
// import * as path from 'path';
import path from "path";

//@ts-ignore
const root = path.resolve(__dirname, "src");

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	base: process.env.NODE_ENV === "production" ? "/projects/green-news/" : "/",
	build: {
		outDir: "/projects/memoreel/",
	},
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,
			},
			sass: {
				quietDeps: true,
			},
		},
	},
});