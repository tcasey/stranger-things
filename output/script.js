'use strict';

// Real quick add another modernizr check foooor...
Modernizr.addTest('textstroke', function () {
  var h1 = document.createElement('h1');
  if (!('webkitTextStroke' in h1.style) && !('textStroke' in h1.style)) {
    return false;
  } else {
    return true;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var bind = false;
  var text = null;

  // Must-haves
  if (!Modernizr.audio || !Modernizr.cssanimations || !Modernizr.textshadow) {
    text = document.getElementsByClassName("intro-text--cant")[0];
  }
  // Should-haves
  else if (!Modernizr.textstroke) {
      bind = true;
      text = document.getElementsByClassName("intro-text--shouldnt")[0];
    }
    // All good!
    else {
        bind = true;
        text = document.getElementsByClassName("intro-text--can")[0];
      }

  text.className += " intro-text--show";

  if (bind) {
    var btns = document.querySelectorAll("[data-play]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        start();
      });
    }
  }
});

// Fade out intro, start music and animation
var started = false;
function start() {
  if (started) {
    return;
  }
  started = true;

  var intro = document.getElementsByClassName("intro")[0];

  var music = new Audio("./assets/music.mp3");

  intro.className += " intro--hide";

  music.addEventListener("canplay", function () {
    setTimeout(function () {
      startAnimation();
      setTimeout(function () {
        music.play();
      }, 200);
    }, 1500);
  });
}

// Kick off the animation
function startAnimation() {
  // In milliseconds, how long each one is
  var creditsMs = 3000;
  var scenesMs = [creditsMs, creditsMs * 2, creditsMs, creditsMs, creditsMs, creditsMs, creditsMs * 2, 19500];

  // Elements
  var viewport = document.getElementsByClassName("viewport")[0];
  var letterbox = document.getElementsByClassName("letterbox")[0];
  var scenes = document.getElementsByClassName("title--scene");
  var fullTitle = document.getElementsByClassName("title--full")[0];
  var credits = document.getElementsByClassName("credits-group");
  var finalCredit = document.getElementsByClassName("credits-final")[0];

  viewport.className += " viewport--show";
  letterbox.className += " letterbox--show";

  // Set up credits to show every interval
  var activeCredits = null;

  var _loop = function _loop(i) {
    setTimeout(function () {
      if (credits[i - 1]) {
        credits[i - 1].className = "credits-group";
      }
      credits[i].className = "credits-group credits-group--show";
    }, i * creditsMs);

    if (!credits[i + 1]) {
      setTimeout(function () {
        credits[i].className = "credits-group";
      }, i * creditsMs + creditsMs);
    }
  };

  for (var i = 0; i < credits.length; i++) {
    _loop(i);
  }

  // Set up scenes to show after each interval
  var offset = 0;

  var _loop2 = function _loop2(_i) {
    setTimeout(function () {
      if (scenes[_i - 1]) {
        scenes[_i - 1].className = scenes[_i - 1].className.replace("title--show", "");
      }
      scenes[_i].className += " title--show";
    }, offset);

    offset += scenesMs[_i];

    if (!scenes[_i + 1]) {
      // Show the last scene
      setTimeout(function () {
        scenes[_i].className = scenes[_i].className.replace("title--show", "");
        fullTitle.className += " title--show";
      }, offset);

      // Show the final credits
      setTimeout(function () {
        finalCredit.className += " credits-group--show";
      }, offset + scenesMs[_i + 1] + 1500);
    }
  };

  for (var _i = 0; _i < scenes.length; _i++) {
    _loop2(_i);
  }
}