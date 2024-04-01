const controls = ["play-large", "play", "progress", "current-time", "mute", "volume", "settings", "pip", "airplay", "fullscreen"],
    instances = Plyr.setup("#player", {
        ratio: "16:9",
        controls: controls
    });
var player = instances[0];
player.source = {
    type: "video",
    title: "Munowatch",
    sources: [{
        src: Base64.decode($("#" + document.getElementById("mplyr").getAttribute("data-vpr")).data(document.getElementById("mplyr").getAttribute("data-vt"))) + "#t=" + $("#lastdur").data("dur"),
        type: "video/mp4"
    }],
    poster: "media/images/playbg.jpg"
}, player.on("ended", function() {
    var e = player.currentTime,
        i = document.getElementById("v").value;
    "" != $("#nextid").data("nid") && (window.location = "twolekede?v=" + $("#nextid").data("nid") + "&pv=" + i + "&pdur=" + e)
});
var hidden, visibilityChange, c = 0,
    v = getElemid("v").value;

function handleVisibilityChange() {
    document[hidden] && sen(player.currentTime, v, "1")
}

function sen(e, i, t) {
    var n = ajaxObj("POST", "parsers/proc.php");
    n.onreadystatechange = function() {
        ajaxReturn(n)
    }, n.send("dur=" + e + "&vid=" + i + "&act=" + t)
}
void 0 !== document.hidden ? (hidden = "hidden", visibilityChange = "visibilitychange") : void 0 !== document.mozHidden ? (hidden = "mozHidden", visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (hidden = "webkitHidden", visibilityChange = "webkitvisibilitychange"), void 0 === document.addEventListener || void 0 === document[hidden] || document.addEventListener(visibilityChange, handleVisibilityChange, !1), $(window).bind("beforeunload", function() {
    sen(player.currentTime, v, "1")
});