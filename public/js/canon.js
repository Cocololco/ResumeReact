

class Game{
  constructor() {
    this.date = new Date('2023-09-01T00:00:00');
    this.numberOfTargets = 10;
    this.maxBounceBullet = 6;
    this.maxBounceObstacle=6;
    this.numberOfObstacles=60;
    this.numberOfCannons=2;
    this.obstacleWidth=10/3;
    this.obstacleHeight=5;
    this.obstaclesId=0;
    this.velocityBullet=.4;
    this.targetarea=[[85,0],[100,100]];
    this.initialized=false;
    this.started=false;
    this.startTime=null;
    this.exclusion_zones = [];
    this.cannons=[];
    this.obstacles = [];
    this.bullets = [];
    this.targets = [];
    this.gameArea=[[0,0],[100,100]];
    this.bulletInterval = null;

  }
  
  start(){
  }

  initializeGame() {

    if (this.initialized) return; // Avoid running the setup twice

    // Create the Playground
    this.playground = new Playground("playground", 60, 80);
    
    // Create the Cannons
    Cannon.createSeveral(this)
    
    // Create the Exclusion Zones
    ExclusionZone.createOutsideBorder(this);  
    // Create the targets
    Target.createSeveral(this);  
    // Create the Obstacles
    Obstacle.createSeveral(this);
  
    
    this.stopBulletUpdate()
    this.startBulletUpdate()
  
    setInterval(() => {
      // let obstacleToCreate = this.numberOfObstacles + this.numberOfTargets - this.obstacles;
      // obstacleToCreate = Math.min(obstacleToCreate, 2);
      // if (obstacleToCreate >= 0) {
      //   Obstacle.createSeveral(obstacleToCreate);
      // }
    }, 1000);
  
    this.initialized = true; // Mark the game as initialized



  }
  reset(){
    // Delete Bullets
    Bullet.deleteAllBullets(this);
  
    // Delete Obstacles
    Obstacle.deleteAll(this);
    Target.deleteAll(this);
    Cannon.deleteAll(this);
    ExclusionZone.deleteAll(this);
    this.initialized = false; // Mark the game as initialized
    console.log("reset finish")
    // Recreate Targets and Obstacles
    // Target.createSeveral(this);
    // Obstacle.createSeveral(this);
  }
  finish(){
    this.reset()
  }

  calculateElapsedTime(){
    const now = new Date();
    const timeDiff = now - startTime; // Difference in milliseconds

    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    setElapsedTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  
  }

  restartElapsedTime(){
    startTime = new Date('2023-09-01T00:00:00');
  }

  startBulletUpdate() {
    // Create the interval and store its ID
    this.bulletInterval = setInterval(() => {
      for (const bullet of this.bullets) {
        bullet.updatePosition(this);
      }
    }, 10);
  }

  stopBulletUpdate() {
    // Clear the interval if it exists
    if (this.bulletInterval !== null) {
      clearInterval(this.bulletInterval);
      this.bulletInterval = null; // Reset the interval ID
    }
  }

}

class  Playground{
  constructor(divId,sizex,sizey) {
      console.log("create Playground")
      this.divId = divId;
      this.sizex = sizex;
      this.sizey = sizey;
      this.div=document.getElementById(this.divId)
      this.div.style.width = `${sizex}vw`; // Adjust cannon height
      
      this.width=this.div.getBoundingClientRect().width
      this.div.style.height = `${this.width/1.5}px`;
      this.height=this.div.getBoundingClientRect().height
  }
}



class  Cannon{
  
  constructor(game,divId,positionx,positiony) {
      this.divId = divId;
      this.positionx = positionx;
      this.positiony = positiony;
      this.angle = 0;
      this.width = 10;
      this.speed = 1;
      this.aimx = 50;
      this.aimy = 50;
      this.countBullet = 0;


      // Create the cannon div dynamically
      const cannon = document.createElement("div");
      cannon.id = divId;
      cannon.classList.add("cannon"); // Assuming you have a 'cannon' class in your CSS
      this.div=cannon
      game.playground.div.appendChild(cannon); // Append to the playground
      const img=document.createElement("img")
      img.src="/img/game/tile/cannon-TopView.png"
      img.src="/img/game/tile/catapultC1.png"
      img.width = 50;

      this.img=img;
      cannon.appendChild(img)
      this.updateDiv(game);
      game.cannons.push(this);


      //create the Exlusion Zone
      this.createExclusionZone(game);

      //add the event listener
      game.playground.div.addEventListener("click", (e) => {
        const rect = game.playground.div.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;
        this.fireShot(game,(100 * cursorX) / rect.width, (100 * cursorY) / rect.height);
      });
  }
  
