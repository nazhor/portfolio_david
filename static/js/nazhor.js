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
    // function navRight(){
    //     TODO
    // };

    // function navLeft(){
    //     TODO
    // };

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

    $(".p-slides").on("click", ".nav-right", function(){
        var slide_img = $(this).parent().children("img");
        var aux_src = slide_img.attr("src");
        var aux_index = slide_img.attr("data-index");
        var aux_imgs = slide_img.attr("data-imgs");
        var data = JSON.parse(aux_imgs);
        var current_img = data[2].url;

        slide_img.attr("src", data[2].url);

        // alert("right: " + aux_src + " : " + aux_index + " : " + current_img);
        console.log("aux_src:", aux_src);
    });

    $(".p-slides").on("click", ".nav-left", function(){
        var slide_img = $(this).parent().children("img");
        var aux_src = slide_img.attr("src");
        var aux_index = slide_img.attr("data-index");
        var aux_imgs = slide_img.attr("data-imgs");
        var data = JSON.parse(aux_imgs);
        var current_img = data[1].url;

        slide_img.attr("src", data[2].url);

        // alert("left: " + aux_src + " : " + aux_index + " : " + current_img);
        console.log("aux_src:", aux_src);
    });

    // function nav_right() {
    //     alert("right");
    // };

    // function nav_left() {
    //     alert("left");
    // };
});


//Slider imgs
// var slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//     showSlides(slideIndex += n);
// };

// function currentSlide(n) {
//     showSlides(slideIndex = n);
// };

// function showSlides(n) {
//     var i;
//     var slides = document.getElementsByClassName("nz-slides");
//     if (n > slides.length) { slideIndex = 1 }
//     if (n < 1) { slideIndex = slides.length }
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     slides[slideIndex -1].style.display = "block";
// };