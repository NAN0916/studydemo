
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

    var flag = $.cookie('PHPSESSID');

    var pathname=location.pathname;
    if(!flag && pathname.indexOf('login')==-1){
        // 没有登录
        location.href = '/login'
    }
    