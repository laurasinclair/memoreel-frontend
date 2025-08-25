import { AliasOptions, defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
// import * as path from 'path';
import path from "path";

//@ts-ignore
const root = path.resolve(__dirname, "src");

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	build: {
		outDir: "/projects/memoreel/",
	},
});

// // https://vitejs.dev/config/
// export default defineConfig({
// 	base: process.env.NODE_ENV === "production" ? "/projects/memoreel/" : "/",
// 	plugins: [react(), tsconfigPaths()],
// 	resolve: {
// 		alias: {
// 			src: path.resolve(__dirname, "src"),
// 			assets: `${path.resolve(__dirname, "src/assets/")}`,
// 			components: `${path.resolve(__dirname, "src/components/")}`,
// 			context: `${path.resolve(__dirname, "src/context/")}`,
// 			images: `${path.resolve(__dirname, "src/assets/images/")}`,
// 			pages: path.resolve(__dirname, "src/pages"),
// 			paths: path.resolve(__dirname, "src/paths"),
// 			router: path.resolve(__dirname, "src/router"),
// 			services: `${path.resolve(__dirname, "src/services/")}`,
// 			types: path.resolve(__dirname, "src/types"),
// 			utils: path.resolve(__dirname, "src/utils"),
// 		},
// 	},
// 	build: {
// 		outDir: "/projects/memoreel/",
// 	},
// });
