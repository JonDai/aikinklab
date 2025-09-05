// Polyfills for Jest testing environment
import { TextEncoder, TextDecoder } from 'util'

// Polyfill TextEncoder and TextDecoder for Node.js
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Polyfill URL for Node.js environments that might not have it
import { URL, URLSearchParams } from 'url'
global.URL = URL
global.URLSearchParams = URLSearchParams

// Polyfill Blob if not available
if (typeof global.Blob === 'undefined') {
  global.Blob = class Blob {
    constructor(parts, options) {
      this.parts = parts || []
      this.type = options?.type || ''
      this.size = this.parts.reduce((size, part) => size + (part.length || 0), 0)
    }
    
    slice(start = 0, end = this.size, contentType = '') {
      return new Blob(this.parts.slice(start, end), { type: contentType })
    }
    
    text() {
      return Promise.resolve(this.parts.join(''))
    }
    
    arrayBuffer() {
      return Promise.resolve(new ArrayBuffer(this.size))
    }
  }
}

// Polyfill File if not available
if (typeof global.File === 'undefined') {
  global.File = class File extends global.Blob {
    constructor(parts, name, options) {
      super(parts, options)
      this.name = name
      this.lastModified = options?.lastModified || Date.now()
    }
  }
}

// Polyfill FormData if not available
if (typeof global.FormData === 'undefined') {
  global.FormData = class FormData {
    constructor() {
      this.data = new Map()
    }
    
    append(key, value, filename) {
      if (!this.data.has(key)) {
        this.data.set(key, [])
      }
      this.data.get(key).push({ value, filename })
    }
    
    delete(key) {
      this.data.delete(key)
    }
    
    get(key) {
      const values = this.data.get(key)
      return values ? values[0].value : null
    }
    
    getAll(key) {
      const values = this.data.get(key)
      return values ? values.map(v => v.value) : []
    }
    
    has(key) {
      return this.data.has(key)
    }
    
    set(key, value, filename) {
      this.data.set(key, [{ value, filename }])
    }
    
    entries() {
      const entries = []
      this.data.forEach((values, key) => {
        values.forEach(({ value }) => {
          entries.push([key, value])
        })
      })
      return entries[Symbol.iterator]()
    }
    
    keys() {
      return this.data.keys()
    }
    
    values() {
      const values = []
      this.data.forEach((vals) => {
        vals.forEach(({ value }) => {
          values.push(value)
        })
      })
      return values[Symbol.iterator]()
    }
    
    [Symbol.iterator]() {
      return this.entries()
    }
  }
}

// Polyfill Headers if not available
if (typeof global.Headers === 'undefined') {
  global.Headers = class Headers {
    constructor(init) {
      this.headers = new Map()
      
      if (init) {
        if (init instanceof Headers) {
          init.headers.forEach((value, key) => {
            this.headers.set(key.toLowerCase(), value)
          })
        } else if (Array.isArray(init)) {
          init.forEach(([key, value]) => {
            this.headers.set(key.toLowerCase(), String(value))
          })
        } else {
          Object.entries(init).forEach(([key, value]) => {
            this.headers.set(key.toLowerCase(), String(value))
          })
        }
      }
    }
    
    append(key, value) {
      const existing = this.headers.get(key.toLowerCase())
      if (existing) {
        this.headers.set(key.toLowerCase(), `${existing}, ${value}`)
      } else {
        this.headers.set(key.toLowerCase(), String(value))
      }
    }
    
    delete(key) {
      this.headers.delete(key.toLowerCase())
    }
    
    get(key) {
      return this.headers.get(key.toLowerCase()) || null
    }
    
    has(key) {
      return this.headers.has(key.toLowerCase())
    }
    
    set(key, value) {
      this.headers.set(key.toLowerCase(), String(value))
    }
    
    entries() {
      return this.headers.entries()
    }
    
    keys() {
      return this.headers.keys()
    }
    
    values() {
      return this.headers.values()
    }
    
    forEach(callback, thisArg) {
      this.headers.forEach((value, key) => {
        callback.call(thisArg, value, key, this)
      })
    }
    
    [Symbol.iterator]() {
      return this.entries()
    }
  }
}

// Polyfill Request if not available
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init = {}) {
      if (input instanceof Request) {
        this.url = input.url
        this.method = init.method || input.method
        this.headers = new Headers(init.headers || input.headers)
        this.body = init.body !== undefined ? init.body : input.body
      } else {
        this.url = String(input)
        this.method = init.method || 'GET'
        this.headers = new Headers(init.headers)
        this.body = init.body || null
      }
      
      this.cache = init.cache || 'default'
      this.credentials = init.credentials || 'same-origin'
      this.mode = init.mode || 'cors'
      this.redirect = init.redirect || 'follow'
      this.referrer = init.referrer || 'about:client'
      this.referrerPolicy = init.referrerPolicy || ''
      this.integrity = init.integrity || ''
      this.keepalive = init.keepalive || false
      this.signal = init.signal || null
    }
    
    clone() {
      return new Request(this.url, {
        method: this.method,
        headers: this.headers,
        body: this.body,
        cache: this.cache,
        credentials: this.credentials,
        mode: this.mode,
        redirect: this.redirect,
        referrer: this.referrer,
        referrerPolicy: this.referrerPolicy,
        integrity: this.integrity,
        keepalive: this.keepalive,
        signal: this.signal
      })
    }
  }
}

// Polyfill Response if not available
if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init = {}) {
      this.body = body
      this.status = init.status || 200
      this.statusText = init.statusText || ''
      this.headers = new Headers(init.headers)
      this.ok = this.status >= 200 && this.status < 300
      this.redirected = init.redirected || false
      this.type = init.type || 'default'
      this.url = init.url || ''
    }
    
    clone() {
      return new Response(this.body, {
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
        redirected: this.redirected,
        type: this.type,
        url: this.url
      })
    }
    
    async text() {
      if (typeof this.body === 'string') {
        return this.body
      }
      return String(this.body || '')
    }
    
    async json() {
      const text = await this.text()
      return JSON.parse(text)
    }
    
    async blob() {
      return new Blob([await this.text()])
    }
    
    async arrayBuffer() {
      const text = await this.text()
      const buffer = new ArrayBuffer(text.length)
      const view = new Uint8Array(buffer)
      for (let i = 0; i < text.length; i++) {
        view[i] = text.charCodeAt(i)
      }
      return buffer
    }
  }
}

// Polyfill AbortController if not available
if (typeof global.AbortController === 'undefined') {
  global.AbortController = class AbortController {
    constructor() {
      this.signal = {
        aborted: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }
    }
    
    abort() {
      this.signal.aborted = true
    }
  }
}