function login() {
    var e = getElemid("email").value,
        t = getElemid("password").value;
    if ("" == e) getElemid("handle").innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Enter email address</strong></div>';
    else if ("" == t) getElemid("handle").innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Enter password</strong></div>';
    else {
        getElemid("loginbtn").style.display = "none", getElemid("handle").innerHTML = '<div class="alert alert-success" role="alert"> <strong><img src = "media/images/wait.gif" /> please wait ...</strong></div>';
        var n = ajaxObj("POST", "parsers/auth/signin.php");
        n.onreadystatechange = function() {
            if (1 == ajaxReturn(n)) {
                var e = JSON.parse(n.responseText);
                "ok" == e.status ? (getElemid("handle").innerHTML = '<div class="alert alert-success" role="alert"> <strong><img src = "media/images/wait.gif" /> redirecting ... </strong></div>', window.location = e.msg) : (getElemid("handle").innerHTML = '<div class="alert alert-danger" role="alert">' + e.msg + "</strong></div>", getElemid("loginbtn").style.display = "block")
            }
        }, n.send("e=" + e + "&p=" + t)
    }
}

function checkusername() {
    var e = getElemid("username").value;
    if ("" != e) {
        getElemid("unamestatus").innerHTML = '<img src = "media/images/wait.gif" /> <strong>checking ... </strong>';
        var t = ajaxObj("POST", "parsers/auth/signup.php");
        t.onreadystatechange = function() {
            1 == ajaxReturn(t) && (getElemid("unamestatus").innerHTML = t.responseText)
        }, t.send("usernamecheck=" + e)
    }
}

function search() {
    var e = encodeURI(getElemid("searchid").value);
    window.location.href = "search?q=" + e
}

function getElemid(e) {
    return document.getElementById(e)
}

