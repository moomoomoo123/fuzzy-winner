objects = [];
alarm = "";
status1 = "";

function preload() {
    alarm = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status1").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status1 != "") 
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status1").innerHTML = "Status: Object Detected";
        
            if(objects[i].label == "person") {
                document.getElementById("status2").innerHTML = "Baby Found";
                console.log("stop");
                alarm.stop()
            }
            else {
                document.getElementById("status2").innerHTML = "Baby Not Found";
                console.log("play");
                alarm.play()
            }
        } 
        alarm.stop();
    }
    else {
        document.getElementById("status2").innerHTML = "Baby Not Detected";
        alarm.play();
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("Model initialized!!!")
    status1 = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}