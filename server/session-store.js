const getRedisSId = (sid) => {
  return `ssid:${sid}`
}


class RedisSessionStore {

  constructor (client) {
    this.client = client
  }

  async get (sid) {
    const id = getRedisSId(sid)
    const data = await this.client.get(id)

    if (!data) {
      return null
    }

    try {
      const result = JSON.parse(data)
      return result
    } catch (e) {
      console.log(e)
    }
  }

  async set (sid, value, timestamp) {
    const id = getRedisSId(sid)
    
    try {
      const result = JSON.stringify(value)

      if (timestamp && typeof timestamp === 'number') {
        timestamp = (timestamp / 1000) | 0
        await this.client.setex(id, timestamp, result)
      } else {
        await this.client.set(id, result)
      }

    } catch (e) {
      console.error(e)
    }
  }

  async destroy (sid) {
    const id = getRedisSId(sid)
    await this.client.del(id)
  }
}

module.exports = RedisSessionStore