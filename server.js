const mqtt = require('mqtt');
// const randomCoordinates = require('random-coordinates');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anshuman:9351919275@cluster0.kbo3ozz.mongodb.net/demo', {useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const bodyParser = require('body-parser');
const Device = require('./models/device');
const { db, collection } = require('./models/device');
const app = express();
app.use(express.static('public'));
const topic = "drone/#"
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var count =0;
const port = 5001;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    client.subscribe(topic); 
    console.log('mqtt connected');
});

client.on('message', async function (topic, payload) {
  const obj = JSON.parse(payload.toString()) // payload is your JSON as string
  //console.log(obj);
  const newDevice = new Device({
     id: obj.id,
     name: obj.name,
     battery: obj.battery,
     longitude: obj.longitude,
     latitude: obj.latitude,
     altitude: obj.altitude,
     speed: obj.speed,
     time_in_minutes: obj.time_in_minutes,

  })
  
  

  
//newDevice.save();
//   Device.find({"name": "drone"}, (err, device) => {
//   if (err) {
//          console.log(err)
//   }
//   console.log(device);
//   var mysort = { time_in_minutes: -1 };
//   db.collection("test").find().sort(mysort).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     var time1 = result[0].time_in_minutes;

//     var a;
    
//     if(time1 > 10)
//     {
//         a = time1 - 2;
//     }
//     else if (time1 <=10)
//     {
//         a = (60-10) + time1; 
//     }
  
//      Device.findOne({"time_in_minutes": a}, (err, dev) => {
//       if (err) {
//              console.log(err)
//       }
//       console.log(dev);
//       if(result[0].longitude == dev.longitude && result[0].latitude == dev.latitude)
//       {
//           console.log("Drone is stationary");
//       }
//       else
//       {
//           console.log("Drone is not stationary");
//       }
//      })
    
//   });
  
 
// })




    
 


})



function stationary(drone)
{
   Device.find({"name": `${drone}`}, (err, device) => {
    if (err) {
           console.log(err)
    }
    console.log(device);
    var mysort = { time_in_minutes: -1 };
  
    db.collection("test").find({"name":`${drone}`}).sort(mysort).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      var time1 = result[0].time_in_minutes;
  
      var a;
      
      if(time1 > 10)
      {
          a = time1 - 1;
      }
      else if (time1 <=10)
      {
          a = (60-10) + time1; 
      }
    
       Device.findOne({$and: [
        {
          "name": `${drone}`
        },
        {
          "time_in_minutes": a
        }
        ]}, (err, dev) => {
        if (err) {
               console.log(err)
        }
        console.log(dev);
        if(result[0].longitude == dev.longitude && result[0].latitude == dev.latitude)
        {
            console.log(`${drone}` +" is stationary");
        }
        else
        {
            console.log(`${drone}`+" is not stationary");
        }
       })
      
    });
    

})
}


function battery_level(callback)
{
    var i; 
  
     Device.find({}, (err, device) => {
    if (err) {
               console.log(err)
    }
  
    
    for (const d of device) {
        console.log(d);
        if(d.battery < 10)
        {
            count++;
        }
    }
    if(count > 2)
    {
        console.log("Battery level of more than two drones is below 10");
    }
    console.log(count);
  })
  

}
setInterval(battery_level, 4000);
// setInterval(stationary, 4000, "long_drone1");
// setInterval(stationary, 4000, "long_drone2");
// setInterval(stationary, 4000, "short_drone1");
// setInterval(stationary, 4000, "short_drone2");
/*
setInterval(function () {

  
  //  Device.find({"name": "drone"}, (err, device) => {
  // if (err) {
  //        console.log(err)
  // }
  // console.log(device);
  // var mysort = { time_in_minutes: -1 };
  // db.collection("test").find().sort(mysort).toArray(function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   var time1 = result[0].time_in_minutes;

  //   var a;
    
  //   if(time1 > 10)
  //   {
  //       a = time1 - 2;
  //   }
  //   else if (time1 <=10)
  //   {
  //       a = (60-10) + time1; 
  //   }
  
  //    Device.findOne({"time_in_minutes": a}, (err, dev) => {
  //     if (err) {
  //            console.log(err)
  //     }
  //     console.log(dev);
  //     if(result[0].longitude == dev.longitude && result[0].latitude == dev.latitude)
  //     {
  //         console.log("Drone is stationary");
  //     }
  //     else
  //     {
  //         console.log("Drone is not stationary");
  //     }
  //    })
    
  // });
  
 
})

*/





  //   )}
