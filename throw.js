AFRAME.registerComponent("bowling-balls",{
    init:function(){
        this.throwBall();
    }
    ,
    throwBall:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z"){
                var ball  = document.createElement("a-entity")
                ball.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.1,
                })
                ball.setAttribute("material","color","black")
                var cam = document.querySelector("#camera")
                pos=cam.getAttribute("position")
                ball.setAttribute("position",{
                    x:pos.x,
                    y:pos.y,
                    z:pos.z
                })
                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                ball.setAttribute("velocity",direction.multiplyScalar(-5))
                ball.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:0
                    })
                  ball.addEventListener("collide",this.removeBall)
                var scene = document.querySelector("#scene")
                scene.appendChild(ball)
            }

        })
    },
    removeBall: function (e) {
        //Original entity (bullet)
        console.log(e.detail.target.el);
    
        //Other entity, which bullet touched.
        console.log(e.detail.body.el);
    
        //bullet element
       var element = e.detail.target.el
    
        //element which is hit
       var elementHit = e.detail.body.el
    
        if (elementHit.id.includes("bowling-pin")) 
          {
            //set material attribute
            elementHit.setAttribute("material",{
              opacity:1,
              transparent:true, 
    
            })
    
            //impulse and point vector
              var impulse = new CANNON.Vec3(-2,2,1)
    
            //remove event listener
            var worldPoint = new CANNON.Vec3().copy(
              elementHit.getAttribute("position")
            )
            elementHit.body.applyImpulse(impulse,worldPoint)
            element.removeEventListener("collide",this.shootBullet)
            //remove the bullets from the scene
            var scene = document.querySelector("#scene")
            scene.removeChild(element)
    
          
        }
      },
})