// abstract library
import { DrawingCommon } from './common';
import * as THREE from 'three'

const ANIMSPEED = -0.3;
const ANIMDISTANCE = 0.5;
// A class for our application state and functionality
class Drawing extends DrawingCommon {

    constructor (canv: HTMLElement) {
        super (canv)
        // @ts-ignore
        this.animatedMesh = this.scene.animatedMesh
        // @ts-ignore
        this.animatedLeftArm = this.scene.animatedLeftArm
        // @ts-ignore
        this.animatedRightArm = this.scene.animatedRightArm
        // @ts-ignore
        this.animatedHead = this.scene.animatedHead
    }

    animatedMesh: THREE.Mesh;
    animatedLeftArm: THREE.Mesh;
    animatedRightArm: THREE.Mesh;
    animatedHead: THREE.Mesh;

    /*
	Set up the scene during class construction
	*/
	initializeScene(){

        this.camera.lookAt(new THREE.Vector3())
        const objectRoot = new THREE.Group();
        

        //main body (root is at the center of feet of penguin)
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(1, 1, 2, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0x000000} );
        var body = new THREE.Mesh( geometry, material );

        body.scale.set(0.75, 0.75, 0.75);
        body.rotateY(90 * Math.PI / 180);
        // @ts-ignore
        this.scene.animatedMesh = body;

        objectRoot.add( body );


