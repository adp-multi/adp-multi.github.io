var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

function Tabulation (container, len) {
	
	this.freshScene = __bind(this.freshScene, this);
	this.render = __bind(this.render, this);
	this.addCube = __bind(this.addCube, this);
	
	this.len = len;
	this.speed = 20;
	
	this.cubes = {}; // for debugging only
	this.delayedCubeTimers = [];
	
	this.objects = []; // current objects in the scene (except light etc.)

    this.init(container);
	this.animate();
}

// TrackballControls doesn't allow zooming with OrthographicCamera's
// therefore a manual implementation
Tabulation.prototype.mousewheel = function( event ) {

	event.preventDefault();
	event.stopPropagation();

	var delta = 0;

	if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

		delta = event.wheelDelta / 40;

	} else if ( event.detail ) { // Firefox

		delta = - event.detail / 3;

	}
		
	var width = this.camera.right / this.zoom;
	var height = this.camera.top / this.zoom;
	
	this.zoom -= delta * 0.001;
	
	this.camera.left = -this.zoom*width;
	this.camera.right = this.zoom*width;
	this.camera.top = this.zoom*height;
	this.camera.bottom = -this.zoom*height;
	
	this.camera.updateProjectionMatrix();
	
	this.render();
}
    
Tabulation.prototype.init = function(container) {
	var width = $(container).width();
	var height = width/1.5;

	this.renderer = new THREE.WebGLRenderer( {antialias:true} );
	this.renderer.setSize( width, height );
	
	this.zoom = 0.02;
	this.camera = new THREE.OrthographicCamera( 
		-this.zoom*width, this.zoom*width, this.zoom*height, -this.zoom*height, 1, 1000  );
	this.camera.position.z = 100;
		
	this.renderer.domElement.addEventListener( 'mousewheel', this.mousewheel.bind(this), false );
	this.renderer.domElement.addEventListener( 'DOMMouseScroll', this.mousewheel.bind(this), false ); // firefox
	
	this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );
	this.controls.addEventListener( 'change', this.render.bind(this) );
	this.controls.noZoom = true;
	this.controls.noPan = true;
	
	this.scene = new THREE.Scene();
	
	var light = new THREE.AmbientLight( 0x00B2FF ); 
	this.scene.add( light );
			
	this.geometry = new THREE.CubeGeometry(1, 1, 1);
	
	var texture = THREE.ImageUtils.loadTexture( '/assets/media/three.js/tex.gif', new THREE.UVMapping(),
		this.render.bind(this));
	texture.anisotropy = this.renderer.getMaxAnisotropy();
	
	this.material = new THREE.MeshLambertMaterial( { map: texture} );

	this.renderer.domElement.id = "canvas";
	this.renderer.domElement.style.border="1px solid black";
	container.appendChild( this.renderer.domElement );
}

Tabulation.prototype.addText = function(text, posX, posY, posZ) {
	var shapes = THREE.FontUtils.generateShapes( text, {
	  font: "helvetiker",
	  size: 1
	} );
	var geom = new THREE.ShapeGeometry( shapes );
	var mat = new THREE.MeshBasicMaterial( { color: 0x0 });
	var mesh = new THREE.Mesh( geom, mat );
	mesh.position = new THREE.Vector3(posX-this.bb.w/2, posY-this.bb.h/2, posZ-this.bb.d/2);
	this.scene.add(mesh);
	this.objects.push(mesh);
}

Tabulation.prototype.freshScene = function() {
	this.delayedCubeTimers.forEach(function(el) {
		clearTimeout(el);
	});
	this.delayedCubeTimers = [];
	
	var self = this;
	this.objects.forEach(function(obj) {
		self.scene.remove(obj);                 
		if (obj.dispose) {                                                                                     
			obj.dispose();                                                                                       
		}
	});
	this.objects = [];
	this.cubes = {};
}

Tabulation.prototype.animate = function() {
	requestAnimationFrame( this.animate.bind(this) );
	this.controls.update();
}
	
Tabulation.prototype.render = function() {
	this.renderer.render( this.scene, this.camera );
}

Tabulation.prototype.addCubeDelayed = function(x1,x2,x3,c) {
	var self = this;
	if (this.speed == 0) {
		self.addCube(x1,x2,x3);
	} else {
		this.delayedCubeTimers.push(setTimeout(function(){
			self.addCube(x1,x2,x3);
		}, c*this.speed));
	}
}
	
Tabulation.prototype.addCube = function(posX, posY, posZ) {
	if (this.cubes[posX + ";" + posY + ";" + posZ]) {
		console.warn("DUPLICATE: x: " + posX + " y: " + posY + " z: " + posZ);
		return;
	}

	var mesh = new THREE.Mesh(this.geometry, this.material);
	mesh.position = new THREE.Vector3(posX-this.bb.w/2+1/2, posY-this.bb.h/2+1/2, posZ-this.bb.d/2+1/2);
	this.scene.add(mesh);
	this.render();
	
	this.cubes[posX + ";" + posY + ";" + posZ] = mesh;
	this.objects.push(mesh);
}

Tabulation.prototype.addBoundingBox = function(w, h, d) {
	var mesh = new THREE.Mesh(
		new THREE.CubeGeometry(w, h, d),
		new THREE.MeshBasicMaterial( { color: 0x0, wireframe: true} ));
	mesh.position = new THREE.Vector3(0, 0, 0);
	this.scene.add(mesh);
	
	this.objects.push(mesh);
	
	this.bb = {
		w: w,
		h: h,
		d: d
	};
}