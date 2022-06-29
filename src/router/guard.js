import { Navigate, useLocation, useNavigate } from "react-router-dom"

async function resolvePromise(promise) {
  return await promise
}

export default function Guard({ element, meta, onRouteBefore }) {
  meta = meta || {}
  const location = useLocation()
  const { pathname } = location 
  const navigate = useNavigate()
  
  if (onRouteBefore) {
    const pathRes = onRouteBefore({ pathname, meta })
    if (Object.prototype.toString.call(pathRes).indexOf('Promise') !== -1) {
      const res = resolvePromise(pathRes)
      if (res && res !== pathname) {
        navigate(res, { replace: true })
      }
    }
    if (pathRes && pathRes !== pathname) {
      element = <Navigate to={pathRes} replace={true}></Navigate>
    }
  }
  return element
}