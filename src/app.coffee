_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

$ ->

  $.ajax(url: "https://api.github.com/users/captainclam/gists").done (gists) ->
    $('.public-gists').empty()
    for gist in gists then do (gist) ->
      {id, description, html_url, created_at} = gist
      a = $('<a>')
      a.attr 'href', html_url
      unless description.length
        description = 'untitled'
      a.text description
      li = $ '<li>'
      li.append created_at.substr(0, 10) + ': '
      li.append a
      li.css 'font-family', 'Courier'
      $('.public-gists').append li
    externalLinks $('.public-gists')

  $('a.nav, .menu a').on 'click', (e) ->
    e.preventDefault()
    window.location.hash = $(this).attr('href')  # stop bumping page around
    href = $(this).attr 'href'
    $('a').removeClass 'active'
    $(this).addClass 'active'
    if $(href).length
      $('.main > section').hide()
      $(href).show()

  externalLinks = (target) ->
    target.find("a[href^='http://']").attr 'target', '_blank'
    target.find("a[href^='https://']").attr 'target', '_blank'

  externalLinks $('body')

  $('.read-more').on 'click', (e) ->
    e.preventDefault()
    $(this).next('.hidden').toggle()
    $(this).text (index, text) -> if text is 'more info...' then 'collapse' else 'more info...'

  hash = window.location.hash
  if hash and $('.main > section' + hash).length
      $('.main > section').hide()
      $(hash).show()

  email = ['me','@','simonlang','.org'].join ''
  $('.mailto').attr 'href', 'mailto:' + email

  # seriously, this is insanely lazy. just change the html
  html = $('#employment').html()
  companies = [
    'Codeworx'
    'Digicon'
    'Open Platform'
    'Self Employed'
    'Kintek.com.au'
    'University of Queensland'
    'Daily Mercury'
  ]
  _.each companies, (c) -> html = html.replace c, "<strong>#{c}</strong>"
  # $('#employment').html html
