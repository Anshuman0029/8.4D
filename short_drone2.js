const { json } = require('body-parser');
const mqtt = require('mqtt')
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
var topic="drone/short_drone2"
//var message="My message" 
var drone = {id:"4", name:"short_drone2", battery:"100%", longitude:"38°",latitude:"32°", altitude:10,speed:15, time_in_minutes: new Date().getMinutes()}
//var topic1 = "";
client.on('connect', () =>
{
    
    console.log("MQTT connected  "+ client.connected);
    setInterval(function(){
          drone.battery = Math.floor((Math.random() * 100) + 1);
          drone.longitude = Math.floor((Math.random() * 180) + 1);
          drone.latitude = Math.floor((Math.random() * 90) + 1);
          drone.altitude = Math.floor((Math.random() * 100) + 1);
          drone.speed = Math.floor((Math.random() * 100) + 1);
          drone.time_in_minutes = new Date().getMinutes();
        
      
          var message = JSON.stringify(drone);
          client.publish(topic,JSON.stringify(drone));
          console.log(message);

    },10000);
                  
                    
                 
});
       































/*
var mqtt = require('mqtt')
// const device = {
//   name: "Heater",
//   temperature:""
// }
var Broker_URL = 'mqtt://broker.hivemq.com:1883';
var client  = mqtt.connect(Broker_URL);

var MIN_PER_RANK =75
var MAX_PER_RANK =100

client.on('connect', function () {
    console.log("MQTT connected  "+ client.connected);
    setInterval(function(){
      var random = String(Math.floor(Math.random() * (MAX_PER_RANK - MIN_PER_RANK  + 1) + MIN_PER_RANK));
      // device.temperature= random;
      client.publish("/2010993024/devicedata",random);
      console.log(random);
    },3000);
})

*/


