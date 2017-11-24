if (window["console"] == undefined) {
    console = { log: function () { } };
}
//Tip弹出框
var DialogHeadHtml = ''
		+ '<div class="DialogFrame">'
			+ '<div class="DialogTop DialogIconShu tc_c"></div>'
			+ '<div class="DialogBody" >'
				+ '<div class="DialogContent"><div class="DialogContentInfo"><div class="DialogTopIE7 DialogIconShu tc_c"></div>';
var DialogFooterHtml = '<div class="DialogBottomIE7 DialogIconShu tc_g"></div></div></div>'
        + '<div class="DialogLeft DialogIconHeng tc_i"></div>'
        + '<div class="DialogRight DialogIconHeng tc_e"></div>'
    + '</div>'
    + '<div class="DialogBottom DialogIconShu tc_g"></div>'
    + '<div class="DialogLeftTop DialogIconHeng tc_a"></div>'
    + '<div class="DialogRightTop DialogIconHeng tc_d"></div>'
    + '<div class="DialogLeftBottom DialogIconShu tc_h"></div>'
    + '<div class="DialogRightBottom DialogIconShu tc_f"></div><div class="DialogJianTou ImageIcon tc_b"></div>'
+ '</div>'
+ '';
var DiaLogHelper = new function () {

    //获取元素的纵坐标 
    this.getTop = function (e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += DiaLogHelper.getTop(e.offsetParent);
        return offset;
    }
    //获取元素的横坐标 
    this.getLeft = function (e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += DiaLogHelper.getLeft(e.offsetParent);
        return offset;
    }
    this.stopPropagation = function (e) {
        var ev = e || window.event;
        if (ev.stopPropagation) {
            ev.stopPropagation();
        }
        else if (window.event) {
            window.event.cancelBubble = true;//兼容IE
        }
    }
}();
///输出html的弹框 id,html,offsetX,offsetY,JianTouLeft
$.fn.ShowTip = function (_options) {
    $.HideAll();
    var options = {
        id: _options.id,
        html: _options.html,
        offsetX: _options.offsetX,
        offsetY: _options.offsetY,
        JianTouLeft: _options.JianTouLeft,
        TipIsCenter: _options.TipIsCenter,
        top: _options.top, //是否固定定位top
        isInTag: _options.isInTag,  //是否在标签内部
        isDianDao: _options.isDianDao != undefined ? _options.isDianDao : true //是否颠倒
    };
    if (options.offsetX == undefined) {
        options.offsetX = -8;
    }
    else {
        options.offsetX -= 8;
    }
    if (options.offsetY == undefined) {
        options.offsetY = this.height();
    }
    if (options.JianTouLeft == undefined) {
        options.JianTouLeft = 0;
    }
    var topPx = options.offsetY + DiaLogHelper.getTop(this[0]);
    var leftPx = options.offsetX + DiaLogHelper.getLeft(this[0]);
    if ($('.mainDiv').length > 0) {
        topPx -= DiaLogHelper.getTop($('.mainDiv')[0]);
        leftPx -= DiaLogHelper.getLeft($('.mainDiv')[0]);
    }
    if ($(this).css("position") == "relative" && options.isInTag) {
        topPx = 0 + options.offsetY;
        leftPx = 0 + options.offsetX;
    }
    if ($("#" + options.id).length > 0) {
        $("#" + options.id).css({ display: "block", top: topPx + "px", left: leftPx + "px" });
        $("#" + options.id).click(function (e) {
            $(".DropDownList .icon_xialakuang_zhankai").removeClass("icon_xialakuang_zhankai").addClass("icon_xialakuang_shouqi");
            $("#cityTip").hide();
            $(" .dropnum_list").stop().slideUp(200);
            var ev = e || window.event;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            }
            else if (window.event) {
                window.event.cancelBubble = true;//兼容IE
            }
        });
    }
    else {
        var ShowResult = '<div id=' + _options.id + ' class="DialogKuang" style="top:' + topPx + 'px;left:' + leftPx + 'px;">';
        ShowResult += DialogHeadHtml;
        ShowResult += _options.html;
        ShowResult += DialogFooterHtml;
        ShowResult += '</div>';
        if (options.isInTag) {
            $(this).append(ShowResult);
        }
        else {
            if ($('.mainDiv').length > 0) {
                $(".mainDiv").append(ShowResult);
            }
            else {
                $("body").append(ShowResult);
            }
        }
        $("#" + options.id).click(function (e) {

            //$(".DropDownList .icon_xialakuang_zhankai").removeClass("icon_xialakuang_zhankai").addClass("icon_xialakuang_shouqi");
            //$(" .dropnum_list").stop().slideUp(200);
            var ev = e || window.event;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            }
            else if (window.event) {
                window.event.cancelBubble = true;//兼容IE
            }
        });
    }


    if (options.top != undefined) {
        leftPx = options.offsetX + DiaLogHelper.getLeft(this[0]);
        topPx = options.top;
        $("#" + options.id).css({ left: leftPx + "px", "top": options.top + "px", "position": "fixed" });
    }
    else {
        $("#" + options.id).css({ "position": "absolute" });
    }
    if (options.TipIsCenter) {
        $("#" + options.id + " .DialogJianTou").css({ "left": "50%", "margin-left": "-5px" });
        $("#" + options.id).css("left", (leftPx - ($("#" + options.id).width() - this.width()) / 2) + "px");
    }
    else {
        $("#" + options.id + " .DialogJianTou").css({ "left": options.JianTouLeft + 15 + "px", "margin-left": "0px" });
    }

    //if ($(this).css("position") == "relative" && options.isInTag) {
    if (options.isDianDao) {
        if ($("#" + options.id).offset().top - $(window).scrollTop() + $("#" + options.id).height() > $(window).height()) {
            $("#" + options.id).css("top", (topPx - $("#" + options.id).height() - options.offsetY) + "px");
            $("#" + options.id + " .DialogJianTou").addClass("tc_b1");
        }
        else {
            $("#" + options.id + " .DialogJianTou").removeClass("tc_b1");
        }
    }
    //}
    //else {
    //    if (((topPx + $("#" + options.id).height() - $(window).scrollTop() + $("#header").height()) > $(window).height()) && options.top == undefined) {
    //        $("#" + options.id).css("top", (topPx - $("#" + options.id).height() - options.offsetY) + "px");

    //        $("#" + options.id + " .DialogJianTou").addClass("tc_b1");

    //    }
    //    else {
    //        $("#" + options.id + " .DialogJianTou").removeClass("tc_b1");
    //    }
    //}

    // if(options.callback!=undefined)
    // {
    // 	options.callback(options.id);
    // }
}