  static createSeveral(game) {
    let spaceY=100/(1+game.numberOfCannons)
    let positionY=100/(1+game.numberOfCannons)
    let cannonsId=0  
    for (let i = 1; i <= game.numberOfCannons; i++) {
      
      
      // Create a new obstacle and push it into the array
      new Cannon(game,`cannon${cannonsId}`, 1, positionY);
      positionY=positionY+spaceY
      
      cannonsId++
    }
  }
  updateDiv(game){
    // Get the cannon div using the ID passed during construction
    const cannonDiv = document.getElementById(this.divId);
    
    if (!cannonDiv) {
      //console.error(`Cannon div with ID ${this.divId} not found.`);
      return;
    }

    // Ensure the div has the correct class
    cannonDiv.classList.add("cannon");

    // Use getBoundingClientRect to get the actual width of the div
    const rect = cannonDiv.getBoundingClientRect();
    const width = rect.width;
    const height = width;
    
    let left=this.positionx-(this.width)/2;
    let top=this.positiony-(100*height/game.playground.height)/2;
    
    // Update the position of the cannon div
    cannonDiv.style.left = `${left}%`;
    cannonDiv.style.height = `${width}px`;
    cannonDiv.style.top = `${top}%`;
    //cannonDiv.style.height = `${width}px`;
  }
  createExclusionZone(game){
    new ExclusionZone(game,`Exclusion${this.divId}`,this.positionx,this.positiony,20,40)
  }
  fireShot(game,aimx=null,aimy=null){
    if (aimx==null){
      aimx=this.aimx;
      aimy=this.aimy;
    }
    this.aimx=aimx;
    this.aimy=aimy;
    const slopex=aimx-this.positionx
    const slopey=aimy-this.positiony
    const ratio=game.velocityBullet/Math.sqrt(slopex*slopex+slopey*slopey)
    const velocityx=slopex*ratio
    const velocityy=slopey*ratio
    const bullet = new Bullet(
      game,
      `Bullet_${this.divId}_${this.countBullet}`,
      this.divId,
      this.positionx,
      this.positiony,
      velocityx,
      velocityy
    );
    this.countBullet++
    bullet.show(game)
    this.moveCannon(aimx,aimy)
  }
  moveCannon(aimx, aimy) {
    // Calculate the angle between the cannon and the target
    const deltaX = aimx - this.positionx; // Difference in X between the target and the cannon's position
    const deltaY = aimy - this.positiony; // Difference in Y between the target and the cannon's position
  
    // Calculate the angle in degrees
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)+90; // Convert radians to degrees
  
    // Apply the rotation to the cannon div
    this.div.style.transform = `rotate(${angle}deg)`;
    //console.log(`rotate(${angle}deg)`);
  }
  delete(game){
    // Assuming bullet has an associated DOM element
    const cannonDiv = document.getElementById(this.divId);
    if (cannonDiv) {
      cannonDiv.remove(); // This removes the bullet's DOM element from the document
    }
    // Removing the bullet from the array
    const index = game.cannons.indexOf(this);
    if (index > -1) {
      game.cannons.splice(index, 1); // Remove the bullet from the array
    }
  }

  // Safely delete cannons from the array without skipping any
  static deleteAll(game) {
    // Loop backwards to avoid issues with array mutation while deleting
    for (let i = game.cannons.length - 1; i >= 0; i--) {
      game.cannons[i].delete(game); // Call the delete method for each cannon 
    }
  }
  
}

