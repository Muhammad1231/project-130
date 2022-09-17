leftWristX=0;
leftWristY=0;
rightWristX=0;
leftWristY=0;

scoreLeftWrist=0;
status=""
song1_status=""
song2_status=""
scoreRightWrist=0;

function modelLoaded(){
    console.log("PoseNet Is Initialzied");
}
 
 
 song1="music.mp3";
song2="music2.mp3";




 function preload()
 {
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
    
 }

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);
        console.log("scoreRightWrist = "+scoreRightWrist + "scoreLeftWrist = "+scoreLeftWrist);
       
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = ") + leftWristX +"leftWristY = "+ leftWristY;


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX + "rightWristY = "+rightWristY);
    }
}

function draw(){

    image(video,0,0,600,500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
if(scoreRightWrist>0.2)
{
    fill("#FF0000");
    stroke("#FF0000");

    circle(rightWristX, rightWristY,20);
    if(rightWristY >0 && rightWristY <=100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY <=200)
    {
        document.getElementById("speed").innerHTML = "Speed =1x";
        song.rate(1);
    }
    else if(rightWristY >200 && rightWristY <=300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY<=400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if (rightWristY > 400 && rightWristY <=500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2.5);
    }

}
   

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing- Peter Pan Song"
            
            
        
        }
    }


}

function play()
 {
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
 }
