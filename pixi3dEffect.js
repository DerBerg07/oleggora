header = document.getElementById('header');
width = header.offsetWidth;
height = header.offsetHeight;

let animationApp = new PIXI.Application(
    {
        width: width,
        height: height
    }
);

header.appendChild(animationApp.view);
let background = new PIXI.Sprite.from('images/pixi_animation/Header/background.jpg');
if (height > width) {
    background.width = height * 4 / 3;
    background.height = height;
} else {
    background.height = width / 4 * 3;
    background.width = width;
}


background.anchor.set(0.5);
background.position.set(width / 2, height / 2);
animationApp.stage.addChild(background);


const TextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: width / 10,
    fontWeight: 'bold',
    fill: "white", // gradient
});

const richText = new PIXI.Text('OLEG GORA', TextStyle);
richText.x = width / 2;
richText.y = height / 3;
richText.anchor.set(0.5);
animationApp.stage.addChild(richText);


let human = new PIXI.Sprite.from('images/pixi_animation/Header/human.png');
human.height = height / 1.5;
human.width = human.height * 929 / 1772;
human.anchor.set(0.5, 1);
human.position.set(width / 2, height);
human.interactive = true;

animationApp.stage.addChild(human);

window.onmousemove = function (e) {
    human.x = (width / 2 - e.clientX / 70);
    human.y = (height + 50 - e.clientY / 70);

    richText.x = (width / 2 - e.clientX / 50);
    richText.y = (height / 2.7 - e.clientY / 50);
};

let blurHuman = new PIXI.filters.BlurFilter();
let blurBackground = new PIXI.filters.BlurFilter();
blurBackground.blur = 10;
blurHuman.blur = 0;
background.addBlur = true;
background.filters = [blurBackground];
human.filters = [blurHuman];
human.on('pointerout', () => {
    background.addBlur = true;
});
human.on('pointerover', () => {
    background.addBlur = false;

});


animationApp.ticker.add(() => {
    if (background.addBlur && blurHuman.blur < 10) {
        blurBackground.blur -= 0.1;
        blurHuman.blur += 0.1;
    } else if (!background.addBlur && blurBackground.blur < 10) {
        blurBackground.blur += 0.1;
        blurHuman.blur -= 0.1;
    }

});


//  depthMap = new PIXI.Sprite.from('images/pixi_animation/jellyfish.jpg');
//  depthMap.width = window.innerWidth;
//  depthMap.height = img.width*2/3;
//  depthMap.anchor.set(0.5);
//  depthMap.position.set(window.innerWidth/2, window.innerHeight/2);
//  animationApp.stage.addChild(depthMap);
//
//  displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
//  animationApp.stage.filters = [displacementFilter];
//
// window.onmousemove  = function (e) {
//     displacementFilter.scale.x = (window.innerWidth/2 - e.clientX)/20;
//     displacementFilter.scale.y = (window.innerHeight/2 - e.clientY)/20;
// };

