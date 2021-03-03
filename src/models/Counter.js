module.exports = class Counter {
  count = 0
  constructor(data) {
    if (!data) data = {}
    this.count = data.count || 0
    this.onChange = data.onChange || null
  }
  up = (count) => {
    this.count += count || 1
    if (this.onChange) this.onChange(this.count)
  }
  down = (count) => {
    this.count -= count || 1
    if (this.onChange) this.onChange(this.count)
  }
}
