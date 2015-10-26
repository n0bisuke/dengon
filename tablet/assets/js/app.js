"use strict";

//milkcocoa
var milkcocoa = new MilkCocoa("juiceig81r3wr.mlkcca.com");
var ds = milkcocoa.dataStore('dengon');
var session = new QiSession();
var speech;

ds.on('push', function(res){
    session.service("ALMemory").done(function (ALMemory) {
      console.log("ALMemory取得成功");
      ALMemory.raiseEvent("PepperQiMessaging/fromtablet", res.value);
    });
});

session.service("ALTextToSpeech").done(function(tts) {
    speech = tts;
});

session.service("ALFaceDetectionProxy").done(function(tts) {
    tts.setRecognitionEnabled(true);
});

session.service("ALMemory").done(function (ALMemory) {
  ALMemory.raiseEvent("FaceDetected", function(res){
      speech.say(res[1][0]);
  });
});
