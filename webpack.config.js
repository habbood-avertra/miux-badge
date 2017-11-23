const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const package = require("./package");
const widgetName = package.widgetName;
const name = package.widgetName.toLowerCase();

const widgetConfig = {
    entry: `./src/components/${name}.container.tsx`,
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: `src/com/mendix/widget/custom/${name}/${widgetName}.js`,
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "tests": path.resolve(__dirname, "./tests")
        }
    },
    module: {
        rules: [
            {test: /\.tsx?$/, use: "ts-loader"},
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
            }
        ]
    },
    devtool: "source-map",
    externals: ["react", "react-dom"],
    plugins: [
        new CopyWebpackPlugin([{from: "src/**/*.xml"}], {copyUnmodified: true}),
        new ExtractTextPlugin({filename: `./src/com/mendix/widget/custom/${name}/ui/${widgetName}.css`}),
        new webpack.LoaderOptionsPlugin({debug: true})
    ]
};

const previewConfig = {
    entry: `./src/${name}.webmodeler.tsx`,
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: `src/${name}.webmodeler.js`,
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx$/, loader: "ts-loader", options: {
                compilerOptions: {
                    "module": "CommonJS",
                }
            }
            },
            {test: /\.css$/, use: "raw-loader"},
            {
                test: /\.scss$/, use: [
                {loader: "raw-loader"},
                {loader: "sass-loader"}
            ]
            }
        ]
    },
    devtool: "inline-source-map",
    externals: ["react", "react-dom"],
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true})
    ]
};

module.exports = [widgetConfig, previewConfig];