class ExclusionZone{
  constructor(game,divId,positionx,positiony,width,height) {
    //console.log("create ExclusionZone")
    this.divId = divId;
    this.positionx = positionx;
    this.positiony = positiony;
    this.width = width;
    this.height = height;
    // Create the cannon div dynamically
    const exclusionZone = document.createElement("div");
    exclusionZone.id = divId;
    exclusionZone.classList.add("exclusion"); // Assuming you have a 'cannon' class in your CSS
    game.playground.div.appendChild(exclusionZone); // Append to the playground
    this.updateDiv(game);
    game.exclusion_zones.push(this);
  }
  updateDiv(game){
    // Get the cannon div using the ID passed during construction
    const exlusion = document.getElementById(this.divId);
    
    if (!exlusion) {
      //console.error(`Exclusion Zone div with ID ${this.divId} not found.`);
      return;
    }

      
    
    let left=(this.positionx-this.width/2);
    let width=this.width;
    let top=(this.positiony-this.height/2);
    let height=this.height;
    
    // Update the position of the cannon div
    exlusion.style.left = `${left}%`;
    exlusion.style.width = `${width}%`;
    exlusion.style.top = `${top}%`;
    exlusion.style.height = `${height}%`;
  }
  delete(game){
    // Assuming bullet has an associated DOM element
    const exclusionDiv = document.getElementById(this.divId);
    if (exclusionDiv) {
      exclusionDiv.remove(); // This removes the bullet's DOM element from the document
    }
    // Removing the bullet from the array
    const index = game.exclusion_zones.indexOf(this);
    if (index > -1) {
      game.exclusion_zones.splice(index, 1); // Remove the bullet from the array
    }
  }
  // Safely delete exclusion zones from the array without skipping any
  static deleteAll(game) {
    // Loop backwards to avoid issues with array mutation while deleting
    for (let i = game.exclusion_zones.length - 1; i >= 0; i--) {
      game.exclusion_zones[i].delete(game); // Call the delete method for each exclusion zone
    }
  }

  static createOutsideBorder(game){
    const leftArea=new ExclusionZone(game,"leftArea",-5,50,11,120)
    const topArea=new ExclusionZone(game,"topArea",50,-5,120,11)
    const rightArea=new ExclusionZone(game,"rightArea",105,50,11,120)
    const bottomArea=new ExclusionZone(game,"bottomArea",50,105,120,11)
  }
}

class  Obstacle{
  constructor(game,divId,positionx,positiony,width,height,target=null) {
      //console.log("create Obstacle")
      this.divId = divId;
      this.positionx = positionx;
      this.positiony = positiony;
      this.width = width;
      this.height = height;
      this.bouncecount = 0;
      this.target=target;
      this.background="block.png"
      if(target==null){
        // Create the cannon div dynamically
        const obstacle = document.createElement("div");
        obstacle.id = divId;
        obstacle.classList.add("obstacle"); // Assuming you have a 'cannon' class in your CSS
        //obstacle.innerText=`${positionx},${positiony},${width},${height}`
        game.playground.div.appendChild(obstacle); // Append to the playground
        this.updateDiv(game);
      }
      
      game.obstacles.push(this);
      this.exclusion=new ExclusionZone(game,`Obstacle${this.divId}`,this.positionx,this.positiony,this.width+1,this.height+1)
  }

  updateDiv(game){
    // Get the cannon div using the ID passed during construction
    const obstacle = document.getElementById(this.divId);
    
    if (!obstacle) {
      //console.error(`Obstacle div with ID ${this.divId} not found.`);
      return;
    }

      
    
    let left=(this.positionx-this.width/2);
    let width=this.width;
    let top=(this.positiony-this.height/2);
    let height=this.height;
    
    // Update the position of the cannon div
    obstacle.style.left = `${left}%`;
    obstacle.style.width = `${width}%`;
    obstacle.style.top = `${top}%`;
    obstacle.style.height = `${height}%`;
    obstacle.style.backgroundImage = `url(/img/game/tile/${this.background})`;
  }

  check_count(game){
    if(this.bouncecount>=game.maxBounceObstacle*0.5){
      this.background="block_cracked.png"
      this.updateDiv(game)
    }
    if(this.bouncecount>=game.maxBounceObstacle){
      this.delete(game)
    }

  }

  delete(game){
    // Assuming bullet has an associated DOM element
    const obstacleDiv = document.getElementById(this.divId);
    if (obstacleDiv) {
      obstacleDiv.remove(); // This removes the bullet's DOM element from the document
    }
    // Removing the bullet from the array
    const index = game.obstacles.indexOf(this);
    if (index > -1) {
      game.obstacles.splice(index, 1); // Remove the bullet from the array
    }
    this.exclusion.delete(game)
    if(this.target!=null){this.target.delete(game)}

  }

