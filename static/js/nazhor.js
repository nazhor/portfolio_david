$(document).ready(function(){
    var pages = [ "#about", "#projects" ];
    var currentPage = 0;
    var navToPage = 0;
    var isPlaying = false;
    var animDuration = 1000;
    var direction = {
        Right: 0,
        Left: 1
    };

    $("#about-button").click(function(){
        $("#about-button").hide();
        $("#projects-button").css("display", "inline-block");
        navigate(direction.Right);
    });

    $("#projects-button").click(function(){
        $("#about-button").css("display", "inline-block");
        $("#projects-button").hide();
        navigate(direction.Right);
    });

    var containerElement = document.getElementById('page-container');
    var activeRegion = ZingTouch.Region(containerElement);

    var childElement = document.getElementById('about');

    // new ZingTouch.Pan({
    //     numInputs: 2
    // })

    activeRegion.bind(childElement, 'pan', function(event){
        navigate(direction.Right);
    });

    //Touch gesture via hammer.js
    // var letTheHammerPan = new Hammer(document);
    // letTheHammerPan.get("pan").set({
    //     direction: Hammer.DIRECTION_HORIZONTAL,
    //     threshold: 1000
    // });
    // letTheHammerPan.on('panright panleft', function(e) {
    //     if (e.type == "panright") {
    //         navigate(direction.Right);
    //     } else {
    //         navigate(direction.Left);
    //     }
    // });

    //TODO solo cambio los botones si pulso, falta cambiar al swipe y mejorar el efecto, hace cosas raras
    function navRight(){
        //TODO
    };

    function navLeft(){
        //TODO
    };

    function navigate( currentDire ) {

        if (!isPlaying){
            var formWith = $(window).width();
            var destinyX = 0;

            if (currentPage == 0){
                navToPage = 1;
            }else {
                navToPage = 0;
            }

            if (currentDire == direction.Right) {
                $(pages[navToPage]).css("left", -formWith);
                destinyX = formWith;
            }else {
                $(pages[navToPage]).css("left", formWith);
                destinyX = -formWith;
            }

            $(pages[navToPage]).show();

            isPlaying = true;
            $(pages[navToPage]).animate(
                {
                    left: 0
                },
                {
                    duration: animDuration
                }
            );
            $(pages[currentPage]).animate(
                {
                    left: destinyX
                },
                {
                    duration: animDuration,
                    complete: function() { hide_element() }
                }
            );

            function hide_element() {
                $(pages[currentPage]).hide();
                currentPage = navToPage;
                isPlaying = false;
            };
        }
    };

});