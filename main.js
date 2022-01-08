song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftScore = 0;
rightScore = 0;
songFile = "";
function preload() {
    song = loadSound("PeterPan.mp3");
    songFile = loadSound("Nightlight.mp3");
}
function setup() {
    canvas = createCanvas(450, 450);
    canvas.position(560, 200);

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log('Posenet is initialized');
}
function draw() {
    image(video, 0, 0, 600, 500)
    fill("#ed1c24");
    stroke("#cb4154");
    SongStats1 = song.isPlaying();
    SongStats2 = songFile.isPlaying();
    if (leftScore > 0.2) {
        songFile.stop()
        if (SongStats1 == false) {
            song.play()
            document.getElementById("LaBelleName").innerHTML = "Playing Peter Pan";
        }
        if (rightScore > 0.2) {
            song.stop()
            if (SongStats2 == false) {
                songFile.play()
                document.getElementById("LaBelleName").innerHTML = "Playing Nightlight";
            }
        }
    }
}
    function gotPoses(results) {
        if (results.length > 0) {

            console.log(results)

            rightScore = results[0].pose.keypoints[10].score;

            console.log("Right Wrist Score = " + rightScore + "Left Wrist Score = " + leftScore);

            leftScore = results[0].pose.keypoints[9].score;

            console.log("Left Wrist Score =" + leftScore);

            leftWristX = results[0].pose.leftWrist.x;

            rightWristX = results[0].pose.rightWrist.x;

            leftWristY = results[0].pose.leftWrist.y;

            rightWristY = results[0].pose.rightWrist.y;
        }
    }