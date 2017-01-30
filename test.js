// var casper = require('casper').create();
var phantomcss = require('phantomcss')
var components = require('./components.json')
var exec = require('child_process').spawn
casper.test.begin( 'Coffee machine visual tests', function ( test ) {
  phantomcss.init( {
    rebase: casper.cli.get( "rebase" ),
    // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
    casper: casper,
    libraryRoot: fs.absolute( fs.workingDirectory + '/node_modules/phantomcss' ),
    screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots' ),
    failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/demo/failures' ),
    addLabelToFailedImage: false,
  })
  casper.start('http://localhost:8000/patterns.html')
    .viewport(1024, 768).then(function() {
      components.forEach(function(component) {
        component.patterns.forEach(function(pattern) {
          casper.then(function() { phantomcss.screenshot('#' + component.name + '-' + pattern.id, component.name + '-' + pattern.id) })
        })
      })
      casper.then( function now_check_the_screenshots() {
        casper.wait(1000)
        phantomcss.compareAll();
      } );
    })
  casper.run()
})
