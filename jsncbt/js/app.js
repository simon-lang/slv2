(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var data, template;

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

template = _.template("<p>hello, {{name}}</p>");

data = {
  name: 'world'
};

$(function() {
  var dom, moreClass, moreLink;
  dom = $('body');
  setTimeout((function() {
    return $('.landing').css('opacity', '1');
  }), 1500);
  moreLink = $('.js-more');
  moreClass = 'collapsible--visible';
  moreLink.click(function(e) {
    var more;
    more = $(this).attr('href');
    return more.addClass(moreClass);
  });
  $('.js-show-overlay').click(function(e) {
    e.preventDefault();
    return dom.toggleClass('overlay-visible');
  });
  $('#toggle-menu').click(function(e) {
    e.preventDefault();
    return dom.addClass('menu-visible');
  });
  $('.offcanvas').click(function() {
    return dom.removeClass('menu-visible');
  }).children().click(function(e) {
    return false;
  });
  return $('#sign-in').click(function(e) {
    e.preventDefault();
    dom.addClass('logged-in');
    return setTimeout((function() {
      $('.app').show();
      return $('.landing').hide();
    }), 1500);
  });
});



},{}]},{},[1]);
