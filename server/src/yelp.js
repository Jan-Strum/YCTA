const { RESTDataSource } = require('apollo-datasource-rest')

class YelpAPI extends RESTDataSource {
  constructor() {
    super()
    this.locations = ''
  }
}
