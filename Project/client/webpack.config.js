const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    return ({
        stats: 'minimal', // Keep console output easy to read.
        // entry: './src/index.ts', // Your program entry point
        entry:path.resolve(__dirname, './src/index.js'),
        // Your build destination
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/',
        },

        // Config for your testing server
        devServer: {

            historyApiFallback: true,
            compress: true,
            static: false,
            client: {
                logging: "warn",
                overlay: {
                    errors: true,
                    warnings: false,
                },
                progress: true,
            },
            port: 3000, host: '0.0.0.0'
        },

        // Web games are bigger than pages, disable the warnings that our game is too big.
        performance: { hints: false },

        // Enable sourcemaps while debugging
        devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,

        // Minify the code when making a final build
        optimization: {
            minimize: argv.mode === 'production',
            minimizer: [new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    compress: { drop_console: true },
                    output: { comments: false, beautify: false },
                },
            })],
        },


        // Explain webpack how to do Typescript
        module: {
            rules: [
                {
                    test: /\.(tsx|jsx|ts|js)?$/,
                    use: "babel-loader",
                    exclude: /node_modules/,
                },
                // {
                //     test: /\.ts(x)?$/,
                //     loader: 'ts-loader',
                //     exclude: /node_modules/
                // },
                // {
                //     test: /\.m?js$/,
                //     exclude: /(node_modules|bower_components)/,
                //     use: {
                //         loader: 'babel-loader',
                //         options: {
                //         presets: ['@babel/preset-env',"@babel/preset-react"]
                //         }
                //     }
                // },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
            ]
        },
        resolve: {
            extensions: [
                '.tsx',
                '.ts',
                '.js'
            ]
        },
        plugins: [
            // Copy our static assets to the final build
            new CopyPlugin({
                patterns: [{ from: 'static/' }],
            }),

            // Make an index.html from the template
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                hash: true,
                minify: false
            }),
            new MiniCssExtractPlugin()
        ]
    });
}