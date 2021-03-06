const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_mudoles/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_mudoles/,
                use:
                    [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                    ]

            },
            {
                test: /.*\.(jpe?g|png|gif)$/i,
                use:
                    { loader: 'file-loader' },
            },
        ]
    }
};