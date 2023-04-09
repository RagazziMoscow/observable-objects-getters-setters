const path = require("path");

module.exports = (env, argv) => {
    const isDevMode = argv.mode !== 'production';

    return {
        entry: "./src/main.ts",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                }
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist")
        },
        watch: isDevMode,
        devtool: isDevMode ? "eval-source-map" : "source-map"
    };
};