  // Static method to create multiple obstacles
  static createSeveral(game) {
    for (let i = 0; i <= game.numberOfObstacles; i++) {
      let positionx,positiony,width,height;  
      [positionx,positiony,width,height]=this.generateNew(game)
      
      // Create a new obstacle and push it into the array
      new Obstacle(game,`obstacle${game.obstaclesId}`, positionx, positiony, width, height);
      game.obstaclesId++
    }
  }

  // Static method to generate coordinate of new obstacles
  static generateNew(game){ 
    let positionx,positiony,width,height; 
    let i = 0;
    let maxAttempts = 30;
    do{
      [positionx, positiony, width, height] = this.generateAttribute(game)
      i++  
    }while(this.check_if_in_exclusion_zones(game.exclusion_zones,positionx,positiony,width,height)&& i < maxAttempts)
    if (i >= maxAttempts) {
      console.warn("Max attempts reached: could not place obstacle without overlap.");
      width=0
    }else{
      // console.debug(`attempts count:`+i);
    }
    
    return [positionx,positiony,width,height]
  }
  static generateAttribute(game){
    // Generate random left and top percentages between 0 and 100
    const positionx = Math.round(0+Math.random() * 100,1); // 90 to keep obstacles inside boundaries
    const positiony = Math.round(0+Math.random() * 100,1);

    // Generate random width and height between 5% and 10%
    const width = Math.round(game.obstacleWidth + Math.round(Math.random()*0,0),1); // 5% to 10%
    const height = Math.round(game.obstacleHeight + Math.round(Math.random() * 0,0)*2,1); // 5% to 10%   
    
    return [positionx,positiony,width,height]
  }

  static check_if_in_exclusion_zones(exclusion_zones,positionx,positiony,width,height){
    const topLeft=[positionx-width/2,positiony+height/2];
    const topRight=[positionx+width/2,positiony+height/2];
    const bottomLeft=[positionx-width/2,positiony-height/2];
    const bottomRight=[positionx+width/2,positiony-height/2];
    let thereturn=0;
    //console.log("Start check of "+positionx+" "+positiony+" "+positiony+" "+height)
    for (const exclusion of exclusion_zones) {
      
        // Check if any corner of the obstacle is within the exclusion zone
        if (this.check_if_point_in_obj(topLeft, exclusion)){return true;}
        if (this.check_if_point_in_obj(topRight, exclusion)){return true;}
        if (this.check_if_point_in_obj(bottomLeft, exclusion)){return true;}
        if (this.check_if_point_in_obj(bottomRight, exclusion)){return true;}
        
        
    }
    //console.warn("no overlap ")
    return false
    
      
    
    
  }
  static check_if_point_in_obj([positionx,positiony],object){
    const ObjLeft=object.positionx-object.width/2
    const ObjRight=object.positionx+object.width/2
    const ObjTop=object.positiony-object.height/2
    const ObjBottom=object.positiony+object.height/2
    if(positionx>=ObjLeft && positionx<=ObjRight &&
      positiony>=ObjTop && positiony<=ObjBottom){
        // console.log("overlap detected",object.divId,ObjLeft , positionx,ObjRight ,
        //   "|",ObjTop , positiony,ObjBottom)
        // console.log("overlap detected")
        return true
      }
      //  console.log("no overlap detected",object.divId,ObjLeft , positionx,ObjRight ,
      //   "|",ObjTop , positiony,ObjBottom)
    return false
  }

  // Safely delete obstacles from the array without skipping any
  static deleteAll(game) {
      // Loop backwards to avoid issues with array mutation while deleting
      for (let i = game.obstacles.length - 1; i >= 0; i--) {
        game.obstacles[i].delete(game); // Call the delete method for each obstacle
      }
  }
  


}