        //lower body
        var geometry: THREE.BufferGeometry = new THREE.SphereGeometry(1., 100, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0x000000} );
        var bottom = new THREE.Mesh( geometry, material );

        bottom.position.y = -1;
        body.add( bottom );

        //head
        var geometry: THREE.BufferGeometry = new THREE.SphereGeometry(1.3, 100, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0x000000} );
        var head = new THREE.Mesh( geometry, material );

        head.translateY(1.5);
        head.scale.set(0.9, 0.9, 0.9);
        body.add( head );
        // @ts-ignore
        this.scene.animatedHead = head;

        //nose
        var geometry: THREE.BufferGeometry = new THREE.ConeGeometry(0.2, 0.5, 100);
        var materialToon = new THREE.MeshToonMaterial( { color: 0xFFFF00} );
        var nose = new THREE.Mesh( geometry, materialToon );

        nose.rotateX(-1 * 90 * Math.PI / 180);
        nose.translateX(0);
        nose.translateY(1.5);
        nose.translateZ(-0.1);
        head.add( nose );

        //white middle
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(0.7, 0.7, 1.5, 100);
        var materialToon = new THREE.MeshToonMaterial( { color: 0xFFFFFF} );
        var whiteMiddle = new THREE.Mesh( geometry, materialToon );

        whiteMiddle.translateZ(-0.4);
        whiteMiddle.translateY(-0.5);
        body.add( whiteMiddle );

        //white lower
        var geometry: THREE.BufferGeometry = new THREE.SphereGeometry(.7, 100, 100);
        var materialToon = new THREE.MeshToonMaterial( { color: 0xFFFFFF} );
        var whiteLower = new THREE.Mesh( geometry, materialToon );

        whiteLower.translateZ(-0.4);
        whiteLower.position.y = -1.25;
        body.add( whiteLower );

        //white top
        var geometry: THREE.BufferGeometry = new THREE.SphereGeometry(0.7, 100, 100);
        var materialToon = new THREE.MeshToonMaterial( { color: 0xFFFFFF} );
        var whiteTop = new THREE.Mesh( geometry, materialToon );

        whiteTop.translateZ(-0.4);
        whiteTop.position.y = 0.25;
        body.add( whiteTop );

        //yellow middle
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(0.85, 0.85, 1.4, 100);
        var materialToon = new THREE.MeshToonMaterial( { color: 0xFFFF00} );
        var yellowMiddle = new THREE.Mesh( geometry, materialToon );

        yellowMiddle.translateZ(-0.19);
        yellowMiddle.translateY(-0.41);
        body.add( yellowMiddle );

        //yellow lower
        var geometry: THREE.BufferGeometry = new THREE.SphereGeometry(.8, 100, 100);
        var materialToon = new THREE.MeshToonMaterial( { color: 0xFFFF00} );
        var yellowLower = new THREE.Mesh( geometry, materialToon );

        yellowLower.translateZ(-0.26);
        yellowLower.position.y = -1.15;
        body.add( yellowLower );

        //yellow top
        var geometry: THREE.BufferGeometry = new THREE.SphereGeometry(0.85, 100, 100);
        var materialToon = new THREE.MeshToonMaterial( { color: 0xFFFF00} );
        var yellowTop = new THREE.Mesh( geometry, materialToon );

        yellowTop.translateZ(-0.19);
        yellowTop.position.y = 0.3;
        body.add( yellowTop );

        //left foot
        var geometry: THREE.BufferGeometry = new THREE.BoxGeometry(0.5, 0.2, 1);
        var material = new THREE.MeshPhongMaterial( { color: 0xFFFF00} );
        var leftFoot = new THREE.Mesh( geometry, material );

        leftFoot.translateZ(-0.4);
        leftFoot.translateX(-0.4);
        leftFoot.translateY(-1);
        bottom.add( leftFoot );

        //right foot
        var geometry: THREE.BufferGeometry = new THREE.BoxGeometry(0.5, 0.2, 1);
        var material = new THREE.MeshPhongMaterial( { color: 0xFFFF00} );
        var rightFoot = new THREE.Mesh( geometry, material );

        rightFoot.translateZ(-0.4);
        rightFoot.translateX(0.4);
        rightFoot.translateY(-1);
        bottom.add( rightFoot );

        //right flap
        var geometry: THREE.BufferGeometry = new THREE.BoxGeometry(2, 0.2, 1);
        var material = new THREE.MeshPhongMaterial( { color: 0x000000} );
        var rightFlap = new THREE.Mesh( geometry, material );

        rightFlap.rotateZ(45 * Math.PI / 180);
        rightFlap.translateY(0.8);
        rightFlap.translateX(-0.8);
        
        body.add( rightFlap );
        // @ts-ignore
        this.scene.animatedRightArm = rightFlap;

        //left flap
        var geometry: THREE.BufferGeometry = new THREE.BoxGeometry(2, 0.2, 1);
        var material = new THREE.MeshPhongMaterial( { color: 0x000000} );
        var leftFlap = new THREE.Mesh( geometry, material );

        leftFlap.rotateZ(-1 * 45 * Math.PI / 180);
        leftFlap.translateY(0.8);
        leftFlap.translateX(0.8);
        
        body.add( leftFlap );
        // @ts-ignore
        this.scene.animatedLeftArm = leftFlap;

        //left eye
        var geometry: THREE.BufferGeometry = new THREE.SphereGeometry(.2, 100, 100);
        var materialToon = new THREE.MeshToonMaterial( { color: 0xFFFFFF} );
        var leftEye = new THREE.Mesh( geometry, materialToon );

        leftEye.translateZ(-1.1);
        leftEye.translateY(1.75);
        leftEye.translateX(-0.4);
        
        body.add( leftEye );

        //right eye
        var geometry: THREE.BufferGeometry = new THREE.SphereGeometry(.2, 100, 100);
        var materialToon = new THREE.MeshToonMaterial( { color: 0xFFFFFF} );
        var rightEye = new THREE.Mesh( geometry, materialToon );

        rightEye.translateZ(-1.1);
        rightEye.translateY(1.75);
        rightEye.translateX(0.4);
        
        body.add( rightEye );

        //left pupil
        var geometry: THREE.BufferGeometry = new THREE.SphereGeometry(.18, 100, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0x000000} );
        var leftPupil = new THREE.Mesh( geometry, material );

        leftPupil.translateZ(-1.125);
        leftPupil.translateY(1.75);
        leftPupil.translateX(-0.4);
        
        body.add( leftPupil );

        //right pupil
        var geometry: THREE.BufferGeometry = new THREE.SphereGeometry(.18, 100, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0x000000} );
        var rightPupil = new THREE.Mesh( geometry, material );

        rightPupil.translateZ(-1.125);
        rightPupil.translateY(1.75);
        rightPupil.translateX(0.4);
        
        body.add( rightPupil );

        //snow ground
        var geometry: THREE.BufferGeometry = new THREE.PlaneGeometry(15, 15);
        var materialLambert = new THREE.MeshLambertMaterial( { color: 0x006400, side: THREE.DoubleSide} );
        var ground = new THREE.Mesh( geometry, materialLambert );

        ground.rotateX(90 * Math.PI / 180);
        ground.translateZ(1.5);

        objectRoot.add(ground);

        //cake base
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(1, 1, 0.8, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0xFFFFFF} );
        var base = new THREE.Mesh( geometry, material );

        base.translateX(-2);
        base.translateY(-0.7);
        objectRoot.add(base);

        //cake base2
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.8, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0xFFFFFF} );
        var base2 = new THREE.Mesh( geometry, material );

        base2.translateX(-2);
        base2.translateY(-1.2);
        objectRoot.add(base2);

        //cake base3
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(0.7, 0.7, 1.5, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0xFFFFFF} );
        var base3 = new THREE.Mesh( geometry, material );

        base3.translateX(-2);
        base3.translateY(-0.5);
        objectRoot.add(base3);

        //cake candle
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0x0000FF} );
        var candle = new THREE.Mesh( geometry, material );

        candle.translateX(-2);
        objectRoot.add(candle);

        //cake candle wick
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0xFFA500} );
        var candleWick = new THREE.Mesh( geometry, material );

        candleWick.translateX(-2);
        objectRoot.add(candleWick);

        //cake candle2
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0x0000FF} );
        var candle2 = new THREE.Mesh( geometry, material );

        candle2.translateX(-2);
        candle2.translateZ(-0.3)
        objectRoot.add(candle2);

        //cake candle wick2
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0xFFA500} );
        var candleWick2 = new THREE.Mesh( geometry, material );

        candleWick2.translateX(-2);
        candleWick2.translateZ(-0.3)
        objectRoot.add(candleWick2);

        //cake candle3
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0x0000FF} );
        var candle3 = new THREE.Mesh( geometry, material );

        candle3.translateX(-2);
        candle3.translateZ(0.3)
        objectRoot.add(candle3);

        //cake candle wick3
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 100);
        var material = new THREE.MeshPhongMaterial( { color: 0xFFA500} );
        var candleWick3 = new THREE.Mesh( geometry, material );

        candleWick3.translateX(-2);
        candleWick3.translateZ(0.3)
        objectRoot.add(candleWick3);

        //light 1
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(5, 10, 0);
        light.target.position.set(-5, 0, 0);
        objectRoot.add(light);
        objectRoot.add(light.target);

        //light 2
        const color2 = 0xFFA500;
        const intensity2 = 8;
        const light2 = new THREE.PointLight(color2, intensity2);
        light2.position.set(-2, 1, 0);
        objectRoot.add(light2);




        this.scene.add( objectRoot );

        
    }

    angle = 0;
    
    animating = false   // first time in, we grab the time as a start time

    animSpeed = ANIMSPEED   // meters per second
    animDist = -2*ANIMDISTANCE     // distance of our transition

    animLengthTime = 1000 * Math.abs(2*ANIMDISTANCE) / ANIMSPEED   // time for the animation

    animStart = 0       // start and end time of this transition, based on speed and distance
    animEnd = 0

    animStartX = ANIMDISTANCE  // start and end x position
    animEndX = -ANIMDISTANCE
    
    quatStart1End2 = new THREE.Quaternion();
    quatEnd1 = new THREE.Quaternion();
    quatStart2 = new THREE.Quaternion();

    quatStart = new THREE.Quaternion();
    quatEnd = new THREE.Quaternion();

    y = new THREE.Vector3(0,1,0)
    z = new THREE.Vector3(0,0,1)
    x = new THREE.Vector3(1,0,0)
    nene = new THREE.Vector3(2,2,2)
    xRightArm = new THREE.Vector3(0, 0, 1.5)
    xLeftArm = new THREE.Vector3(0, 0, -1.5)
    pivotPoint = 0;
	/*
	Update the scene during requestAnimationFrame callback before rendering
	*/
	updateScene(time: DOMHighResTimeStamp){

        // set up the first time
        if (!this.animating) {

            this.quatStart1End2.setFromAxisAngle(this.y, 0)
            this.quatEnd1.setFromAxisAngle(this.y, Math.PI - 0.01)
            this.quatStart2.setFromAxisAngle(this.y, Math.PI + 0.01)

            this.quatStart.copy(this.quatStart1End2)
            this.quatEnd.copy(this.quatEnd1)
            this.animating = true
            this.animStart = time;
            this.animEnd = this.animStart + this.animLengthTime
        }

        // if we've exceeded the motion time, flip the direction, and
        // and set the motion time to be the next interval 
        if (time > this.animEnd) {
            this.animStart = this.animEnd;
            this.animEnd = this.animStart + this.animLengthTime
            this.animStartX *= -1
            this.animEndX *= -1
            this.animDist *= -1
            if (this.animDist < 0) {
                this.quatStart.copy(this.quatStart1End2)
                this.quatEnd.copy(this.quatEnd1)    
            } else {
                this.quatStart.copy(this.quatStart2)
                this.quatEnd.copy(this.quatStart1End2)    
            }
        }

        // t goes from 0..1 over the time interval
        var t = (time - this.animStart) / this.animLengthTime

        // get the position along the line
        if (time < 3500) {
            //camera
            this.camera.position.x = Math.cos(time / 1000) * 10;
            this.camera.position.y = 2;
            this.camera.position.z = Math.sin(time / 1000) * 10;
            this.camera.lookAt( this.scene.position );

            this.animatedMesh.position.y = Math.sin(time / 200) / 4 + 0.28;
            this.animatedRightArm.rotateOnAxis(this.xRightArm, 1 / 5 * Math.sin(time / 200) * Math.PI / 180);
            this.animatedLeftArm.rotateOnAxis(this.xLeftArm, 1 / 5 * Math.sin(time / 200) * Math.PI / 180);
        } else if (time < 7300) {
            this.animatedMesh.rotateOnAxis(this.y, 1 / 5 * Math.sin(time / 200) * Math.PI / 180);
            this.animatedMesh.rotateOnAxis(this.z, 1 / 5 * Math.sin(time / 200) * Math.PI / 180);
            this.animatedRightArm.rotateOnAxis(this.x, 1 / 5 * Math.sin(time / 200) * Math.PI / 180);
            this.animatedLeftArm.rotateOnAxis(this.x, 1 / 5 * Math.sin(time / 200) * Math.PI / 180);
        } else if (time < 7780) {
            this.animatedMesh.rotateX( 2 * Math.sin(time / 200) * Math.PI / 180)
        } else if (time < 9500) {

        } else if (time < 11200) {
            this.animatedMesh.rotateY(Math.sin(time / 200) / 4)
        }
    }
}

// a global variable for our state.  We implement the drawing as a class, and 
// will have one instance
var myDrawing: Drawing;

// main function that we call below.
// This is done to keep things together and keep the variables created self contained.
// It is a common pattern on the web, since otherwise the variables below woudl be in 
// the global name space.  Not a huge deal here, of course.

function exec() {
    // find our container
    var div = document.getElementById("drawing");

    if (!div) {
        console.warn("Your HTML page needs a DIV with id='drawing'")
        return;
    }

    // create a Drawing object
    myDrawing = new Drawing(div);
    
}

exec()