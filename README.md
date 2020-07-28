# README

### Getting Started:

`bundle install` => will install your dependencies

`rake db:create` => create your development/test databases
`rake db:migrate` => create all the tables in your database
`rake db:seed` => populate the database with data


### Updating

`bundle install` => will install any new dependencies added
`rake db:reset` => will delete db, create db, migrate, and add new seed data

### api

routes:
  - `index` will return all of the resource (ie all projects)
  - `show` will return one of the specified resource (ie one project)
  - `create` will try to create a new resource (ie create a new project)
  - `update` will try to update an existing resource (ie update a project)
  - `destroy` will try to delete an existing resource (ie delete a project)

`GET    /api/v1/projects/:id`
- This means send a `GET` request to `/api/v1/projects/:id` where `:id` is the id of the resource.


`rake routes | grep project` => Will show you all the api endpoints for projects

`rake routes | grep user` => will show you all the api endpoints for users

`rake routes | grep tag` => will show you all the api endpoints for tags

`rake routes | grep message` => will show you all the api endpoints for messages

`rake routes | grep vote` => will show you all the api endpoints for votes