// import chokidar from "chokidar";
import esbuild from "esbuild";
import fs from "fs";
import path from "path";

/* const {
  dependencies,
  peerDependencies,
  name,
  version,
  author,
  keywords,
} = require("./package.json"); */
import dts from "npm-dts";

import { nodeExternalsPlugin } from "esbuild-node-externals";
import babel from "esbuild-plugin-babel";

const { dependencies, peerDependencies, name, version, author, keywords } =
  JSON.parse(fs.readFileSync("./package.json"));

const esbuildOptions = {
  // outfile: "dist/lib.js",
  // outdir: "dist",
  bundle: true,
  minify: false,
  // platform: "node",
  // format: "esm",
  sourcemap: true,
  // plugins: [nodeExternalsPlugin()],
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};

async function build(files_) {
  return await esbuild
    .build({
      target: "node14",
      outfile: "dist/lib.js",
      entryPoints: files_,
      ...esbuildOptions,
    })
    .catch(() => process.exit(1));
}

async function buildEsm(files_) {
  return await esbuild
    .build({
      outfile: "dist/lib.esm.js",
      format: "esm",
      platform: "browser",
      inject: ["./react-shim.js"],
      entryPoints: files_,
      plugins: [babel()],
      ...esbuildOptions,
    })
    .catch(() => process.exit(1));
}

async function buildCjs(files_) {
  return await esbuild
    .build({
      outfile: "dist/lib.js",
      format: "cjs",
      platform: "browser",
      inject: ["./react-shim.js"],
      entryPoints: files_,
      plugins: [babel()],
      ...esbuildOptions,
    })
    .catch(() => process.exit(1));
}

const files = ["src/lib.ts"];

buildEsm(files)
  .then(() => buildCjs(files))
  .then(() =>
    new dts.Generator(
      {
        logLevel: "debug",
        entry: "src/lib.ts",
        output: "dist/lib.d.ts",
        tsc: "-p tsconfig.build.json",
      },
      true,
      true
    )
      .generate()
      .then(() => console.log("create lib.d.ts"))
  )
  /* .then(() =>
    fs.writeFileSync(
      "dist/package.json",
      JSON.stringify(
        {
          name,
          version,
          author,
          // module: "lib.esm.js",
          main: "lib.js",
          typings: "lib.d.ts",
          peerDependencies,
          dependencies,
          keywords,
        },
        null,
        2
      ),
      "utf-8"
    )
  ) */
  // .then(() => console.log("create package.json"))
  // .then(() => fs.copyFileSync("README.md", "dist/README.md"))
  .catch((err) => console.log(err))
  .finally(() => process.exit(0));
