// Toggle class for slider nav item
var sliderNav = document.getElementById("sliderNav");

var sliderNavItem = sliderNav.getElementsByClassName("sliderNavItem");

for (var i = 0; i < sliderNavItem.length; i++) {
  sliderNavItem[i].addEventListener("click", function() {
    var current = sliderNav.getElementsByClassName("text-greyscale-900");
    current[0].className = current[0].className.replace(" text-greyscale-900", "");
    this.className += " text-greyscale-900";
  });
}