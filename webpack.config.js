var webpack = require('webpack');

module.exports = {
	entry: [
		'script!jquery/dist/jquery.min.js',
		'./app/app.jsx'
	],

	externals: {
		jquery: 'jQuery',
	},

	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery'
		})
	],

	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	resolve: {
		root: __dirname,
		alias: {
			Main: "app/components/Main.jsx",
			Nav: "app/components/Nav.jsx",
			Weather: "app/components/Weather.jsx",
			About: "app/components/About.jsx",
			Login: "app/components/Facebook.jsx",
			Question: "app/components/Question.jsx",
			QuestionText: "app/components/QuestionText.jsx",
			ChoiceText: "app/components/ChoiceText.jsx",
			WeatherForm: "app/components/WeatherForm.jsx",
			Score: "app/components/Score.jsx",
			WeatherMessage: "app/components/WeatherMessage.jsx",
			OpenWeatherMap: "app/api/OpenWeatherMap.jsx",
			Quiz: "app/components/Quiz.jsx",
			DifficultyLevel: "app/components/DifficultyLevel.jsx",
			ErrorModal: "app/components/ErrorModal.jsx",
			Div: "app/components/Div.jsx",
			Button: "app/components/Button.js",
			Alert: "app/components/Alert.js",
			Heading: "app/components/center_column_with_heading.js",
			applicationStyles: "app/styles/app.scss"
		},
		extensions: ['', '.js', '.jsx']
	},

	module: {
		loaders: [
			  {
				loader: 'babel-loader',
				query: {
					presets : ['react', 'es2015', 'stage-0']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			  },

			  { 
		        test: /\.css$/, 
		        loader: "style-loader!css-loader" 
		      },
		      {
		        test: /\.scss$/,
		        loaders: ["style-loader", "css-loader", "sass-loader"]
		      },
		      
		      { 
		        test: /\.png$/, 
		        loader: "url-loader?limit=100000" 
		      },
		      { 
		        test: /\.jpg$/, 
		        loader: "file-loader" 
		      },
		      {
		        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url?limit=10000&mimetype=application/font-woff'
		      },
		      {
		        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url?limit=10000&mimetype=application/octet-stream'
		      },
		      {
		        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'file'
		      },
		      {
		        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url?limit=10000&mimetype=image/svg+xml'
		      },
            { test: /\.json$/,
				loader: 'json-loader'
            }
		]
	},

    node: {
        // console: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};