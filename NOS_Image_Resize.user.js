// ==UserScript==
// @name NOS Image Resize
// @namespace NOS Image Resize
// @author Laurvin
// @description When directly viewing an image on NOS.nl, ensures that the highest resolution image is loaded. (Direct rewrite of Tumblr Image Size)
// @version 1.1
// @icon http://i.imgur.com/XYzKXzK.png
// @downloadURL https://github.com/Laurvin/NOS-Image-Resize/raw/master/NOS_Image_Resize.user.js
// @include https://nos.nl/data/image/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant none
// @run-at document-idle
// ==/UserScript==

var sizes = [ '1200x675', '1008x567', '864x486' ];

function checkSize(index) {
    if (index >= sizes.length) return;
    var url = window.location.href.replace(/[0-9]{3,4}[x][0-9]{3,4}|xxl/, sizes[index]);
    if (url == window.location.href) return;
    $.ajax({
        url: url,
        type: 'HEAD',
        success: function(data, textStatus, jqXHR) {
            window.location.replace(url);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            checkSize(index + 1);
        }
    });
}

checkSize(0);
