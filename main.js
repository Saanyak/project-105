Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 90
});

var camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log('ml5 version : ',ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/gR5jy1ATb/",modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function show_results() {
    var img = document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}

function gotresult(error,results) {
        if(error) {
            console.error;
        }
        else {
            console.log(results);
            document.getElementById("result_object_name").innerHTML = results[0].label;
            document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
        }
    }