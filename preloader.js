window.onload = function () {
    let animationApp = new PIXI.Application(
        {
            width: header.offsetWidth,
            height: header.offsetHeight
        }
    );

    header.appendChild(animationApp.view);

    const TextStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: header.offsetWidth / 20,
        fontWeight: 'bold',
        fill: "white",
    });

    const LoadingText = new PIXI.Text('LOADING', TextStyle);
    LoadingText.x = header.offsetWidth / 2;
    LoadingText.y = header.offsetHeight / 2;
    LoadingText.anchor.set(0.5);
    animationApp.stage.addChild(LoadingText);


    loader = animationApp.loader;
    loader.baseUrl = "images";
    loader.add("human", "human.png").add("background", "background.jpg");

    loader.onProgress.add(showProgress);
    loader.onComplete.add(doneLoading.bind(this,animationApp));
    loader.onError.add(ErrorFunc);

    loader.load();

    function showProgress(e) {
        console.log(e.progress);

    }

    function ErrorFunc(e) {
        console.log(e);
    }

    function doneLoading(animationApp){
        LoadingText.destroy();
        console.log(LoadingText);
        initHeader(animationApp);
    }


};




