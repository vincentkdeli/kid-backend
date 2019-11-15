export default class Response {
  constructor () {
    this.code = null
    this.type = null
    this.data = null
    this.errorMessage = null
  }
  
  setSuccess (code, status, data) {
    this.code = code
    this.status = status
    this.data = data
    this.type = 'success'
  }
  
  setError (code, status, errorMessage) {
    this.code = code
    this.status = status
    this.errorMessage = errorMessage
    this.type = 'error'
  }
  
  send (res) {
    const { code, status, data } = this
    const result = { code, status, data }
    if (this.type === 'success') {
      return res.status(this.code).json(result)
    }
    return res.status(this.code).json({
      code: this.code,
      status: this.status,
      errors: this.errorMessage
    })
  }
}