class Bullet{
  constructor(game,divId,cannonId,positionx,positiony,velocityx,velocityy) {
    //console.log("create Bullet")
    this.divId = divId;
    this.cannonId = cannonId;
    this.positionx = positionx;
    this.positiony = positiony;
    this.velocityx = velocityx;
    this.velocityy = velocityy;
    this.game = game;
    this.width = 1;
    this.height = 1;
    this.bouncecount = 0;
    // Create the cannon div dynamically
    const bullet = document.createElement("div");
    bullet.id = divId;
    bullet.classList.add("bullet"); // Assuming you have a 'cannon' class in your CSS
    //obstacle.innerText=`${positionx},${positiony},${width},${height}`
    this.div=bullet
    game.playground.div.appendChild(bullet); // Append to the playground
    this.updateDiv(game);
    game.bullets.push(this);
  }
  updateDiv(game){
    // Get the cannon div using the ID passed during construction
    const bullet = document.getElementById(this.divId);
    
    if (!bullet) {
      //console.error(`Bullet div with ID ${this.divId} not found.`);
      return;
    }
    
    
    
    // Use getBoundingClientRect to get the actual width of the div
    const rect = bullet.getBoundingClientRect();
    const width = rect.width;
    const height = width;
    let left=this.positionx-(100*width/game.playground.width)/2;
    let top=this.positiony-(100*height/game.playground.height)/2;
    this.height =100*height/game.playground.height
    // Update the position of the cannon div
    bullet.style.left = `${left}%`;
    bullet.style.height = `${width}px`;
    bullet.style.top = `${top}%`;
    //cannonDiv.style.height = `${width}px`;
  }
  hide(game){
    // Get the cannon div using the ID passed during construction
    const bullet = document.getElementById(this.divId);
    
    if (!bullet) {
      console.error(`Bullet div with ID ${this.divId} not found.`);
      return;
    }
    bullet.style.display = `none`;
    this.updateDiv(game)
  }
  show(game){
    // Get the cannon div using the ID passed during construction
    const bullet = document.getElementById(this.divId);
    
    if (!bullet) {
      console.error(`Bullet div with ID ${this.divId} not found.`);
      return;
    }
    bullet.style.display = `block`;
    this.updateDiv(game)
  }
  updatePosition(game){
    this.positionx=this.positionx+this.velocityx
    this.positiony=this.positiony+this.velocityy
    this.check_touch_border()
    this.check_touch_obstacles(game)
    this.check_if_max_bounce(game)
    this.updateDiv(game);
  }
  check_touch_border(){
    if(this.positionx>=100){this.velocityx=-Math.abs(this.velocityx);this.bouncecount++}
    if(this.positionx<=0){this.velocityx=Math.abs(this.velocityx);this.bouncecount++}
    if(this.positiony>=100){this.velocityy=-Math.abs(this.velocityy);this.bouncecount++}
    if(this.positiony<=0){this.velocityy=Math.abs(this.velocityy);this.bouncecount++}
  }
  check_touch_obstacles(obstacles){
    let contact=0
    for(const obstacle of game.obstacles){
      if(Obstacle.check_if_point_in_obj([this.positionx,this.positiony],obstacle)){
        contact=1
        const distanceLeft=Math.abs(this.positionx-(obstacle.positionx-obstacle.width/2))
        const distanceRight=Math.abs(this.positionx-(obstacle.positionx+obstacle.width/2))
        const distanceTop=Math.abs(this.positiony-(obstacle.positiony-obstacle.height/2))
        const distanceBottom=Math.abs(this.positiony-(obstacle.positiony+obstacle.height/2))
        const minDistance=Math.min(distanceLeft,distanceRight,distanceTop,distanceBottom)
        if(distanceLeft==minDistance){this.velocityx=-Math.abs(this.velocityx)}
        if(distanceRight==minDistance){this.velocityx=+Math.abs(this.velocityx)}
        if(distanceTop==minDistance){this.velocityy=-Math.abs(this.velocityy)}
        if(distanceBottom==minDistance){this.velocityy=+Math.abs(this.velocityx)}
        this.bouncecount++
        obstacle.bouncecount++
        obstacle.check_count(game)
        this.updatePosition(game)
      }
    }
    if(contact==1){
      this.div.style.backgroundColor = "red";
    }else{
      this.div.style.backgroundColor = "black";
    }
    
  }
  check_if_max_bounce(game){
    if(this.bouncecount>=game.maxBounceBullet){
      this.delete(game)
    }
  }



  delete(game){
    // Assuming bullet has an associated DOM element
    const bulletDiv = document.getElementById(this.divId);
    if (bulletDiv) {
      bulletDiv.remove(); // This removes the bullet's DOM element from the document
    }
    // Removing the bullet from the array
    const index = game.bullets.indexOf(this);
    if (index > -1) {
      game.bullets.splice(index, 1); // Remove the bullet from the array
    }
  }
  // Safely delete bullets from the array without skipping any
  static deleteAllBullets(game) {
  // Loop backwards to avoid issues with array mutation while deleting
  for (let i = game.bullets.length - 1; i >= 0; i--) {
    game.bullets[i].delete(game); // Call the delete method for each bullet
  }
  }
}

