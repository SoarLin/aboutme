window.fbAsyncInit = function() {
    FB.init({
        appId      : '150584001795913',                        // App ID from the app dashboard
        status     : true,                                 // Check Facebook Login status
        cookie     : true,                                 // enable cookies to allow the server to access the session
        xfbml      : true                                  // Look for social plugins on the page
    });

    FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.status === 'connected') {
            var fb_id = response.authResponse.userID;
            var accTo = response.authResponse.accessToken;
            var check_url = "Account/fb_login_mobile";
            //alert("auth status change");
            SendToCheckPage(fb_id, accTo, check_url);
        }
    });
};
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/zh_TW/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

function FB_login(){
    var getFBLogin = "https://www.facebook.com/dialog/oauth?client_id=150584001795913";
    getFBLogin += "&redirect_uri="+location.origin+location.pathname+"temp";
    getFBLogin += "&display=popup&scope=email,user_birthday,publish_stream,user_location,user_education_history";
    getFBLogin += "&cancel_url="+location.href;
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            var fb_id = response.authResponse.userID;
            var accTo = response.authResponse.accessToken;
            //alert("FB_ID = "+fb_id+", accTo = "+accTo);
            location.href = location.origin+location.pathname+"temp";
        } else if (response.status === 'not_authorized') {
            location.href = getFBLogin;
        } else {
            location.href = getFBLogin;
        }
    });
    /*
    FB.login(function(response) {
        if (response.authResponse) {
        }else{
            alert('須同意應用程式才能進入此頁面');
        }
    }, {scope: 'email,user_birthday,publish_stream,user_location,user_education_history'});
    */
}
function SendToCheckPage(fb_id, accTo, check_url){
    $.ajax({
        url: check_url,
        type: 'POST',
        timeout: 10000,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data: {'fb_id':fb_id, 'access_token':accTo},
        //'fb_id='+fb_id+'&access_token='+accTo,
        success: function(msg) {
            // 成功之後的操作，例如轉向個人主頁，重新整理同頁面(讀取 session)
            if(msg.FBID == "true"){
                if( msg.REQUEST_URI ){
                    location.href = msg.REQUEST_URI;
                }else{
                    location.href = 'question_select';
                }
            }else if (msg.FBID == "false") {
                var inviteCode = prompt("請輸入邀請碼：");
                $.ajax({
                    url: '/Include/api/check_invite_code',
                    method: 'POST',
                    data: {'inviteCode':inviteCode},
                    dataType: 'text',
                    success: function(text) {
                        //console.log(text);
                        var form = $( "<form style='display:none;' action='"+msg.NextPage+"' method='post'><input type='hidden' name='fb_id' value='"+fb_id+"'><input type='hidden' name='accTo' value='"+accTo+"'></form>" );
                        $('body').append(form);
                        form.submit().remove();
                    },
                    error: function(e) {
                        alert("邀請碼錯誤");
                    }
                });
                //alert('無fb id, 導向隱私權條款'+msg.NextPage);
                //openPrivacyPage(fb_id, accTo, msg.NextPage);
            }
        },
        error: function(request) {
            alert('系統發生錯誤，請稍後再試！');
        }
    });
}

function p(m) {console.log(m); }

function shaShift( input ){
    var shaObj = new jsSHA( input, "TEXT");
    var hash = shaObj.getHash("SHA-512", "HEX");
    return hash;
}

function AC_login(){
    var para = { 'account':$('#account').val() , 'password':shaShift($('#password').val())};
    $.post('Account/do_login_mobile', para, function(r){
        if(r.isFB=='true'){
            //$('#login')[0].onclick = FB_login;
            alert("此信箱已使用facebook登入過\n請改用facebook帳號登入");
            $('#password').val('');
        }else if(r.isLoginOK =="true"){
            if( r.REQUEST_URI ){
                location.href = r.REQUEST_URI;
            }else
                location.href = "question_select";
        }else if(r.isLoginOK =="false"){
            $('#password').val('');
            if(r.msg == "passwd_fail") {
                alert('登入失敗, 輸入密碼錯誤！');
            } else if(r.msg == "no_account") {
                alert('登入失敗, 無此帳號！\n請建立新帳號或使用facebook帳號登入');
            }
            else {
                alert('登入失敗！');
            }
        }
    });
    return false;
}

$( document ).on( "pageshow", "#index", function() {
    /*
    switch (indexAlert) {
        case    1 :
            alert('您尚未進行登入動作！');
            break;
        case    2 :
            alert('您沒有足夠的權限來進行這項操作！');
            break;
        case    3 :
            alert("此帳號已於另一處被登入！");
            break;
        default :
            break;
    }
    */
});
