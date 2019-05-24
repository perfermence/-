/*瀑布流
    效果：多列的不规则排列，每一列中有很多列，每一项内容的高度不定，最后我们按照规则排列，
    三列之间不能相差太多高度

    实现：首先获取需要展示的数据（假设有50条，共有三列），把50条数据中的前三条依次插入到三列中（目前有的列高，
    有的列低），接下来再拿出三条数据，但是本次插入不是依次插入，而是需要把当前三列按照高矮进行排序，
    最矮的先插入内容，以此类推，把50条数据都插入即可
*
*
* */
$(function () {
    //=>当HTML结构加载完成才会执行这里的代码
    //1、获取需要的数据(真实项目当中，我们第一页加载完成，当用户下拉到底部，开始获取第二页的内容。
    // 服务器端会给我们提供一个API获取数据的地址，并且要求客户端把获取的内容是第几页的内容传递给服务器，
    // 服务器依照这个原理把对应不同的数据返回)“分页技术”
    let page=0;
    let imgData=null;
    let isRun=false;
    let queryData=()=> {
        page++;
        $.ajax({
            url:`json/data.json?page=${page}`,
            method:'get',
            async:false,//同步请求，真实项目中为异步
            dataType:'json',//把从服务器端获取的json字符串转换为对象（我们这样设置后，JQ内部会帮我们转换）
            success:result=>{
                //=>result：我们从服务器端获取到的结果
                imgData=result;
            }
        });
    };
    queryData();
    //数据绑定
    let bindHTML=function(){
        let $boxList=$('.flowBox>li');
        for (let i = 0; i < imgData.length; i+=3) {
            $boxList.sort((a,b)=>{
                return $(a).outerHeight()-$(b).outerHeight();
            }).each((index,curLi)=>{
                //第一个LI索引0 index->imgData[0]
                //第二个索引1 index->imgData[1]
                let item=imgData[i+index];
                if(!item) return;
                let{id,pic,link,title}=item;
                $(` <a href="${link}">
            <div><img src="${pic}" alt=""></div>
            <span>
                ${title}
            </span>
        </a>`).appendTo($(curLi));
            });
        }
        isRun=false;//当前这一组数据绑定完成，让isrun为false，代表加载完成
    };
    bindHTML();

    //当滚动到页面底部的时候，加载下一页的更多数据

    $(window).on('scroll',()=>{
    let winH=$(window).outerHeight(),
        pageH=document.documentElement.scrollHeight||document.body.scrollHeight,
        scrollT=$(window).scrollTop();
    //卷去的高度等于真时高度-屏幕高度，就见底了,开始加载更多数据
    if((scrollT+100)>=(pageH-winH)){
        //隐性问题：人为操作滚动，这个在同一操作会被触发N次，也就是同一个时间段获
        //取数据都会被执行N次，此时我们需要做“重复操作限定”。
        if(isRun) return;
        isRun=true;//开始进行新一轮处理
        if (page>5){
            alert("没有更多数据了");
            return;
        }
        queryData();
        bindHTML();
    }
})
});