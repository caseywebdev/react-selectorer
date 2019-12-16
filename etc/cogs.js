module.exports = {
  package: {
    // Package
    transformers: [
      {
        name: 'babel',
        only: 'src/**/*.js',
        options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
      }
    ],
    builds: { 'src/*.js': { base: 'src', dir: 'build' } }
  },

  // Doc
  docs: {
    transformers: [
      {
        name: 'replace',
        only: '**/*.js',
        options: {
          flags: 'g',
          patterns: { 'process.env.NODE_ENV': "'development'" }
        }
      },
      {
        name: 'babel',
        only: 'src/**/*.js',
        options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
      },
      {
        name: 'concat-commonjs',
        only: '**/*.js',
        options: { entry: 'src/docs/index.js' }
      }
    ],
    builds: {
      'src/docs/index.js': { base: 'src/docs', dir: 'docs' },
      'src/index.css': { base: 'src', dir: 'docs' }
    }
  }
};
