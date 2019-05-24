let utils = function () {
    //获取可是窗口的宽度和高度
    function win(attr, value) {
        if (!value) {
            //如果不传值，则为获取
            return document.documentElement[attr] || document.body[attr];
        }
        //如果传值则设置
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }
    //获取到浏览器的偏移量
    function offset(Ele) {
        let left = Ele.offsetLeft;
        let top = Ele.offsetTop;
        let parent = Ele.offsetParent;
        while (parent) {
            //如果不是低版本IE8及以下，则要加上clientWidth、clientHeight
            if (!/MS IE8\.0/.test(navigator.userAgent)) {
                left += parent.clientWidth;
                top += parent.clientHeight;
            }
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            left,
            top
        };
    }
    //封装getCSS
    function getCss(Ele, attr) {
        //getComputedStyle 获取CSS样式
        let val;
        val = window.getComputedStyle(Ele)[attr];
        var reg = /-?(\d|[1-9]\d+)(\.\d+)?(px|pt|rem|em)/;
        if (reg.test(val)) {
            return parseFloat(val);
        }
        return val;
    }
    //封装getCSS方法
    function setCss(Ele, attr, value) {
        //判断是否是需要加上px
        let reg = /^(width|height|fontSize)(margin|padding)?(left|top|right|bottom)$/;
        if (reg.test(attr)) {
            /px/.test(value) ? null : value += 'px';
        }
        Ele.style[attr] = value;
    }
    //设置一组样式
    function setGroupCss(attr, obj) {
        if ({}.toString.call(obj) === '[object Object]') {
            for (var key in obj) {
                setCss(attr, key, obj[key]);
            }
        }
    }
    //封装css样式
    function css(...arg) {
        if (arg.length === 3) {
            //如果长度为3，则为设置样式，调用setCss方法
            setCss(...arg);
        } else if (arg.length === 2) {
            //如果长度为2，则判断第二个是否是对象，调用getCss方法或者setGroupCss方法
            if (Object.prototype.toString.call(arg[1]) === '[object Object]') {
                //如果是对象，则调用setGroupCss方法
                setGroupCss(...arg);
            } else {
                return getCss(...arg);
            }
        }
    }
    //封装getRandom方法
    function getRandom(m, n) {
        m = Number(m);
        n = Number(n);
        if (!isNaN(m) && !isNaN(n)) {
            //如果二者都是有效数字
            if (n > m) {
                [m, n] = [n, m];
            }
            return Math.round(Math.random() * (m - n) + n);
        }
    }
    return {
        getCss,
        setCss,
        setGroupCss,
        css,
        getRandom,
        win,
        offset
    };
}();

//# sourceMappingURL=utils-compiled.js.map