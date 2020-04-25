# creates a model and migration file

sequelize model:create --name post --attributes content:string

# to migrate to specific environment

sequelize db:migrate —-env development

# for associations

https://sequelize.org/master/manual/assocs.html

# to generate plain migration file

sequelize migrate:grenerate --name post
