$(document).ready(function() {
    var pages = [ "#about", "#projects" ];
    var currentPage = 0;
    var navToPage = 0;
    var isPlaying = false;
    var animDuration = 1000;
    var direction = {
        Right: 0,
        Left: 1
    };


    //Animation for change page
    $("#about-button").click(function() {
        $("#about-button").hide();
        $("#projects-button").css("display", "inline-block");
        navigate(direction.Right);
    });

    $("#projects-button").click(function() {
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

        if (!isPlaying) {
            var formWith = $(window).width();
            var destinyX = 0;

            if (currentPage == 0) {
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


    //Projects page
    set_projects_initial_color();

    function set_projects_initial_color() {
        var projects = document.getElementsByClassName("all");
        set_projects_color(projects);
    };

    function set_projects_color(projects_to_change) {
        for (i = 0; i< projects_to_change.length; i++) {
            if (i%2 == 0) {
                $(projects_to_change[i]).addClass("p-white");
            }else {
                $(projects_to_change[i]).addClass("p-black");
            }
        }
    };

    function remove_projects_color() {
        var projects = document.getElementsByClassName("all");
        for (i = 0; i< projects.length; i++) {
            $(projects[i]).removeClass("p-white");
            $(projects[i]).removeClass("p-black");
        }
    };

    //Filter
    $("#all-button").on("click", function() {
        show_all();
    });

    $("#games-button").on("click", function() {
        filter_projects("games");
    });

    $("#soft-button").on("click", function() {
        filter_projects("software");
    });

    $("#other-button").on("click", function() {
        filter_projects("other");
    });

    function filter_projects(type) {
        var projects = document.getElementsByClassName("all");
        var projects_to_change = [];
        for (i = 0; i< projects.length; i++) {
            if ( $(projects[i]).hasClass(type) ) {
                $(projects[i]).css("display", "inline-flex");
                projects_to_change.push(projects[i]);
            }else {
                $(projects[i]).css("display", "none");
            }
        }
        remove_projects_color();
        set_projects_color(projects_to_change);
    };

    function show_all() {
        var projects = document.getElementsByClassName("all");
        for (i = 0; i< projects.length; i++) {
            $(projects[i]).css("display", "inline-flex");
        }
        remove_projects_color();
        set_projects_color(projects);
    };

    //Slider imgs
    $(".nav-right").on("click", function() {
        nav_img($(this), +1);
    });

    $(".nav-left").on("click", function() {
        nav_img($(this), -1);
    });

    function nav_img(c, dire) {
        var slide_img = $(c).siblings("img");
        var current_index = parseInt(slide_img.attr("data-index"));
        current_index += parseInt(dire);
        var aux_imgs = slide_img.attr("data-imgs");
        aux_imgs = aux_imgs.substr(1); //remove [
        aux_imgs = aux_imgs.substr(0, aux_imgs.length - 1); //remove ]
        aux_imgs = aux_imgs.split(" "); //To array
        var new_index = check_index_limits(aux_imgs, current_index);
        slide_img.attr("data-index", new_index);
        slide_img.attr("src", aux_imgs[new_index]);
    };

    function check_index_limits(imgs, current_index) {
        if (current_index < 0) {
            return imgs.length -1;
        }
        if (current_index > imgs.length -1) {
            return 0;
        }
        return current_index;
    };
});