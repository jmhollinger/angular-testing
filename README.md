# StatusLex
New and Improved Angular version of StatusLex

StatusLex is a client-side databrowser for data released by the City of Lexington, KY through its CKAN Open Data Portal.

### Basic Setup

Each dataset has two sets of controllers, templates, and routing. One for the search page, and a second for the record detail page. The syntax is largely the same from dataset to dataset, so it is essentially a matter of defining the CKAN resource as a variable, inserting the fields you want to display in the template, and defingin the routing to those templates. 
