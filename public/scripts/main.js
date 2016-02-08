'use strict';

$(document).ready(function() {
	$('#button').click(function() {
		var patt = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
		var url = $("#area").val();
		if(patt.test(url) === true) {
			$.ajax({
				type: 'POST',
				dataType: "jsonp",
				data: {url: url},
				url: '/add',
				success: function(data) {
					if($('#url').length < 0) {
						$('#onlydiv-inside').append('<p id = "url">' + data.url +'</p>').children("#url").hide().fadeIn('900');
					} else {
						$('#url').remove();
						$('#onlydiv-inside').append('<p id = "url">' + data.url +'</p>').children("#url").hide().fadeIn('900');
					}
				},
				error: function() {
					$('#onlydiv-inside').append("<p id = 'url'>There's some error with the server</p>").children("#url").hide().fadeIn('900');
				}
			});
		} else {
			if($('#url').length < 0) {
				$('#onlydiv-inside').append('<p id = "url"> Invalid URL</p>').children("#url").hide().fadeIn('900');
			} else {
				$('#url').remove();
				$('#onlydiv-inside').append('<p id = "url"> Invalid URL</p>').children("#url").hide().fadeIn('900');
			}
		}
	});
});