function ajaxObj(e, t) {
    var n = new XMLHttpRequest;
    return n.open(e, t, !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n
}

function ajaxReturn(e) {
    if (4 == e.readyState && 200 == e.status) return !0
}

function restrict(e) {
    var t = getElemid(e),
        n = new RegExp;
    "email" == e ? n = /[' "]/gi : "username" == e && (n = /[^a-z0-9-]/gi), t.value = t.value.replace(n, "")
}

function emptyElement(e) {
    getElemid(e).innerHTML = ""
}

function register() {
    var e = getElemid("username").value,
        t = getElemid("email").value,
        n = getElemid("pass1").value,
        a = getElemid("pass2").value,
        s = getElemid("handle");
    if ("" == e) s.innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Enter username</strong></div>';
    else if ("" == t) s.innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Enter email address </strong></div>';
    else if ("" == n || "" == a) s.innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Password missing</strong></div>';
    else if (n != a) s.innerHTML = ' <div class="alert alert-danger" role="alert"> <strong>Your password fields do not match</strong></div>';
    else {
        getElemid("registerbtn").style.display = "none", s.innerHTML = '<div class="alert alert-success" role="alert"> <strong><img src = "media/images/wait.gif" /> please wait ...</strong></div>';
        var r = ajaxObj("POST", "parsers/auth/signup.php");
        r.onreadystatechange = function() {
            !0 === ajaxReturn(r) && ("signup_success" == r.responseText ? (s.innerHTML = '<div class="alert alert-success" role="alert"> <strong><img src = "media/images/wait.gif" /> redirecting ... </strong></div>', window.location = "home") : (s.innerHTML = '<div class="alert alert-danger" role="alert"><strong>' + r.responseText + "</strong></div>", getElemid("registerbtn").style.display = "block"))
        }, r.send("u=" + e + "&e=" + t + "&p=" + n)
    }
}

function openTerms() {
    getElemid("terms").style.display = "block", emptyElement("handle")
}

function forgot_muno_pass() {
    var e = getElemid("email").value;
    if ("" == e) getElemid("handle").innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Enter your email address</strong></div>';
    else {
        getElemid("forgotpassbtn").style.display = "none", getElemid("handle").innerHTML = '<div class="alert alert-success" role="alert"> <strong><img src = "media/images/wait.gif" /> please wait ...</strong></div>';
        var t = ajaxObj("POST", "parsers/auth/signin.php");
        t.onreadystatechange = function() {
            1 == ajaxReturn(t) && ("success" == t.responseText ? getElemid("login-box-body").innerHTML = '<div class="alert alert-success" role="alert"><h3>Step 2. Check your email inbox in a few minutes</h3><p>You can close this window or tab if you like.</p></div>' : (getElemid("handle").innerHTML = '<div class="alert alert-danger" role="alert"><strong>' + t.responseText + "</strong></div>", getElemid("forgotpassbtn").style.display = "block"))
        }, t.send("fp=" + e)
    }
}

function getMore(e, t, n) {
    if ("" == e || "" == n);
    else {
        getElemid(t + "btn" + e).disabled = !0, getElemid(t + "btn" + e).innerHTML = 'Wait loading...  <img src = "media/images/wait.gif"/>', $(".load-more").show();
        var a = ajaxObj("POST", "parsers/getMore.php");
        a.onreadystatechange = function() {
            1 == ajaxReturn(a) && ("missing" == a.responseText ? (getElemid(t + "btn" + e).innerHTML = '<strong style="color:#F00;"> Can not load more movies try again!</strong>', getElemid(t + "btn" + e).style.display = "block") : ($(".load-more").remove(), $("#" + t).append(a.responseText), $(t + "btn" + e).remove(), getElemid(t + "btn" + e).style.display = "none"))
        }, a.send("id=" + e + "&dv=" + t + "&o_id=" + n)
    }
}

function updatePassword() {
    var e = getElemid("current_password").value,
        t = getElemid("new_password").value,
        n = getElemid("confirm_password").value;
    if ("" == e) getElemid("handle_update_").innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Enter current Password</strong></div>';
    else if ("" == t) getElemid("handle_update_").innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Enter New Password</strong></div>';
    else if ("" == n) getElemid("handle_update_").innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Confirm Password</strong></div>';
    else if (n != t) getElemid("handle_update_").innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Passwords dont Match!</strong></div>';
    else {
        getElemid("updatebtn").style.display = "none", getElemid("handle_update_").innerHTML = '<div class="alert alert-success" role="alert"> <strong><img src = "media/images/wait.gif" /> please wait ...</strong></div>';
        var a = ajaxObj("POST", "parsers/auth/signin.php");
        a.onreadystatechange = function() {
            1 == ajaxReturn(a) && ("missing_data" == a.responseText ? (getElemid("handle_update_").innerHTML = '<strong style="color:#F00;">Fill in all the fields!</strong>', getElemid("updatebtn").style.display = "block") : "password_dont_match" == a.responseText ? (getElemid("handle_update_").innerHTML = '<strong style="color:#F00;">Passwords do not match!.</strong>', getElemid("updatebtn").style.display = "block") : "wrong_password" == a.responseText ? (getElemid("handle_update_").innerHTML = '<strong style="color:#F00;">Enter correct current password!.</strong>', getElemid("updatebtn").style.display = "block") : ("password_updated" == a.responseText ? getElemid("handle_update_").innerHTML = '<div class="alert alert-success" role="alert"> <strong>Password updated successfully</strong></div>' : "updated_failed" == a.responseText ? getElemid("handle_update_").innerHTML = '<strong style="color:#009900;">Password updated failed.</strong>' : getElemid("handle_update_").innerHTML = a.responseText, getElemid("updatebtn").style.display = "block", getElemid("current_password").value = "", getElemid("new_password").value = "", getElemid("confirm_password").value = ""))
        }, a.send("cp=" + e + "&np=" + t + "&cmp=" + n)
    }
}

function addlist(e, t, n) {
    if ("" != e) {
        var a = ajaxObj("POST", "parsers/proc.php");
        a.onreadystatechange = function() {
            1 == ajaxReturn(a) && (getElemid("mylist" + e + n).innerHTML = a.responseText)
        }, a.send("v=" + e + "&s=" + t + "&p=" + n)
    }
}

function like(e, t, n) {
    if ("" != e) {
        var a = ajaxObj("POST", "parsers/proc.php");
        a.onreadystatechange = function() {
            1 == ajaxReturn(a) && (getElemid("mylike" + e + n).innerHTML = a.responseText)
        }, a.send("vid=" + e + "&ls=" + t + "&p=" + n)
    }
}

function download2now(e) {
    getElemid("download").innerHTML = "Downloading ...", window.location = e
}

function notification(e) {
    var t = ajaxObj("POST", "parsers/proc.php");
    t.onreadystatechange = function() {
        1 == ajaxReturn(t) && (getElemid("notes").innerHTML = "")
    }, t.send("idu=" + e)
}

function delMod(e, t) {
    if ("" == e) getElemid(t).innerHTML = '<strong style="color:#F00;">Missing Video Id</strong>';
    else if (confirm("Are you sure you want to permanent delete this movie!")) {
        getElemid(t).innerHTML = '<strong style="color:#F00;">please wait ...</strong>', getElemid(t + "btn").style.display = "none";
        var n = ajaxObj("POST", "parsers/like_status.php");
        n.onreadystatechange = function() {
            1 == ajaxReturn(n) && ("failed" == n.responseText ? getElemid(t).innerHTML = '<h2 style="color:#F00;">Deletion failed </h2>' + n.responseText : getElemid(t).innerHTML = '<strong style="color:#009900;">' + n.responseText + "</strong>", getElemid(t + "btn").style.display = "block")
        }, n.send("deleteid=" + e)
    }
}

function choosePack(e) {
    "" != e ? (window.XMLHttpRequest ? xmlhttp = new XMLHttpRequest : xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"), getElemid("packstatus").innerHTML = '<center><strong class = "g-color-primary">please wait , loading package ...</strong></center>', xmlhttp.onreadystatechange = function() {
        if (4 == this.readyState && 200 == this.status) {
            var e = JSON.parse(this.responseText);
            document.getElementById("pack_cost").innerHTML = e.cost, document.getElementById("pack_duration").innerHTML = e.duration, document.getElementById("pack_discount").innerHTML = e.discount, document.getElementById("pack_desc").innerHTML = e.desc, document.getElementById("pack_pesapal").innerHTML = e.pesapalUrl, document.getElementById("pack_dpo").innerHTML = e.dpoBtn, getElemid("packstatus").innerHTML = ""
        }
    }, xmlhttp.open("GET", "parsers/like_status.php?pack_id=" + e, !0), xmlhttp.send()) : document.getElementById("packstatus").innerHTML = "No results"
}

function dpopay(e, t) {
    var n = getElemid("dpono").value,
        a = ddData.selectedData.value;
    if ("" == a) getElemid("dponostatus").innerHTML = '<strong style="color:#F00;">Invalid Mno</strong>';
    else if (n.length < 13) getElemid("dponostatus").innerHTML = '<strong style="color:#F00;">Invalid mobile number </strong>';
    else if ("" == n) getElemid("dponostatus").innerHTML = '<strong style="color:#F00;">Enter valid mobile Number</strong>';
    else {
        getElemid("dpobtn").style.display = "none", getElemid("dponostatus").innerHTML = '<strong><img src = "media/images/wait.gif" /> please wait ... </strong>';
        var s = ajaxObj("POST", "parsers/like_status.php");
        s.onreadystatechange = function() {
            1 == ajaxReturn(s) && (getElemid("paymentpane").innerHTML = s.responseText)
        }, s.send("dpono=" + n + "&mno=" + a + "&pack_id=" + e)
    }
}

function dpopay2(e, t) {
    document.getElementById("selpackage").setAttribute("disabled", "disabled");
    var n = $("input[name=dpoGroup]:checked").val(),
        a = ddData.selectedData.value;
    if ("" == a) getElemid("dponostatus").innerHTML = '<strong style="color:#F00;">Invalid Mno</strong>';
    else if (n.length < 10) getElemid("dponostatus").innerHTML = '<strong style="color:#F00;">Invalid mobile number </strong>';
    else if ("" == n) getElemid("dponostatus").innerHTML = '<strong style="color:#F00;">Enter valid mobile number</strong>';
    else {
        getElemid("dpobtn").style.display = "none", getElemid("dponostatus").innerHTML = '<img src = "media/images/wait.gif" /> <strong>please wait ... </strong>';
        var s = ajaxObj("POST", "parsers/like_status.php");
        s.onreadystatechange = function() {
            1 == ajaxReturn(s) && (getElemid("paymentpane").innerHTML = s.responseText, checkupdate(t))
        }, s.send("dpono=" + n + "&mno=" + a + "&pack_id=" + e)
    }
}

function update_accountinfo(e) {
    var t = getElemid("uname").value,
        n = getElemid("uemail").value,
        a = getElemid("fname").value,
        s = getElemid("lname").value,
        r = $("#uphone").intlTelInput("getSelectedCountryData").dialCode + "" + $("#uphone").val(),
        l = $("#ualt").intlTelInput("getSelectedCountryData").dialCode + "" + $("#ualt").val();
    if ("" == n) getElemid("handle_updateinfo").innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Enter valid email address</strong></div>';
    else if ("" == t) getElemid("handle_updateinfo").innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Enter your username</strong></div>';
    else if ("" == r) getElemid("handle_updateinfo").innerHTML = '<div class="alert alert-danger" role="alert"> <strong>Enter valid phone number</strong></div>';
    else {
        getElemid("updateinfobtn").style.display = "none", getElemid("handle_updateinfo").innerHTML = '<div class="alert alert-success" role="alert"> <strong><img src = "media/images/wait.gif" /> please wait ...</strong></div>';
        var i = ajaxObj("POST", "parsers/auth/signup.php");
        i.onreadystatechange = function() {
            if (1 == ajaxReturn(i)) {
                var t = JSON.parse(i.responseText);
                1 == t.status ? (getElemid("handle_updateinfo").innerHTML = '<div class="alert alert-success" role="alert"><strong> Account details successfully updated. </strong></div>', getElemid("updateinfobtn").style.display = "block", "subs" === e && (window.location = "setup")) : (getElemid("handle_updateinfo").innerHTML = '<div class="alert alert-danger" role="alert"><strong>' + t.msg + "</strong></div>", getElemid("updateinfobtn").style.display = "block")
            }
        }, i.send("uname=" + t + "&uemail=" + n + "&uphone=" + r + "&ualt=" + l + "&fname=" + a + "&lname=" + s)
    }
}