class Target{
  constructor(game,divId,positionx,positiony,width,height) {
    console.log("create Target")
    this.divId = divId;
    this.positionx = positionx;
    this.positiony = positiony;
    this.width = width;
    this.height = height;
    const target = document.createElement("div");
    target.id = divId;
    target.classList.add("target"); // Assuming you have a 'cannon' class in your CSS
    //obstacle.innerText=`${positionx},${positiony},${width},${height}`
    this.div=target
    game.playground.div.appendChild(target); // Append to the playground
    const img=document.createElement("img")
    img.src="/img/game/tile/target.png"
    img.style.width = `100%`;
    this.img=img;
    target.appendChild(img)
    this.updateDiv(game);
    game.targets.push(this);
    this.obstacle=new Obstacle(game,`Target${this.divId}`,this.positionx,this.positiony,this.width,this.height,this)
    
  }
  updateDiv(game){
    // Get the cannon div using the ID passed during construction
    const target = document.getElementById(this.divId);
    
    if (!target) {
      //console.error(`Target div with ID ${this.divId} not found.`);
      return;
    }
    
    
    
    let left=(this.positionx-this.width/2);
    let width=this.width;
    let top=(this.positiony-this.height/2);
    let height=this.height;
    
    // Update the position of the cannon div
    target.style.left = `${left}%`;
    target.style.width = `${width}%`;
    target.style.top = `${top}%`;
    target.style.height = `${height}%`;
  }
  delete(game){
    // Assuming bullet has an associated DOM element
    const targetdiv = document.getElementById(this.divId);
    if (targetdiv) {
      targetdiv.remove(); // This removes the bullet's DOM element from the document
    }
    // Removing the bullet from the array
    const index = game.targets.indexOf(this);
    if (index > -1) {
      game.targets.splice(index, 1); // Remove the bullet from the array
    }
    //If no more target, game is finished
    if(game.targets.length==0){
      game.finish()
    }

  }
  // Safely delete targets from the array without skipping any
  static deleteAll(game) {
    // Loop backwards to avoid issues with array mutation while deleting
    for (let i = game.targets.length - 1; i >= 0; i--) {
      game.targets[i].delete(game); // Call the delete method for each target
    }
  }

  // Static method to create multiple obstacles
  static createSeveral(game) {
    for (let i = 0; i < game.numberOfTargets; i++) {
      let positionx,positiony,width,height;  
      [positionx,positiony,width,height]=this.generateNew(game)
      
      // Create a new obstacle and push it into the array
      const target = new Target(game,`target${i}`, positionx, positiony, width, height);
      
    }
  }
  // Static method to generate coordinate of new obstacles
  static generateNew(game){ 
    let positionx,positiony,width,height; 
    let i = 0;
    let maxAttempts = 30;
    do{
      [positionx, positiony, width, height] = this.generateAttribute(game)
      i++  
    }while(Obstacle.check_if_in_exclusion_zones(game.exclusion_zones,positionx,positiony,width,height)&& i < maxAttempts)
    if (i >= maxAttempts) {
      console.warn("Max attempts reached: could not place obstacle without overlap.");
      width=0
    }else{
      // console.debug(`attempts count:`+i);
    }
    
    return [positionx,positiony,width,height]
  }
  static generateAttribute(game){
    // Generate random left and top percentages between 0 and 100
    let minx,miny,maxx,maxy
    [[minx,miny],[maxx,maxy]]=game.targetarea
    const positionx = minx+Math.round(0+Math.random() * (maxx-minx),1); // 90 to keep obstacles inside boundaries
    const positiony = miny+Math.round(0+Math.random() * (maxy-miny),1);

    // Generate random width and height between 5% and 10%
    const width = Math.round(game.obstacleWidth + Math.round(Math.random()*0,0),1); // 5% to 10%
    const height = Math.round(game.obstacleHeight + Math.round(Math.random() * 0,0)*2,1); // 5% to 10%   
    
    return [positionx,positiony,width,height]
  }
}




// Add event listeners and intervals
let game;
resetButton.addEventListener("click", () => {
  
  // If the game is not initialized, create a new game
  if (!game) {
    game = new Game();
  }

  // Check if the game is already initialized
  if (game.initialized === true) {
    game.reset();
  } else {
    game.initializeGame();
  }
});
  



  

  
