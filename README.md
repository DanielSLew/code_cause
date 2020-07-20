# README

Getting Started:

`bundle install` => will install your dependencies

`rake db:create` => create your development/test databases
`rake db:migrate` => create all the tables in your database
`rake db:seed` => populate the database with data


`bundle update` => will install any new dependencies added

api:

routes:
  - `index` will return all of the resource
  - `show` will return one of the specified resource
  - `create` will try to create a new resource
  - `update` will try to update an existing resource
  - `destroy` will try to delete an existing resource

`GET    /api/v1/projects/:id`
- This means send a `GET` request to `/api/v1/projects/:id` where `:id` is the id of the resource.


`rake routes | grep project` => Will show you all the api endpoints for projects

`rake routes | grep user` => will show you all the api endpoints for users