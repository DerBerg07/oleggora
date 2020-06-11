

let animationApp = new PIXI.Application(
    {
        width: window.innerWidth,
        height: window.innerHeight
    }
    );

document.getElementById('header').appendChild(animationApp.view);

let img = new PIXI.Sprite.from('IMG_2473.jpg');
img.width = window.innerWidth;
img.height = img.width*3/4;
img.anchor.set(0.5);
img.position.set(window.innerWidth/2, window.innerHeight/2);

animationApp.stage.addChild(img);

depthMap = new PIXI.Sprite.from('depthmap.jpg');
depthMap.width = window.innerWidth;
depthMap.height = img.width*3/4;
depthMap.anchor.set(0.5);
depthMap.position.set(window.innerWidth/2, window.innerHeight/2);
animationApp.stage.addChild(depthMap);

displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
animationApp.stage.filters = [displacementFilter];

window.onmousemove  = function (e) {
    displacementFilter.scale.x = (window.innerWidth/2 - e.clientX)/70;
    displacementFilter.scale.y = (window.innerHeight/2 - e.clientY)/70;
};

