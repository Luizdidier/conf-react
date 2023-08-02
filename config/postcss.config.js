var postCSSConfig = [
  /* autoprefix for different browser vendors */
  // Note that this generates a warning regarding dupe autoprefixer
  // (it's also included by cssnext) but is "safe" to ignore as per
  // https://github.com/MoOx/postcss-cssnext/issues/388
  require('autoprefixer')({
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9', // React doesn't support IE8 anyway
    ]
  }),

  /* enable support for using latest CSS syntax today */
  require('postcss-cssnext'),

  /* enable css @imports like Sass/Less */
  require('postcss-import')
];

// Export the PostCSS Config for usage in webpack
module.exports = postCSSConfig;
