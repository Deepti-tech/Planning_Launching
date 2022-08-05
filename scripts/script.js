// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
var width, height, 
    renderer,
    scene,
    camera,
    moon,
    earth,
    light,
    mesh,
    lat,
    lng,
    x,y,z;

var settings = {
    camera: {
        angle: 45,
        far: 10000,
        position: {
            x: 0,
            y: 0,
            z: 1000
        }
    },
    shadowsEnabled: true,
    backgroundColor: 0x05060d,
    ambientLight: {
        enabled: true,
        color: 0xffffff,
        intensity: 0.15
    },
    lightHelpersEnabled: false
};

function onWindowResize() {
    updateSizes();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
};

function updateSizes() {
    width = window.innerWidth;
    height = window.innerHeight;
};

function createPointLight() {
    light = new THREE.PointLight(0xffffff, 1.1, 1-1000);
    light.position.set(1000, 1000, 1000);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 10000;
    light.shadow.mapSize.width = width;
    light.shadow.mapSize.height = height;
    scene.add(light);
    if (settings.lightHelpersEnabled) {
        var lightHelper = new THREE.PointLightHelper(light, 30);
        scene.add(lightHelper);
    }
};

function createMoon() {
    var moonGeometry = new THREE.SphereGeometry(125, 30, 30);
    var moonMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: new THREE.TextureLoader().load("img/moon.jpg")
    });
    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(500,150,0)
    scene.add(moon);
};

// function  getPath1(a,b){
//     let v1=new THREE.Vector3(a.x,a.y,a.z)
//     let v2=new THREE.Vector3(b.x,b.y,b.z)
//     let points = []
//     for (let i=0; i<=20; i++){
//         let p=new THREE.Vector3().lerpVectors(v1,v2,i/20)
//         p.multiplyScalar(1 + 0.5*Math.sin(Math.PI*i/20))
//         points.push(p)
//     }
//     let curve = new THREE.CatmullRomCurve3(points)    
//     const geometry = new THREE.TubeGeometry(curve)
//     const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } )
//     const mesh = new THREE.Mesh( geometry, material )
//     scene.add( mesh );
// }
function  getPath(a,b){
    let v1=new THREE.Vector3(a.x,a.y,a.z)
    let v2=new THREE.Vector3(b.x,b.y,b.z)
    let points = []
    for (let i=0; i<=20; i++){
        let p=new THREE.Vector3().lerpVectors(v1,v2,i/20)
        p.multiplyScalar(1 + 0.1*Math.sin(Math.PI*i/20))
        points.push(p)
    }
    let curve = new THREE.CatmullRomCurve3(points)    
    const geometry = new THREE.TubeGeometry(curve)
    const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } )
    // const material = new THREE.LineDashedMaterial( {
    //     color: 0xffffff,
    //     linewidth: 1,
    //     scale: 1,
    //     dashSize: 3,
    //     gapSize: 1,
    // } );
    const mesh = new THREE.Mesh( geometry, material )
    scene.add( mesh );
}

function north_South(){
    northPoint = new THREE.Mesh(
        new THREE.SphereBufferGeometry(10,30,30),
        new THREE.MeshBasicMaterial({color:0x00ffff}));
        
    northPoint.position.set(450, 275, 0)
    scene.add(northPoint)

    southPoint = new THREE.Mesh(
        new THREE.SphereBufferGeometry(10,30,30),
        new THREE.MeshBasicMaterial({color:0x00ffff}));
        
    southPoint.position.set(550, 25, 0)
    scene.add(southPoint)

    var img = new THREE.MeshBasicMaterial({
        transparent: true,
        map:THREE.ImageUtils.loadTexture('rocket.png')
    });
    img.map.needsUpdate = true;
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200),img);
    plane.overdraw = true;
    plane.position.set(-40, -40, 0)
    scene.add(plane);

    getPath({x:450,y:275,z:0}, {x:0,y:0,z:0})
    getPath({x:550,y:25,z:0}, {x:0,y:0,z:0})
}

function createEarth() {
    var earthGeometry = new THREE.SphereGeometry(500, 30, 30);
    var earthMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: new THREE.TextureLoader().load("img/daymap.jpg")
    });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(-400,-550,0)
    scene.add(earth);
};

function animateMoon() {
    moon.rotation.y += 0.002;
};
function animateEarth() {
    earth.rotation.y += 0.004;
};

function animateLight() {
    timestamp = Date.now() * 0.00001;
    light.position.x = Math.cos(timestamp * 0) * 1500;
    light.position.z = Math.sin(timestamp * 5) * 1500;
};

function createControls() {
    new THREE.OrbitControls(camera, renderer.domElement);
}

function createBg(){
    let loader = new THREE.TextureLoader()
    let texture = loader.load("img/bg.jpg")
    scene.background = texture;
}

function init() {
    updateSizes();
    var canvas = document.getElementById("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(settings.camera.angle, width / height, 0.1, settings.camera.far);
    camera.position.set(settings.camera.position.x, settings.camera.position.y, settings.camera.position.z);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor(settings.backgroundColor);
    renderer.shadowMap.enabled = settings.shadowsEnabled;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    if (settings.ambientLight.enabled) {
        var ambientLight = new THREE.AmbientLight(settings.ambientLight.color, settings.ambientLight.intensity);
        scene.add(ambientLight);
    }

    window.addEventListener('resize', onWindowResize, true);

    // createControls();
    createBg();
    createMoon();
    createEarth();
    createPointLight();
    north_South();

    
    
};

function animate() {
    requestAnimationFrame(animate);
    animateMoon();
    animateEarth();
    // animateLight();
    renderer.render(scene, camera);
};

window.onload = function () {
    init();
    animate();
}
