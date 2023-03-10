# http 缓存

#### 介绍

对 http 缓存的学习

### 1.强制缓存的两种

- http1.0 expires 属性
- http1.1 cache-control : max-age = 5

### 2.协商缓存 --- 前提 cache-control = no-cache

- Last-Modified 文件修改的时间
- etag 文件编译成的一个码

### 3.no-cache 与 no-store 的区别

- no-cache 表示直接走协商缓存，直接与服务器进行验证缓存的有效性。
- no-store 表示不采取任何缓存措施。
- 两者互斥，是 cache-control 的属性值。

### 4.private 和 public 的区别

- 互斥属性，用来判断相应资源是否可以被代理服务器进行缓存。
- public 表示可以被代理服务器进行缓存，也可以被浏览器进行缓存。
- private 表示只可以使用浏览器缓存。

#### 安装教程

1. npm i
2. node server.js
3. 访问 http://localhost:3000/
