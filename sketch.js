var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImage, zombie, zombieGroup
var bullet,bulletGroup
var heart1 , heart2 , heart3
var heart1Image,heart2Image , heart3Image
var bullets=70
var gameState="fight"
var life=3
var score=0
var lose
var win,explosionSound

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImage = loadImage("assets/zombie.png")
  heart1Image = loadImage("assets/heart_1.png")
  heart2Image = loadImage("assets/heart_2.png")
  heart3Image = loadImage("assets/heart_3.png")

  lose=loadSound("assets/lose.mp3")
  win=loadSound("assets/win.mp3")
  explosionSound=loadSound("assets/explosion.mp3")
  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
heart1=createSprite(displayWidth-150,40,20,20)
heart1.addImage("heart1",heart1Image)
heart1.visible=false
heart1.scale=0.3

heart2=createSprite(displayWidth-100,40,20,20)
heart2.addImage("heart2",heart2Image)
heart2.visible=false
heart2.scale=0.3

heart3=createSprite(displayWidth-150,40,20,20)
heart3.addImage("heart3",heart3Image)
heart3.scale=0.3

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
  
   zombieGroup=new Group()
   bulletGroup=new Group()
}


function draw() {
  background(0); 



if(gameState==="fight"){

if(life===3){
  heart3.visible=true
  heart2.visible=false
  heart1.visible=false
}

if(life===2){
  heart3.visible=false
  heart2.visible=true
  heart1.visible=false
}

if(life===1){
  heart3.visible=false
  heart2.visible=false
  heart1.visible=true
}

if(life===0){
  gameState="lost"
}

if(bullets===0){
  gameState="bullet"
  lose.play()

}

if(score===50){
  gameState="won"
  win.play()
}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  bullet=createSprite(player.x,player.y-25,15,3)
  bullet.velocityX=8    
  bulletGroup.add(bullet)
  bullets-=1
  explosionSound.play()

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  
}

if(bulletGroup.isTouching(zombieGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(bulletGroup.isTouching(zombieGroup[i])){
      bulletGroup.destroyEach()
      zombieGroup[i].destroy()
      score+=1
    }
  }
  
}

if(zombieGroup.isTouching(player)){
  lose.play()
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life-=1

    }
  }
  
}
enemy()
}
drawSprites();

textSize(20)
fill("red")
text("BULLETS="+bullets,displayWidth-210,displayHeight/2-250)
text("SCORE="+score,displayWidth-200,displayHeight/2-220)
text("LIVES="+life,displayWidth-200,displayHeight/2-280)


if(gameState==="lost"){
  textSize(100)
  fill("red")
  text("YOU LOST",400,400)
  zombieGroup.destroyEach()
  player.destroy()

}
else if(gameState==="won"){
  textSize(100)
  fill("yellow")
  text("YOU WON",400,400)
  zombieGroup.destroyEach()
  player.destroy()
  win.play()
}

else if(gameState==="bullet"){

  textSize(50)
  fill("yellow")
  text("YOU RAN OUT OF BULLETS",470,410)
   zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()

}

}


function enemy(){
  if(frameCount % 100 === 0){
    zombie=createSprite(displayWidth,random(100,500),40,40)
    zombie.addImage(zombieImage)
    zombie.velocityX=-3
    zombie.scale=0.15
    zombie.lifetime=400
    zombie.debug=true
    zombie.setCollider("rectangle",0,0,400,1000)
    zombieGroup.add(zombie)
    
  }
 
  
}