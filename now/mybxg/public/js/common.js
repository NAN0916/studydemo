define(['jquery','echarts','cookie'],function($,echarts){
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    var flag = $.cookie('PHPSESSID');
    var pathname=location.pathname;
    if(!flag && pathname.indexOf('login')==-1){
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




    //设置头像和名字
    var obj=JSON.parse($.cookie('logInfo'));

    $(".aside .profile img").attr("src",obj.tc_avatar);
    $(".aside .profile h4").html(obj.tc_name);



})





