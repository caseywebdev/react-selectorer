module.exports = [
  {
    // Package
    transformers: [
      {
        name: 'babel',
        only: '**/*.js',
        options: {presets: ['es2015', 'stage-0', 'react']}
      }
    ],
    builds: {'src/**/!(example.js)': {dir: 'build'}}
  },

  // Doc
  {
    transformers: [
      {
        name: 'replace',
        only: '**/*.js',
        options: {
          flags: 'g',
          patterns: {'process.env.NODE_ENV': "'development'"}
        }
      },
      {
        name: 'babel',
        only: 'src/**/*.js',
        options: {presets: ['es2015', 'stage-0', 'react']}
      },
      {
        name: 'concat-commonjs',
        only: '**/*.js',
        options: {entry: 'src/example.js'}
      }
    ],
    builds: {
      'src/example.js': 'docs/index.js',
      'src/index.css': 'docs/index.css'
    }
  }
];
