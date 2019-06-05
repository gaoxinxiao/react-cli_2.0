const paths = require("./paths");
const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rootDir = path.dirname(__dirname);

/**
 * 重写 react-scripts 默认配置
 */
module.exports = (config, env) => {
    config.entry = [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        `${paths.appSrc}/index.js`
    ]
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.json', '.jsx'];
    config.resolve.plugins.push(new TsconfigPathsPlugin({
        configFile: paths.appTsConfig
    }));
    config.plugins.push(new MiniCssExtractPlugin({
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[name].chunk.css',
    }))
    config.resolve.plugins.shift()
    config.resolve.alias = {
        'react-native': 'react-native-web',
    }
    cssloader = [{
            loader: 'css-loader',
            options: {
                importLoaders: 1,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                    }),
                ],
            },
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
                javascriptEnabled: true,
            },
        }
    ]
    config.module.rules = [{
        oneOf: [{
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[ext]',
                },
            },
            {
                test: /\.js$/,
                include: paths.appNodeModules,
                exclude: paths.jsExclude,
                use: [
                    'cache-loader',
                    {
                        loader: "babel-loader",
                        options: {
                            // compact: true,
                            presets: ['@babel/preset-env']
                        }
                    }
                ],
            },
            {
                test: /\.(tsx|ts|js|jsx)$/,
                include: paths.appSrc,
                loader: 'awesome-typescript-loader',
                options: {
                    useCache: true,
                    usePrecompiledFiles: true,
                    plugins: [
                        'react-hot-loader/babel'
                    ]
                }
            },
            {
                test: /\.(scss|css)$/,
                include: paths.appSrc,
                use: [
                    'style-loader',
                    ...cssloader
                ],
            },
            {
                test: /\.(scss|css)$/,
                include: paths.appNodeModules,
                exclude: paths.appSrc,
                use: [
                    MiniCssExtractPlugin.loader,
                    ...cssloader
                ],
            },
            {
                exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[ext]',
                },
            },
        ]
    }, ]
    return config
}