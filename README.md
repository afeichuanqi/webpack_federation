## 遇到的问题

在使用模块联邦的时候发现远程库总是加载不进来。 

## 问题的定位

tsconfig中module设置了commonjs也就是导致ts转义成js的时候 不认识代码 从而导致加载错误。

## 问题的解决

tsconfig中module设置成es6 或者esnext