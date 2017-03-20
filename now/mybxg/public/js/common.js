
define(['jquery','echarts','template','cookie'],function($,echarts,template){
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    // 没有登录的时候跳转到登录页面
    var pathname = location.pathname;
    var flag = $.cookie('PHPSESSID');
    if(!flag && pathname.indexOf('login') == -1){
        // 没有登录
        location.href = '/login'
    }

//实现登陆功能
    $("#loginForm").submit(function () {
        var formData = $(this).serialize();
        $.ajax({
            type:'post',
            url: '/api/login',
            data:formData,
            dataType:"json",
            success:function (data) {
                if(data.code==200)
                {
                    //转为字符串
                    var logInfo=JSON.stringify(data.result);
                    $.cookie('logInfo',logInfo,{path : '/'});
                    location.href = '/index/index';
                }
            },
            error:function (data) {
                //打印错误信息
                console.log(data.responseText);
            }
        })
        return false;
    });


    //退出
    $("#loginout").click(function () {

        $.ajax({
            type : 'post',
            url : '/api/logout',
            dataType : 'json',
            success : function(data){
                if(data.code == 200){
                    location.href = '/login';
                }
            }
        });
    });

    //设置头像和名字
   //  // 渲染登录信息
    var obj = JSON.parse($.cookie('logInfo'));


   var tpl='<div class="avatar img-circle"> ' +
       '<img src="{{tc_avatar}}">' +
       ' </div> ' +
       '<h4>{{tc_name}}</h4>';

// 编译tpl
// 用obj渲染rem
 var render=template.compile(tpl);
    var thrmlStr=render(obj);
 $(".aside .profile ").html(thrmlStr);

   

});