//Tip弹出框
var DialogWarnHeadHtml = ''
		+ '<div class="hotel-warn"><span class="info">';
var DialogWarnFooterHtml = '</span></div>'
+ '';
var DiaLogWarn = new function () {

    //获取元素的纵坐标 
    this.getTop = function (e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += DiaLogWarn.getTop(e.offsetParent);
        return offset;
    }
    //获取元素的横坐标 
    this.getLeft = function (e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += DiaLogWarn.getLeft(e.offsetParent);
        return offset;
    }
    this.stopPropagation = function (e) {
        var ev = e || window.event;
        if (ev.stopPropagation) {
            ev.stopPropagation();
        }
        else if (window.event) {
            window.event.cancelBubble = true;//兼容IE
        }
    }
}();


///输出html的弹框 id,html,offsetX,offsetY,JianTouLeft
$.fn.ShowWarnTip = function (_options) {
    // $.HideAll();
    var options = {
        id: _options.id,
        html: _options.html,
        width: _options.width != undefined ? _options.width : "auto",
        offsetX: _options.offsetX,
        offsetY: _options.offsetY,
        JianTouLeft: _options.JianTouLeft,
        TipIsCenter: _options.TipIsCenter,
        DialogWarnHeadHtml: _options.DialogWarnHeadHtml != undefined ? _options.DialogWarnHeadHtml : DialogWarnHeadHtml,
        DialogWarnFooterHtml: _options.DialogWarnFooterHtml != undefined ? _options.DialogWarnFooterHtml : DialogWarnFooterHtml,
        isInTag: _options.isInTag  //是否在标签内部
    };
    if (options.offsetX == undefined) {
        //options.offsetX = -8;
        options.offsetX = this.width();
    }
    else {
        //options.offsetX -= 8;
        options.offsetX = this.width() + options.offsetX;
    }
    if (options.offsetY == undefined) {
        options.offsetY = 0;
    }
    if (options.JianTouLeft == undefined) {
        options.JianTouLeft = 0;
    }
    var topPx = options.offsetY + DiaLogHelper.getTop(this[0]);
    var leftPx = options.offsetX + DiaLogHelper.getLeft(this[0]);

    if ($('.mainDiv').length > 0) {
        topPx -= DiaLogHelper.getTop($('.mainDiv')[0]);
        leftPx -= DiaLogHelper.getLeft($('.mainDiv')[0]);
    }
    //var topPx = options.offsetY;
    //var leftPx = options.offsetX + 15;

    if ($(this).css("position") == "relative" && options.isInTag) {
        topPx = 0 + options.offsetY;
        leftPx = 0 + _options.offsetX;

    }
    if ($("#" + options.id).length > 0) {
        $("#" + options.id).css({ display: "block", top: topPx + "px", left: leftPx + "px" });
        $("#" + options.id).click(function (e) {
            var ev = e || window.event;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            }
            else if (window.event) {
                window.event.cancelBubble = true;//兼容IE
            }
        });
    }
    else {
        var ShowResult = '<div id=' + _options.id + ' class="DialogKuang" style="width:' + options.width + ';top:' + topPx + 'px;left:' + leftPx + 'px;">';
        ShowResult += options.DialogWarnHeadHtml;
        ShowResult += _options.html;
        ShowResult += options.DialogWarnFooterHtml;
        ShowResult += '</div>';

        if ($(this).css("position") == "relative" && options.isInTag) {
            $(this).append(ShowResult);
        }
        else {
            if ($('.mainDiv').length > 0) {
                $(".mainDiv").append(ShowResult);
            }
            else {
                $("body").append(ShowResult);
            }
        }
        $("#" + options.id).click(function (e) {
            var ev = e || window.event;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            }
            else if (window.event) {
                window.event.cancelBubble = true;//兼容IE
            }
        });
    }
    if (options.TipIsCenter) {
        $("#" + options.id + " .DialogJianTou").css({ "left": "50%", "margin-left": "-5px" });
        $("#" + options.id).css("left", (leftPx - ($("#" + options.id).width() - this.width()) / 2) + "px");
    }
    else {
        $("#" + options.id + " .DialogJianTou").css({ "left": options.JianTouLeft + 15 + "px", "margin-left": "0px" });
    }
    // if(options.callback!=undefined)
    // {
    // 	options.callback(options.id);
    // }
}



//隐藏弹框
$.fn.RemoveTip = function () {
    this.remove();
}
//隐藏弹框
$.HideAll = function () {
    $(".DialogKuang").hide();
}