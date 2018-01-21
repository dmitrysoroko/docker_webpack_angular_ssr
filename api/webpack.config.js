const path = require('path');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = {
	entry: {
		main: './src/main.server.ts'
	},
	resolve: {
      extensions: ['.ts', '.js']
    },
	target: 'node',
	output: {
    path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	plugins: [
		new AngularCompilerPlugin({
			tsConfigPath: './tsconfig.json',
		})
	],
	module: {
		rules: [
			{
              test: /\.ts$/,
              loader: '@ngtools/webpack',
            }
		]
	}
};
