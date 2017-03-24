

require.config({
    baseUrl : '/public/assets',
    paths : {
        jquery : 'jquery/jquery.min',
        cookie : 'jquery-cookie/jquery.cookie',
        echarts : 'echarts/echarts.min',
        template : 'artTemplate/template',
        bootstrap : 'bootstrap/js/bootstrap',
        nprogress : 'nprogress/nprogress',
        datepicker : 'bootstrap-datepicker/js/bootstrap-datepicker',
        language : 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        validate : 'validate/jquery-validate',
        form : 'jquery-form/jquery.form',
        util : '../js/util',
        overlay : '../js/overlayer',
        ckeditor:'ckeditor/ckeditor',// 富文本
        region:'jquery-region/jquery.region',
        uploadify:'uploadify/jquery.uploadify'//上传文件

    },
    shim : {
        bootstrap : {
            // 把bootstrap转成标准模块（依赖于标准的jQuery模块）
            deps : ['jquery']
        },
        language:{
          deps:['jquery','datepicker']
        },
        validate : {
            deps : ['jquery']
        },
        ckeditor : {
            exports : 'CKEDITOR',
            deps : ['jquery']
        },
        region:{
            deps:['jquery']
        },
        uploadify:{
            deps:['jquery']
        }


    }
});