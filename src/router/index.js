import { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { routes, onRouteBefore} from './routes'

import Guard from './guard'

function transformRoutes (routeList) {
  const list = []
  routeList.forEach(route => {
    const obj = { ...route }
    if (obj.path == undefined) {
      // forEach return跳出本次循环进入下一轮
      return
    }
    if (obj.redirect) {
      obj.element = <Navigate to={obj.redirect} replace={true}></Navigate>
    } else if (obj.component) {
      obj.element = layzLod(obj.component, obj.meta || {})
    }
    delete obj.component
    delete obj.redirect
    delete obj.meta
    if (obj.children) {
      obj.children = transformRoutes(obj.children)
    }
    list.push(obj)
  })
  return list
}

function layzLod (importFn, meta) {
  const Element = lazy(importFn)
  const lazyElement = (
    <Suspense fallback={<div>懒加载中</div>}>
      <Element _meta={meta}></Element>
    </Suspense>
  )
  return <Guard element={lazyElement} meta={meta} onRouteBefore={onRouteBefore}></Guard>
}

export default function GenerateRoutes() {
  const reactRoutes = transformRoutes(routes)
  const elements = useRoutes(reactRoutes)
  return elements
}