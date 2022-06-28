import { Navigate, useLocation, useNavigate } from "react-router-dom"

async function resolvePromise(promise) {
  return await promise
}

export default function Guard({ element, meta, onRouteBefore }) {
  meta = meta || {}
  const location = useLocation()
  const { pathname } = location 
  const navigate = useNavigate()
  console.log('guardPathName', pathname)
  
  if (onRouteBefore) {
    const pathRes = onRouteBefore({ pathname, meta })
    console.log('pathRes', pathRes)
    if (Object.prototype.toString.call(pathRes).indexOf('Promise') !== -1) {
      console.log('pathResIsPromise')
      const res = resolvePromise(pathRes)
      if (res && res !== pathname) {
        navigate(res, { replace: true })
      }
    }
    if (pathRes && pathRes !== pathname) {
      console.log('redirect')
      element = <Navigate to={pathRes} replace={true}></Navigate>
    }
  }
  return element
}