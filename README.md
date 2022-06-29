#
学习使用React Hook + React-Router-V6 + Redux RDT
##
2022-06-27 实现模拟登录+redux toolkit存储用户信息<br />
<br />
~~本想redux使用createAsyncThunk实现内部异步登录，但useNavigate Hook需要在函数组件内使用。<br/>
最终以按钮onClick调用api实现登录与同步redux用户信息。~~<br />
改为createAsyncThunk实现异步登录 具体实现在源码注释。
##
2022-06-28 路由生成+权限验证+懒加载<br />
模拟登录返回用户路由权限ID集合<br />
使用高阶组件对真实路由页面进行包装以及验证路由权限。<br />
权限路由一般有3种方式：<br />
1、后台返回完整路由表，根据返回路由表的key与前端路由组件映射替换。<br />
2、权限角色定死不可配置，由前端根据需求重新分配角色可用路由。<br />
**3、后台返回用户所有可用路由ID，在跳转时路由守卫进行判断。(本demo选用的方案)**
##
2022-06-29 菜单列表生成(antd v4.20.0 及以上用法)<br />
目前存在二级菜单在展开的情况下，收缩菜单栏会有闪烁<br />
见https://github.com/ant-design/ant-design/issues/36152
