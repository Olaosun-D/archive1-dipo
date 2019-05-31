// Lightweight jQuery Query Selector Function Equivalent //
var D = document;
var $ = D.querySelector.bind(D);
var $$ = function (selector, elem) {
    return document.querySelectorAll(selector);
};

D.addEventListener("DOMContentLoaded", function () {
    console.log('Your document is ready!');
});
(function NavIconToggles() {
    //MOBILE MENU ICON TOGGLE //
    $('#ham-1').onclick = function () {
        var x = $("#mobiNav");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
        collapse = $("#ham-1").classList.toggle("active");
    };
    $('#searchIcon').onclick = function () {
        var x = $("#navSearch");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    };
}());



//SCROLL TOP TOGGLE //
window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        $("#scroll-top").style.display = "block";
    } else {
        $("#scroll-top").style.display = "none";
    }
};
$("#scroll-top").onclick = function () {
    window.scrollTo(0, 0);
};