# Resources

- https://martinfowler.com/articles/micro-frontends.html
- https://dev.to/kpiteng/microfrontends-with-react-47jb

# Description

- Microservices are really cool and flexible on the backend (with lots of complexity).
- Microfrontends are really cool and flexible on the frontend (with lots of complexity)

# Single SPA

create wrapper with `npx create-single-spa --moduleType root-config`

create wrapped with `npx create-single-spa --moduleType app-parcel`

wrapped components will easiest to deploy on subpaths. Get webpack to build them in sub-directories like this:

webpack.config.js
```js
...
    return merge(defaultConfig, {
    ...
        output: {
            path: path.resolve('./dist/serve/<subpath>'),
            publicPath: '/serve/<subpath>/',
        }
    ...
    });
...
```
We are prepending the /serve path to avoid path conflicts with the production routes.
