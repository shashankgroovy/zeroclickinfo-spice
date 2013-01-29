// `ddg_spice_sound_cloud` is a callback function that gets
// called when people search for movie titles. An example trigger
// is "sc oppa spacejam style".

function ddg_spice_sound_cloud(sc) {
    "use strict";

    var snippet = d.createElement('span'),
        items = [[]],
        query = DDG.get_query().replace(/(sc|sound\s+cloud|soundcloud)\s*/i, "");

    function initElement(res) {
        // hideImage uses the built-in function DDG.toggle.
        // It hides or shows the element depending on the second argument.
        // 1 is for showing and -1 is for hiding.
        function hideElement() { 
            DDG.toggle('soundcloud-play', -1);
            snippet.appendChild(soundcloud(res));
            var s = d.getElementById("zero_click_abstract");
            s.setAttribute("style", "margin: 0px !important;");
        }

        var a = d.createElement('a');
        a.addEventListener("click", hideElement, false);
        a.setAttribute("href", "javascript:;");
        a.setAttribute("title", "Listen to " + res.title);
        a.innerHTML = res.title;
        a.innerHTML = "<i class='icon-play-circle'></i>" + res.title;
        return a; 
    }

    // Check if the properties that we need are available.
    // if it isn't, it's not going to display anything.
    if (sc && sc.length) {
        var li,
            div = d.createElement('div'),
            ul = d.createElement('ul'),
            div2; 

        div.setAttribute("id", "soundcloud-play");
        for(var i = 0; i < sc.length && i < 5; i++) {
            div2 = d.createElement('div');
            div2.appendChild(initElement(sc[i])); 
            var span2 = d.createElement('span');
            span2.innerHTML = " by ";
            var a = d.createElement('a');
            a.setAttribute('href', sc[i].user.permalink_url);
            a.innerHTML = sc[i].user.username;
            div2.appendChild(span2);
            div2.appendChild(a);
            div.appendChild(div2);
        }
        snippet.appendChild(div);

        items[0] = {
            a: snippet,
            h: query + " (Sound Cloud)",
            s: "SoundCloud",
            u: "https://soundcloud.com/search?q=" + query,
            f: true,
            force_big_header: true
        };

        // The rendering function is `nra`.
        nra(items, 1, 1);
    }

    // Embed Sound Cloud's player in our plugin.
    function soundcloud(res) {
        var iframe = d.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '166');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('frameborder', 'no');
        iframe.setAttribute('src', 'https://w.soundcloud.com/player/?url=' + encodeURI(res.uri) + "&amp;auto_play=true");
        return iframe;
    }
}
