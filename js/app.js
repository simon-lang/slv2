(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

$(function() {
  var email, externalLinks, hash;
  $.ajax({
    url: "https://api.github.com/users/captainclam/gists"
  }).done(function(gists) {
    var gist, _fn, _i, _len;
    $('.public-gists').empty();
    _fn = function(gist) {
      var a, created_at, description, html_url, id, li;
      id = gist.id, description = gist.description, html_url = gist.html_url, created_at = gist.created_at;
      a = $('<a>');
      a.attr('href', html_url);
      if (!description.length) {
        description = 'untitled';
      }
      a.text(description);
      li = $('<li>');
      li.append(created_at.substr(0, 10) + ': ');
      li.append(a);
      li.css('font-family', 'Courier');
      return $('.public-gists').append(li);
    };
    for (_i = 0, _len = gists.length; _i < _len; _i++) {
      gist = gists[_i];
      _fn(gist);
    }
    return externalLinks($('.public-gists'));
  });
  $('a.nav, .menu a').on('click', function(e) {
    var href;
    e.preventDefault();
    window.location.hash = $(this).attr('href');
    href = $(this).attr('href');
    $('a').removeClass('active');
    $(this).addClass('active');
    if ($(href).length) {
      $('.main > section').hide();
      return $(href).show();
    }
  });
  externalLinks = function(target) {
    target.find("a[href^='http://']").attr('target', '_blank');
    return target.find("a[href^='https://']").attr('target', '_blank');
  };
  externalLinks($('body'));
  $('.read-more').on('click', function(e) {
    e.preventDefault();
    $(this).next('.hidden').toggle();
    return $(this).text(function(index, text) {
      if (text === 'more info...') {
        return 'collapse';
      } else {
        return 'more info...';
      }
    });
  });
  hash = window.location.hash;
  if (hash && $('.main > section' + hash).length) {
    $('.main > section').hide();
    $(hash).show();
  }
  email = ['me', '@', 'simonlang', '.org'].join('');
  return $('.mailto').attr('href', 'mailto:' + email);
});


},{}]},{},[1]);