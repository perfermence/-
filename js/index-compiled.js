//获取元素
let box = document.getElementById("box");
let ulS = document.getElementsByTagName("ul");
let imgS = document.getElementsByTagName("img");
let bodyH = null; //先将body的高度设置为null，后面需要用
ulS = [...ulS]; //将uls转数组，以调用sort方法
//绑定数据
function bind(n) {
    for (let i = 0; i < n; i++) {
        //遍历要添加的li个数
        //给最小高度的ul加上li标签
        ulS[0].innerHTML += `
        <li style="height:${utils.getRandom(270, 350)}px">
            <img src = "../img/loading.gif" photo="img/${utils.getRandom(1, 10)}.png" alt="">
            <a href="javascript:void(0)">点击查看详情</a>
        </li>
        `;
        ulS.sort((a, b) => {
            return utils.css(a, 'height') - utils.css(b, 'height');
        }); //从小到大排序
    }
    bodyH = ulS[0].offsetHeight; //将最小的那项高度赋值给bodyH
}
fn();
//滚动条滚动的时候让图片加载
window.onscroll = fn;
function fn() {
    //循环判断是否加载下一屏
    //获取滚动条卷去的高度
    let winT = utils.win('scrollTop');
    //获取可视窗口的高度
    let winH = utils.win('clientHeight');
    //如果可视窗口的高度+滚动条卷去的高度之和大于bodyH的值，则加载
    if (winH + winT > bodyH) {
        bind(20);
    }
    //循环遍历所有的图片
    for (let i = 0; i < imgS.length; i++) {
        lazyImg(imgS[i]);
    }
}
//封装图片是否懒加载的问题
function lazyImg(Ele) {
    //获取滚动条卷去的高度
    let winT = utils.win('scrollTop');
    //获取可视窗口的高度
    let winH = utils.win('clientHeight');
    //获取图片距离浏览器顶部的距离
    let imgT = utils.offset(Ele).top;
    //获取图片的高度
    let imgH = Ele.offsetHeight;
    //如果winT+winH>imgT+imgH/2,则加载
    if (winH + winT > imgT) {
        if (Ele.flg) {
            return;
        }
        let newImg = new Image();
        let photo = Ele.getAttribute("photo");
        newImg.src = photo;
        newImg.onload = function () {
            Ele.src = this.src;
            Ele.flg = true; //给当前元素绑定flg属性
            newImg = null;
            fadeIn(Ele);
        };
    }
}
//封装fadeIn方法
function fadeIn(Ele) {
    //设置初始值
    utils.css(Ele, 'opacity', 0);
    //获取图片的高度
    let imgH = Ele.offsetHeight;
    //获取滚动条卷去的高度
    let winT = utils.win('scrollTop');
    //获取可视窗口的高度
    let winH = utils.win('clientHeight');
    //获取图片距离浏览器顶部的距离
    let imgT = utils.offset(Ele).top;
    //设置定时器
    Ele.timer = setInterval(function () {
        //获取当前的透明度
        let curOp = utils.css(Ele, 'opacity');
        curOp = parseFloat(curOp) + 0.2;
        if (winH + winT > imgH + imgT) {
            //如果可视窗口的高度+滚动条卷去的高度之和大于图片的高度和图片距离浏览器顶部的距离之和，设置透明度最大，并清除定时器
            clearInterval(Ele.timer);
            utils.css(Ele, 'opacity', 1);
            return;
        }
        utils.css(Ele, 'opacity', curOp);
    }, 17);
}

//# sourceMappingURL=index-compiled.js.map