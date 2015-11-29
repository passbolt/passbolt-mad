	                       _
	   _ __ ___   __ _  __| |
	  | '_ ` _ \ / _` |/ _` |
	  | | | | | | (_| | (_| |
	  |_| |_| |_|\__,_|\__,_|

	The mad solution
	(c) 2012-2015 passbolt.com


Install
=========

Install grunt
```
	npm install -g grunt-cli
```

Install the needed modules defined in the grunt config
```
	npm install
```


How to update the package?
=========

We are using mad in other projects.
Checkout npm documentation: https://docs.npmjs.com/developers

In a nutshell, once you are done changing, make sure you change the version
number in the package.json.

	{
	  "name": "passbolt-mad",
	  "version": "X.X.X",
	  [...]
	}

You need to commit your changes and tag the new version of the package.
This is how npm knows a new version is available in the project using the package.

  git commit -am 'X.X.X'
  git tag -a X.X.X -m 'X.X.X'
  git push origin X.X.X
  git push
  
Then we publish it again with

  npm publish

in your project using the npm package you can then run:

  npm update
