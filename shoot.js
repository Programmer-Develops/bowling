AFRAME.registerComponent("bullets", {
    init: function () {
      this.shootBullet();
    },
    shootBullet: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var bullet = document.createElement("a-entity");
  
          bullet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });
  
          bullet.setAttribute("material", "color", "black");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          bullet.setAttribute("position", {
            x: "0",
            y: "1.4",
            z: "1",
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          bullet.setAttribute("velocity", direction.multiplyScalar(-5));
  
          var scene = document.querySelector("#scene");
  
          scene.appendChild(bullet);
        }
      });
    },
  });
  
  
  