# No Agenda QSO Party Web Site source
 
This is the source for the No Agenda QSO Party web site. It is a single page app written using AngularJS, Bootstrap and less.

# Contribute

Wanna help get the party started fork this repository, create a branch, make your changes and send a pull request.

This site uses grunt-cli, yeoman, and generator-cg-angular running under node.js

To install node.js check out the node.js web site at http://nodejs.org

Once you have node.js installed on your system you can install the build tools using the following command:

    npm install -g grunt-cli yo generator-cg-angular

# Building the site

After you clone the repository run the following commands:

    npm install
    
    bower install
    
Once the dependencies have been installed you can build the project and view in a browser using the following:

    grunt serve
    
Launch a browser and navigate to http://localhost:9001

To build the distribution files use the following:

    grunt build
    
To run the unit tests use the following:

    grunt test
    
    
    