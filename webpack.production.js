const path = require("path"),
	webpack = require("webpack"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin"),
	package = require("./package.json");

module.exports = {
	devtool: "source-map",
	target: "web",
	entry: {
		app: "./src/default.js",
		search: "./src/search.js",
		vendor: Object.keys(package.dependencies)
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: ["stage-0", "es2015", "react"]
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader"
						},
						{
							loader: "postcss-loader",
							options: {
								plugins: function() {
									return [require("autoprefixer")];
								},
								sourceMap: false
							}
						},
						{
							loader: "sass-loader"
						}
					]
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader"
						},
						{
							loader: "postcss-loader",
							options: {
								plugins: function() {
									return [require("autoprefixer")];
								},
								sourceMap: false
							}
						}
					]
				})
			},
			{
				test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.(ttf|eot|svg|png|jpg|ico)(\?[a-z0-9#=&.]+)?$/,
				loader: "file-loader"
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": { NODE_ENV: JSON.stringify("production") }
		}),
		new ExtractTextPlugin({
			filename: "[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
			disable: false,
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		}),
		new HtmlWebpackPlugin({
			title: "Validar EventHub",
			template: "src/default.html",
			env: true,
			filename: "./default.html",
			chunks: ["vendor", "app"],
			favicon: "./src/static/favicon.ico"
		}),
		new HtmlWebpackPlugin({
			title: "Validar EventHub self-identify",
			template: "src/search.html",
			env: true,
			filename: "./SelfIdentify.html",
			chunks: ["vendor", "search"],
			favicon: "./src/static/favicon.ico"
		}),
		new UglifyJsPlugin({
			beautify: false,
			mangle: { screw_ie8: true, warnings: false },
			compress: { screw_ie8: true, warnings: false },
			comments: false
		})
	]
};
