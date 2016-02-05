# GovRight Corpus services for AngularJS v1

## API
Check the [documentation](http://govright.github.io/corpus-services/docs/#/api/govright.corpusServices) 
for detailed API reference.

## Usage

Add `govright.corpusServices` module as a dependency to your main application module. Example:

```html
<!doctype html>
<html ng-app="myApp">
 <head>
   <script src="js/angular.js"></script>
   <!-- Include the corpus services script -->
   <script src="dist/govright-corpus-services.js"></script>
   <script>
     // ...and add 'govright.corpusServices' as a dependency
     var myApp = angular.module('myApp', ['govright.corpusServices']);
   </script>
 </head>
 <body></body>
</html>
```

## Development

There are several gulp tasks available:

```bash
# To build packaged js files from sources
gulp

# To build html documentation from source ngdocs
# Changes must be commited on `gh-pages` branch
gulp docs

# To run local documentation server
gulp serve
```
