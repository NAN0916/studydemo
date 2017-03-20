/**
 * Created by dell on 2017/3/19.
 */
define(['jquery','template'],function($,template){


    var data={
      arr:['苹果','香蕉','葡萄']
    }
    //
    var rem = template('template',data);//使用template

    $('.one').html(rem);

})