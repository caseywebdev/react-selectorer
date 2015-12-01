module.exports = {
  in: {
    js: {
      transformers: [
        'directives',
        {
          name: 'babel',
          only: 'src/**/*.js',
          except: 'src/example.js',
          options: {modules: 'amd', stage: 0}
        },
        {
          name: 'babel',
          only: 'src/example.js',
          options: {modules: 'umd', stage: 0}
        },
        {name: 'concat-amd', except: 'src/example.js', options: {base: 'src'}}
      ]
    }
  },
  builds: {
    'src/react-selectorer.js': '.',
    'src/example.js': '.'
  }
};
