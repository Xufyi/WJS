/**
 * Created by Administrator on 2018/5/18.
 */
$(function () {
    //动态响应式轮播图
    banner();
    //产品部分导航滚动条
    initTab();
    //初始化问题提示工具
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
});
//设置轮播图
var banner = function () {
    /*目的：动态渲染轮播图的目的：避免网站一次性加载8张图片，
            让网站在移动端时加载4张，pc端加载4张
       流程：
     * 1.模拟数据（从后台回去数据） [{},{}]
     * 2.判断当前的设备     768px
     *3. 根据当前设备把数据转换成 html 拼接字符串
     * 3.1 点容器内容需要动态生成
     * 3.2 图片
     * 4.渲染到页面当中  html追加；
     * 5.测试能否响应 两种设备 监听设备尺寸改变重新渲染
     * 6.移动端 手势切换功能 左滑 右滑
     * */
    // 轮播图组件
    var $banner = $(".carousel");
    // 点容器
    var $point = $banner.find(".carousel-indicators");
    //图片容器
    var $image = $banner.find(".carousel-inner");
    //窗口对象
    var $window = $(window);


    // 1.模拟数据（从后台回去数据） [{},{}]
    var date = [
        {
            pcSrc: "images/wjs_pc_1.jpg",
            mSrc: "images/wjs_m_1.jpg"
        },
        {
            pcSrc: "images/wjs_pc_2.jpg",
            mSrc: "images/wjs_m_2.jpg"
        },
        {
            pcSrc: "images/wjs_pc_3.jpg",
            mSrc: "images/wjs_m_3.jpg"
        },
        {
            pcSrc: "images/wjs_pc_4.jpg",
            mSrc: "images/wjs_m_4.jpg"
        }
    ];
    //渲染操作
    var render = function () {
        //2.判断当前的设备     768px
        var isMobile = $window.width() < 992 ? true : false;
        var pointHTML = "";
        var imageHTML = "";
        //字符串拼接
        $.each(date, function (k, v) {
            //拿到点的内容
            pointHTML += '<li data-target="#carousel-example-generic" data-slide-to="' + k + '" ' + (k == 0 ? 'class="active"' : "") + '></li>\n';
            //拿到图片的内容
            imageHTML += '<div class="item ' + (k == 0 ? 'active' : '') + '">'
            if (isMobile) {
                imageHTML += '<img src="' + (v.mSrc) + '" >'
            } else {
                imageHTML += '<img src="" alt="..." style="background-image: url(' + v.pcSrc + ')">';
            }
            imageHTML += '</div>';

        });
        //console.log(pointHTML)
        //console.log(imageHTML)
        //追加到html中
        $point.html(pointHTML)
        $image.html(imageHTML)
    };
    render();
    //* 5.测试能否响应 两种设备 监听设备尺寸改变重新渲染
    //trigger主动加载注册事件
    //主动加载渲染事件，然后当屏幕大小变化时在加载渲染
    $window.on("resize", function () {
        render()
    }).trigger(
        "resize"
    )
    // * 6.移动端 手势切换功能 左滑 右滑


    var startX = 0;
    var distanceX = 0;
    var isMove = false;

    $banner.on("touchstart", function (e) {
        //获取按下屏幕的点X坐标
        //jq获取触摸点的方法  e.originalEvent.touches[0]
        startX = e.originalEvent.touches[0].clientX;
        // console.log(startX)
    }).on("touchmove", function (e) {  /*触摸点移动不断的捕获坐标*/
        //获取距离坐标
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        //console.log(distanceX)
        isMove = true;
    }).on("touchend", function (e) {
        //移动过并且距离超过50px
        //右滑 上一张
        if (isMove && distanceX >=50) {
            $banner.carousel("prev")
        }else if (isMove && distanceX <=50) {
        //左滑 上一张
            $banner.carousel("next")
        }
        //重置数据
         startX = 0;
         distanceX = 0;
         isMove = false;
    });
};

//产品部分导航滚动条
var initTab = function (){
    /*1. 把所有的页签子在一行显示 设置父容器的宽度是所有自容器宽度之和
    * 2.满足区域滚动的html结构要求 必须有大容器套着一个小容器
    * 3.实现滚动功能 使用区域滚动插件 Iscroll插件
    * */
    //   父容器
    var  tabs = $(".wjs_product .nav-tabs");
    //子容器
    var liLists = tabs.find("li");

    var width = 0
    // /*1. 把所有的页签子在一行显示 设置父容器的宽度是所有自容器宽度之和
    $.each(liLists,function(i,item){
         width += $(item).outerWidth(true);
        //console.log(width)
    })
    tabs.width(width)

    //运行左右滚动，不允许上下滚动
    new IScroll(".nav-tabs-parent",{
        scrollX : true,
        scrollY : false
    })
};
















