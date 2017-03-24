/**
 * Created by dell on 2017/3/22.
 */
define(['jquery','template','ckeditor','uploadify','datepicker','language','region','form','validate'],function ($,template,CKEDITOR) {

    $.ajax({
        type:'get',
        datetype:'json',
        url:'/api/teacher/profile',
        success:function (data) {

                var htl=template('templatetpl',data.result);
                $("#templateinfo").html(htl);

            $('#upfile').uploadify({
                buttonText : '',
                width : 120,
                height : 120,
                fileObjName:'tc_avatar',
                buttonText:'',
                swf : '/public/assets/uploadify/uploadify.swf',
                uploader : '/api/uploader/avatar',
                onUploadSuccess : function(file,data){
                    data = JSON.parse(data);
                    $('.preview img').attr('src',data.result.path);
                }
            });
                //设置富文本的属性
            CKEDITOR.replace('ckeditor',{
                toolbarGroups : [
                    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] }
                ]
            });
            //三级联动插件
            $('.hometown').region({
                url : '/public/assets/jquery-region/region.json'
            });

           // 表单验证
            $("#profileForm").validate({
                sendForm:false,//取消表单默认提交事件
                valid:function () {

                    // 同步更新富文本的内容变化
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }

                    // 省市县信息
                    var p = $('#p option:selected').text();
                    var c = $('#c').find('option:selected').text();
                    var d = $('#d').find('option:selected').text();
                    var hometown = p + '|' + c + '|' + d;

                    //表单提交插件
                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/teacher/modify',
                        datetype:'json',
                        data : {tc_hometown : hometown},
                        success:function (data) {
                            if(data.code == 200){
                                location.href = '/index/settings';
                            }
                        },
                        error:function (data) {
                            console.log(data);
                        }

                    })
                },


                eachInvalidField : function(){
                    $(this).closest('.form-group').removeClass('has-success').addClass('has-error');
                },
                eachValidField : function(){
                    $(this).closest('.form-group').removeClass('has-error').addClass('has-success');
                },
                description : {
                    tcName : {
                        required : '用户名不能为空'
                    },
                    tcTel : {
                        required : '电话不能为空',
                        pattern : '只能是11位数字'
                    }

                }

                
                    
            })


           
        }


    })
})