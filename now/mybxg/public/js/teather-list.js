/*
*
* 讲师管理
*
* */
define(['jquery','template','util','bootstrap'],function ($,template,util){

    // 处理选中状态
    util.setMenu(location.pathname);

    $.ajax({
        type:'get',
        url:'/api/teacher',
        dateType:'json',
        success:function (data) {

            //数据解析，渲染页面
            // 模板引擎的作用 设置模板+数据==静态页面片段
          var html=template('templateTpl',{list:data.result});
            $("#teachetList").html(html);

// 查看
            $(".teacherBtns").find('a:eq(0)').click(function () {
                //处理弹框
                var tc_id=$(this).parents('td').attr('data-tcid');
                $.ajax({
                    type:'get',
                    url:'/api/teacher/view',
                    dateType:'json',
                    data : {tc_id : tc_id},
                    success:function (data) {
                        if(data.code == 200){

                            data.result.tc_hometown = data.result.tc_hometown.split('|').join(' ');
                            var html=template('teacherInfoModal',data.result)

                            $("#teacherInfo").html(html);
                            $('#teacherModal').modal();
                        }

                    }
                })

            })
            // 注销
            $(".teacherBtns").find('a:eq(2)').click(function (){
                var tc_status=$(this).parents("td").attr('data-status');
                var tc_id=$(this).parents('td').attr('data-tcid');
                var td=$(this).parents('td');
                var that=this;
               $.ajax({
                   type : 'post',
                   dateType:'json',
                   url : '/api/teacher/handle',
                   data:{tc_id:tc_id,tc_status:tc_status},
                   success:function (data) {

                        if(data.result.tc_status==0)
                        {
                            $(that).text('启 用');
                        }else {
                            $(that).text('注 销');
                        }
                       td.attr('data-status',data.result.tc_status);
                   },
               })


            })

        }
    });
    

});