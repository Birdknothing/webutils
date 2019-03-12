/**ie9兼容特效，鼠标悬浮，文字渐变划入(ie9 compatible mouse hover fadein text)
 * 使用：(how to use)
 * //绑定事件的div(hollowBox.parent() which binds the hover event)
 * <div>
 *      //实现动画需添加的空div，一级后代 (has to be the first generation)
 *      <div class='hollowBox'></div>
 *      //包含文字的div,初始opacity必须为0(initial opacity has to be zero)
 *      <div>文字</div>
 * </div>
 * //引入script
 * <script src='**\/hoverEffect.js'></script>
 */

//all hollowBox获取文字框的高度(hollowBox's default height equals txtDiv's height )
$('.hollowBox').css({height:function(){
   return $(this).next().css('height')
}});

var $containBox = $('.hollowBox').parent();
$containBox.hover(
    //鼠标进入(mouse enter)
    function(){
        var $hollowBox = $(this).children('.hollowBox');
        //辅助框消失，文字框显入
        $hollowBox.stop().animate({height:'hide'},'fast').next().stop().animate({opacity:1},'fast');
    },
    //鼠标离开(mouse leave)
    function(){
        var $hollowBox = $(this).children('.hollowBox');
        //辅助框渐入，文字框消失
        $hollowBox.stop().animate({height:'show'},'fast').next().stop().animate({opacity:0},'fast');
})
