// lesson 130 exporing babel
// npm init
// npm install babel-preset-env@1.6.1
// above is the module
// npm install webpack@4.5.0 webpack-cli@2.0.14
// write "webpack": "webpack" in the package.json file made by babel-preset-env under "scripts" line
// make a new file in boilerplate called webpack.config.js
/* put this code inside of webpack.config.js
const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: 'scripts/'
    },
    devtool: 'source-map'
}

*/

import { renderTodos} from './views'
import { setFilters } from './filters'
import { createTodo , loadTodos } from './todos'



renderTodos()

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()
    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.text.value = ''
    }
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })    
    renderTodos()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})



