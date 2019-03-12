/**
 * 兼容ie9的轮播图，用到jquery(ie9 compatible,jQuery required)
 * 使用方法--->(how to use)
 *  1：轮播图父容器加上类名 classTarget 自定义的值即可;(add className 'swiper' to the container div)
 *  2: 左右箭头分别加上 id 名 leftId 和 rightId 自定义的值即可(bind the id of arrows)
 * 
 * data-pics='4'//number of pics
 * data-width='2000'//width of per pic
 * data-interval='2000'//interval of swiper
 * data-actTime='500' //duration of each movement
 */

$(function(){
    //操作块的共同类( className of swipers container ?)
 var classTarget = '.swiper',
    //一共有几张图片( how many pics in total ?)
    n = $(classTarget).data('pics') || 3,
    //操作块的宽度( single image's width ?)
    width = $(classTarget).data('width') || 100,
    //轮播间隔( interval of each swipe ?)
    ms = $(classTarget).data('interval') || 2000,
    //单张动画的移动间隔，人眼动画间隔为ms - st ( duration of each swipe ?)
    st = $(classTarget).data('actTime') || 500,
    //最左图片的margin-left ( margin-left of the ultra left pic ?)
    ultraLeft = -width*Math.floor((n-1)/2),
    //最右图片的margin-right( margin-right of the ultra right pic ?)
    ultraRight = width*Math.ceil((n-1)/2),
    //绑定左按钮id （id of the left-click button ? )
    leftId = '#leftArrow',
    //绑定右按钮id (id of the right-click button ?)
    rightId = '#rightArrow';
    
    //初始化数组 (init an array)
    var arr = new Array(n);
    for(j=0;j<n;j++)
    {
        arr[j] = j;
    }
    //初始化父容器( init the css of the swiper container)
    $(classTarget).css({position : 'relative',overflow : 'hidden',margin : '0 auto'});
    //初始化图片位置
    for(i=0;i<arr.length;i++)
    {
        $(classTarget).children().eq(arr[i]).css({marginLeft:ultraLeft + (i+1)*width + 'px',position : 'absolute'});
    }
/************************************************** */
//左点击启动 (leftClick works after judgement)
function left(){
    var judge = guard();
    if(judge)
    {
        leftClick();
    }
}
//右点击启动 (rightClick works after judgement)
function right(){
    var judge = guard();
    if(judge)
    {
        rightClick();
    }
}
//轮播开始 (swiper begins)
(function(){
    setInterval(rightClick,ms);
})();
//画面右移 ( runing towards right )
function rightClick(){
    var $right = $(classTarget).children().eq(arr[n-1]);
    //最右边的块移到最左,这里应用动画，插入异步进程 (transfer the ultra right div to the ultra left)
    $right.animate({ marginLeft : ultraLeft + 'px' },0)
    //剩下的块整体右移一格( move the left divs to right )
    for(i=0;i<(arr.length-1);i++)
    {
        $(classTarget).children().eq(arr[i]).animate({marginLeft:ultraLeft + (i+1)*width + 'px'},st);
    }
    //刷新块地址 (refresh the stats of all divs)
    for(key in arr)
    {
        if(arr[key] === 0)
        arr[key] = n-1;
        else
        arr[key] -=  1;
    }
}
    //画面左移 (move divs to left)
    function leftClick(){
        var $left = $(classTarget).children().eq(arr[0]);
        //最左边的块移到最右,这里应用动画，插入异步进程(like above...)
        $left.animate({ marginLeft : ultraRight + 'px' },0)
        //剩下的块整体左移一格(like above...)
        for(i=1;i<arr.length;i++)
        {
            $(classTarget).children().eq(arr[i]).animate({marginLeft:ultraLeft + (i-1)*width + 'px'},st);
        }
        //刷新块地址(like above...)
        for(key in arr)
        {
            if(arr[key] === n-1)
            arr[key] = 0;
            else
            arr[key] +=  1;
        }
}
//判断点击是否执行( control the swiper where to begin )
function guard(){
    var $left = $(classTarget).children().eq(arr[0]);
    var str = $left.css('margin-left')
    //像素值取整(integerate the str)
    var nowLeft = parseInt(str.slice(0,-2));
    //没卡到帧时return( reject the click )
    if( nowLeft !== ultraLeft )
        return false;
    return true;
}
//点击绑定 (bind the button click events)
$(rightId).on('click',right);
$(leftId).on('click',left);
})
