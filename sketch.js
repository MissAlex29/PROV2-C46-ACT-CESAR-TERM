//Estados del Juego
var PLAY=1;
var END=0;
var gameState=1;

var sponge,plate,cat,dog,plateGroup,petsGroup, score,r,randomPlate,position;
var spongeImage , pet1Img, pet2Img ,plate, gameOverImage;
var gameOverSound;

var score = 0;
var lifes = 3;

function preload(){
  backgroundImg = loadImage("bg2.png");
  spongeImage = loadImage("sponge.png");

  moneyImg = loadImage("Money.png");
  angryImg = loadImage("angryChef.png");

  plateImage = loadImage("Plate.png");
  glassimg = loadImage("glass.png");
  skilletimg = loadImage("skillet.png");

  pet1Img = loadImage("Pet1.png"); 
  pet2Img = loadImage("Pet2.png"); 

  notaImg1 = loadImage("nota.png");
  notaImg2 = loadImage("nota2.png");
  plumImg = loadImage("plum.png");
}

function setup() {
  createCanvas(800, 600);
  background(0);
  
  //Esponja 
  sponge = createSprite(200,200,20,20);
  sponge.addImage(spongeImage);
  sponge.scale = 0.1;
  sponge.setCollider("circle",0,0,230);
  

  //Money
  money = createSprite(545,40,20,20);
  money.addImage(moneyImg);
  money.scale = 0.1;

  //Chef molesto
  angry = createSprite(180,120,20,20);
  angry.addImage(angryImg);
  angry.scale = 0.3;
  angry.visible = false;
  
  petsGroup = createGroup();
  btGroup = createGroup();
  plateGroup = createGroup();

}

function draw() {
  background(255);
  background(backgroundImg);
    
  pets();
  bonus();
  showPlates();
  
  //Movimiento de esponja
  sponge.y = World.mouseY;
  sponge.x = World.mouseX;
  //draw
  if(plateGroup.isTouching(sponge)){
      angry.visible = false;
      plateGroup.destroyEach();
      score = score +10;
  } else if(petsGroup.isTouching(sponge)){
    angry.visible = true; 
    petsGroup.destroyEach();
    score = score -10;
    lifes = lifes -1;
    } else {
      if(btGroup.isTouching(sponge)){
        angry.visible = false;
        btGroup.destroyEach();
        score = score +20;
      }
    }

  textSize(25);
  fill(255);
  text("Dinero: $"+score,580,50);
  text("Intentos: "+lifes,380,50);
  drawSprites();
 
}


function pets(){
  if(World.frameCount%200===0){
    sponge.addImage(spongeImage);
    
    pet = createSprite(300,10,25,25);
    pet.velocityY =(8+(score/10));

    var  R =Math.round(random(1,2));
    if(R===1){
    pet.addImage(pet1Img);
    pet.scale = 0.1;
    }
    else{
      pet.addImage(pet2Img);
      pet.scale = 0.1;
    }
    pet.x = Math.round(random(100,680));
    pet.setLifetime = 100; 
    petsGroup.add(pet);
  }
}

function showPlates(){
  if(World.frameCount%80===0){
    sponge.addImage(spongeImage);
    
    position = Math.round(random(1,2));
    plate=createSprite(400,200,20,20);
   
    //utilizando la variable aleatoria, 
    //cambia la posición para hacerlo más desafiante
    if(position==1){
      plate.x=500;
      plate.velocityX=-(7+(score/4));
      } else {
      if(position==2){
        plate.x=50;
        //Incrementa la velocidad de los platos, 
        //después de que la puntuación sea 4 o 10
        plate.velocityX= (7+(score/4));
      }
    }
    
    plate.scale=0.2;
    
    r=Math.round(random(1,3));

    if (r == 1) {
      plate.addImage(glassimg);
      //plate.scale = 0.2;
    } else if (r == 2) {
      plate.addImage(skilletimg);
      plate.scale = 0.05;
    } else {
      plate.addImage(plateImage);
      plate.scale = 0.3;
    }
    
    plate.y=Math.round(random(50,450));
    plate.setLifetime=100;
    plateGroup.add(plate);
  }
}

function bonus(){
  if(World.frameCount%1333===0){
    sponge.addImage(plumImg);
    bonus_track = createSprite(300,10,25,25);
    bonus_track.velocityY =(8+(score/10));

    var  R =Math.round(random(1,2));
    if(R===1){
      bonus_track.addImage(notaImg1);
      bonus_track.scale = 0.1;
    }
    else{
      bonus_track.addImage(notaImg2);
      bonus_track.scale = 0.1;
    }
    bonus_track.x = Math.round(random(100,680));
    bonus_track.setLifetime = 100; 
    btGroup.add(bonus_track);
  }
}

