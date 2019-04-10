/**
 * Plain object check
 */
// export default function isPlainObject(obj) {
//   if (typeof obj == 'object' && obj !== null) {
//     if (typeof Object.getPrototypeOf === 'function') {
//       const proto = Object.getPrototypeOf(obj)
//       return proto === Object.prototype || proto === null
//     }
//     return Object.prototype.toString.call(obj) === '[object Object]'
//   }
//   return false
// }

export default function isPlainObject(o) {
  let ctor,prot

  if (isObjectObject(o) === false) return false

  // If has modified constructor
  ctor = o.constructor
  if (typeof ctor !== 'function') return false

  // If has modified prototype
  prot = ctor.prototype
  if (isObjectObject(prot) === false) return false

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false
  }
  
  if (isObservable(o)) return false

  // Most likely a plain Object
  return true
}

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]'
}

function isObservable(o) {
  return isObject(o) && isFunction(o.trigger)
    && isFunction(o.on) && isFunction(o.off) && isFunction(o.one)
}

function isFunction(v) {
  return typeof v === 'function'
}
