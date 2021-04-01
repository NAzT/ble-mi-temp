const mqtt = require("mqtt");

let xq = [
  'MQTT_HOST',
  'MQTT_PORT',
  'MQTT_USERNAME',
  'MQTT_PASSWORD',
  'MQTT_PREFIX',
]

process.env.MQTT_HOST = 'localhost'
process.env.MQTT_PORT = 1883
process.env.MQTT_USERNAME = "test"
process.env.MQTT_PASSWORD = "test"
process.env.MQTT_PREFIX = "BLE/xiaomi/"

let xx = xq.map((k) => Object.keys(process.env).includes(k))

for (const item of xq) {
  console.log('>', process.env[item] ? '[found]' : '', item, ':', process.env[item])
}

xx = xx.filter((x) => x == true)

if (xx.length !== xq.length) {
  console.error('Invalid MQTT arguments')
  process.exit(-1)
}

const client = mqtt.connect({
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  // will: {
  //   topic: `lwt/processing.js/${process.env.PROCESSOR_ID}`,
  //   payload: 'DEAD',
  //   qos: 1,
  //   retain: true,
  // },
})

client.on("connect", function () {
  console.log(`mqtt connected.`);
  //   client.subscribe("presence", function (err) {
  //     if (!err) {
  //         console.lo
  //     }
  //   });
});

client.on("message", function (topic, message) {
  console.log(message.toString());
});

module.exports = {
  client,
  publish: (topic, message, opts) => {
    client.publish(topic, message, opts);
  },
};
