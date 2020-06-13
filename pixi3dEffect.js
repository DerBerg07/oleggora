
function initHeader(animationApp){

    header = document.getElementById('header');
    width = header.offsetWidth;
    height = header.offsetHeight;
    resources = animationApp.loader.resources;
    let blurSpeed = 0.2;

    let background = new PIXI.Sprite.from(resources.background.texture);
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
        fill: "white",
    });

    const richText = new PIXI.Text('OLEG GORA', TextStyle);
    richText.x = width / 2;
    richText.y = height / 3;
    richText.anchor.set(0.5);
    animationApp.stage.addChild(richText);


    let humanCoontainer = new PIXI.Container();

    let human = new PIXI.Sprite.from(resources.human.texture);
    human.height = height / 1.5;
    human.width = human.height * 929 / 1772;
    human.anchor.set(0.5, 1);
    humanCoontainer.position.set(width / 2, height);
    humanCoontainer.interactive = true;

    humanCoontainer.addChild(human);
    animationApp.stage.addChild(humanCoontainer);





    let blurHuman = new PIXI.filters.BlurFilter();
    let blurBackground = new PIXI.filters.BlurFilter();
    blurBackground.blur = 10;
    blurHuman.blur = 0;
    background.addBlur = true;
    background.filters = [blurBackground];
    humanCoontainer.filters = [blurHuman];
    humanCoontainer.on('pointerout', () => {
        background.addBlur = true;
    });
    humanCoontainer.on('pointerover', () => {
        background.addBlur = false;

    });



    const TextStyle2 = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: human.width/6,
        fontWeight: 'bold',
        fill: "black",
    });

    const clickText = new PIXI.Text('click', TextStyle2);
    clickText.y = -humanCoontainer.height*3/4.5;
    clickText.anchor.set(0.5);
    clickText.alpha = 0.3;
    clickText.interactive = true;
    clickText.buttonMode = true;
    humanCoontainer.addChild(clickText);


    clickText.on('click', ()=>{
        document.getElementById("section-wrapper").style.display = "block";
    })

    window.onmousemove = function (e) {
        humanCoontainer.x = (width / 2 - e.clientX / 70);
        humanCoontainer.y = (height + 50 - e.clientY / 70);

        richText.x = (width / 2 - e.clientX / 50);
        richText.y = (height / 2.7 - e.clientY / 50);
    };

    let gyroscope = new Gyroscope({frequency: 60});
        gyroscope.addEventListener('reading', e => {
            humanCoontainer.x = (width / 2 - gyroscope.x / 70);
            humanCoontainer.y = (height + 50 -gyroscope.y / 70);

            richText.x = (width / 2 - gyroscope.x / 50);
            richText.y = (height / 2.7 - gyroscope.y / 50);
        });

    gyroscope.start();


    animationApp.ticker.add(() => {
        if (background.addBlur && blurHuman.blur < 10) {
            blurBackground.blur -= blurSpeed;
            blurHuman.blur += blurSpeed;
        } else if (!background.addBlur && blurBackground.blur < 10) {
            blurBackground.blur += blurSpeed;
            blurHuman.blur -= blurSpeed;
        }

    });

}




