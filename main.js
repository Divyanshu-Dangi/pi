function setup() {
  canvas = createCanvas(380,380);
  canvas.center();
}
function Start()
{
  Objectdetector=ml5.objectDetector('cocossd',modelloaded);
  document.getElementById("status").innerHTML="status:detecting objects";
}
status="";
img="";
objects =[];
function modelloaded()
{
    console.log("model is loaded");
    status=true;
    Objectdetector.detect(img,gotresults);
}

function gotresults(error,results)
{
  if(error)
  {
    console.error(error);
  }  
  else{
    console.log(results);
    objects=results;
  }
}

function preload()
{
  img=loadImage("th.jpg")
}
function draw(){
   image(img, 0,0,380,380);
   if (status!="")
   {
    Objectdetector.detect(img,gotresults);
    for(i=0;i<objects.length;i++)
    {
      document.getElementById("status").innerHTML="Status:Object Detected";
      document.getElementById("number_of_objects").innerHTML="Number of object detected are:"+objects.length;

      fill("#ed051a");
      percent= floor(objects[i].confidence*100);
      text(objects[i].label+ " " + percent + "%",objects[i].x+15,objects[i].y+15);
      noFill();
      stroke("#ed051a");
      rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
   }
}