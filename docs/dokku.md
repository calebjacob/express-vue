# Deploying With Dokku

The easiest way to get any Node app running is to use Dokku. Spin up a Dokku droplet on Digital Ocean: [Dokku Droplet by Digital Ocean](https://www.digitalocean.com/products/one-click-apps/dokku/)

**Note:** *Droplet must have at least 1GB of RAM or else the build will fail.*

Here are some miscellaneous tips:

##### Configure .env File

TODO: Need to figure out how to set up `.env` file via Dokku. Should contain `NODE_ENV=production`...

##### Add Git Remote to Deploy:

```
git remote add dokku dokku@mydomain.com:my-app-name
git push dokku master
```

##### Routing App to Root Domain:

```
dokku domains:add my-app-name mydomain.com
```

##### Configure SSL/HTTPS Via Let's Encrypt:

Read documentation here: [Dokku - Let's Encrypt](https://github.com/dokku/dokku-letsencrypt)

##### App Crash Restart Policy:

```
dokku ps:set-restart-policy my-app-name always
```

##### Check Error Logs:

```
dokku ls
docker logs <container ID>
```

##### More Dokku Documentation:

For info on setting up other plugins (databases, etc), read this documentation: [Dokku - Application Deployment](http://dokku.viewdocs.io/dokku/deployment/application-deployment/)