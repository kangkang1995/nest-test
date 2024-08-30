# 基于ACL实现权限控制

有的接口除了需要登录外，还需要权限。

只有登录用户有调用该接口的权限才能正常访问。

这节我们通过 ACL （Access Control List）的方式实现了权限控制，它的特点是用户直接和权限关联。

用户和权限是多对多关系，在数据库中会存在用户表、权限表、用户权限中间表。

登录的时候，把用户信息查出来，放到 session 或者 jwt 返回。

然后访问接口的时候，在 Guard 里判断是否登录，是否有权限，没有就返回 401，有的话才会继续处理请求。

我们采用的是访问接口的时候查询权限的方案，通过 handler 上用 SetMetadata 声明的所需权限的信息，和从数据库中查出来的当前用户的权限做对比，有相应权限才会放行。

但是这种方案查询数据库太频繁，需要用 redis 来做缓存。

当然，你选择登录的时候把权限一并查出来放到 session 或者 jwt 里也是可以的。

这就是通过 ACL 实现的权限控制。

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
