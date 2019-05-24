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
    // console.log(imgData);
    //2、数据绑定
    //传递一个对象进来，返回对应的结构字符串
    let queryHTML=({id,pic,title,link}={})=>{
        if (typeof  id==='undefined') {
            return'';
        }
       return ` <a href="${link}">
            <div><img src="${pic}" alt=""></div>
            <span>
                ${title}
            </span>
        </a>`
    };
    let $boxList=$('.flowBox>li'),
        boxList=[].slice.call($boxList);
    for (let i = 0; i < imgData.length; i+=3) {
        //分别获取每三个为一组，一组中的三个内容(存在的隐性风险，当前数据总长度不是3的倍数，那么最后
        // 一次循环的时候，三个中的某一个会不存在，获取的值是undefined)
        let item1=imgData[i],
            item2=imgData[i+1],
            item3=imgData[i+2];
        //=>我们要把获取的item依次插入到每一个LI当中，但是不是按照顺序插入，我们需要
        // 先按照每一个LI的现有高度给每一个LI进行排序（小-》大），按照最新的顺序依次插入即可
        boxList.sort((a,b)=>{
            return a.offsetHeight-b.offsetHeight}).forEach((curLi,index)=>{
                curLi.innerHTML+=queryHTML(eval('item'+(index + 1)));
            });


    }

});