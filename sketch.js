var dog, happyDog,database,foodStock,dogS,hTime;

function preload()
{
dog = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dogS = createSprite(250,250,10,10);
  var foodS = database.ref("Food");
  foodS.on("value",readStock);
  dogS.addImage("dog",dog);
  dogS.scale = 0.2;
  hTime =60;
}


function draw() {  
  background(46,139,87);
  
  if(foodStock!==undefined){
    
    dogS.scale = 0.2;
if(keyWentDown(UP_ARROW)&&foodStock!==0){
  writeStock(foodStock);
  dogS.addImage("dog",happyDog);
  hTime = 60;
}
if(keyCode ===UP_ARROW){
  if(hTime>0){
hTime=hTime-1;

  }
  if(hTime===0){
    dogS.addImage("dog",dog);
  }

}
if(keyCode === 32){
  foodStock=20;
  
}
console.log(foodStock);
fill ("white");
textSize(15);
text ("Food Remaining:"+foodStock,200,100);
textSize(10);
text("Press up arrow to feed the dog milk and once the food finishes press space to buy more food ",10,50)
  }
  drawSprites();
  

}

function readStock(data){
 foodStock = data.val();
 
}
function writeStock(x){
  if(x>0){
  x=x-1;
  }
  database.ref('/').set({
    "Food" :x
  })

}
