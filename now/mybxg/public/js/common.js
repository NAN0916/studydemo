
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

    var flag = $.cookie('PHPSESSID');

    if(!flag){
        // 没有登录
        location.href = '/login'
    }