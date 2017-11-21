(function(){
	$.MsgBox = {
		Alert: function(_option){
			var btnOption = {
				title: _option.title,
				msg:_option.msg,
				btnLeft: _option.btnLeft,
				btnRight: _option.btnRight,
				btnLeftHref:_option.btnLeftHref,
				btnRightHref:_option.btnRightHref,
			}

			if(btnOption.title == undefined){
				btnOption.title = "提示";
			}
			if(btnOption.btnLeft == undefined){
				btnOption.btnLeft = "";
			}
			if(btnOption.btnRight == undefined){
				btnOption.btnRight = "确定";
			}
			if(btnOption.btnLeftHref == undefined){
				btnOption.btnLeftHref = "javascript:void(0)";
			}
			if(btnOption.btnRightHref == undefined){
				btnOption.btnRightHref = "javascript:void(0)";
			}

			GenerateHtml("alert", btnOption.title, btnOption.msg, btnOption.btnLeft,btnOption.btnRight, btnOption.btnLeftHref,btnOption.btnRightHref);
            btnOk(); //alert只是弹出消息，因此没必要用到回调函数callback
            btnNo();
		},
		Confirm: function(_option){
			var btnOption = {
				title: _option.title,
				msg:_option.msg,
				btnLeft: _option.btnLeft,
				btnRight: _option.btnRight,
				btnLeftHref:_option.btnLeftHref,
				btnRightHref:_option.btnRightHref,
				callBack:_option.callBack
			}

			if(btnOption.title == undefined){
				btnOption.title = "提示";
			}
			if(btnOption.btnLeft == undefined){
				btnOption.btnLeft = "取消";
			}
			if(btnOption.btnRight == undefined){
				btnOption.btnRight = "确定";
			}
			if(btnOption.btnLeftHref == undefined){
				btnOption.btnLeftHref = "javascript:void(0)";
			}
			if(btnOption.btnRightHref == undefined){
				btnOption.btnRightHref = "javascript:void(0)";
			}

			GenerateHtml("confirm",btnOption.title, btnOption.msg, btnOption.btnLeft,btnOption.btnRight, btnOption.btnLeftHref,btnOption.btnRightHref);
            btnOk(btnOption.callBack); 
            btnNo();
		}
	}

	var GenerateHtml = function(type,tit,msg,btnLeft,btnRight,leftHref,rightHref){
		var _html = "";
		_html = "<div id='mb_box'></div><div id='mb_con'>";
		_html += "<div id='mb_tit'>"+ tit +"<i class='imgAll Icon_close'></i></div>";
		_html +="<div id='mb_msg'>"+ msg +"</div><div id='mb_btnbox'>";

		if(type == "alert"){
			_html += '<a id="mb_btn_ok" class="alertBtn" href="'+ rightHref +'">'+ btnRight +'</a>';
		}

		if(type == "confirm"){
			_html += '<a id="mb_btn_no" href="'+ leftHref +'">'+ btnLeft +'</a>';
            _html += '<a id="mb_btn_ok" class="color-success" href="'+ rightHref +'">'+ btnRight +'</a>';
		}
		_html +='</div></div>';

		 //必须先将_html添加到body，再设置Css样式
        $("body").append(_html);
        GenerateCss();
	}
	var GenerateCss = function(){
		$("#mb_box").css({
			width: '100%',height:'100%',zIndex:999,position:'fixed',top:0,left:0,
			backgroundColor:'#000',opacity: '0.6',filter:'alpha(opacity=60)','-moz-opacity':'0.6'
		});
		 $("#mb_con").css({
            zIndex: '1000', position: 'fixed',width:'340px',fontSize:'14px',
            backgroundColor: '#fff',padding:'0 10px',color:'#333',
        });
		$("#mb_tit").css({
			position:"relative",padding:'10px 0',fontWeight:"bold",color:'#666',
			borderBottom: '1px solid #ddd',
		});
		$("#mb_tit .Icon_close").css({
			position:"absolute",right: '2px',top: '10px',
			display:'inline-block',cursor:'pointer'
		});
		$("#mb_msg").css({
            padding: '50px 0', lineHeight:'20px',
            textAlign: 'center'
        });
		$("#mb_btnbox").css({
            padding:"0px 60px 22px"
        });
        $("#mb_btn_ok,#mb_btn_no").css({ 
            display:'inline-block', width: '95px', height: '30px',lineHeight: '30px',borderRadius:"3px",
            fontSize:'14px',color:'#fff',textAlign:'center',cursor:'pointer','text-decoration':'none' 
        });
        $("#mb_btn_no").css({
           backgroundColor:'#B5B5B5',
           marginRight: '20px'
        });
        $("#mb_btn_ok").css({
           backgroundColor:'#50b400'
        });
        $("#mb_btn_ok.alertBtn").css({
        	marginLeft: '62px'
        })

        var _width = document.documentElement.clientWidth; //屏幕宽
        var _heigth = document.documentElement.clientHeight; //屏幕高

        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();

        //让提示框居中
        $("#mb_con").css({ top: (_heigth - boxHeight) / 2 + "px", left: (_width - boxWidth) / 2 + "px" });
	}

	//确定按钮事件
    var btnOk = function (callback) {
        $("#mb_btn_ok").click(function () {
            $("#mb_box,#mb_con").remove();
            if (typeof (callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function () {
        $("#mb_btn_no,#mb_tit i").click(function () {
            $("#mb_box,#mb_con").remove();
        });
    }

})();


function showDialog(_option){
	var option = {
		Id: _option.Id,
		width: _option.width,
		height: _option.height,
		H_html: _option.Head_html,
		Sec_html: _option.Section_html
	}
	// var obj = this;

	if(option.width == undefined){
		option.width = 580;
	}
	if(option.height == undefined){
		option.height = 610;
	}
	if(option.H_html == undefined){
		option.H_html = '';
	}
	if(option.Sec_html == undefined){
		option.Sec_html = '';
	}


	this.Init = function(){
		var dialogHtml = '';
		dialogHtml = '<div class="DialogWrap" id='+ option.Id +'>';
		dialogHtml += '<div class="DialogBg">';
		dialogHtml +='<div class="DialogContent" style="width:'+ option.width +'px;height:'+ option.height +'px;">';
		dialogHtml += '<div class="DialogHeader"><b>'+ option.H_html +'</b><i class="imgAll Icon_close dele-posit"></i></div>';
		dialogHtml += '<div class="DialogSection">'+ option.Sec_html +'</div>';
		dialogHtml +='</div></div>';

		$("body").append(dialogHtml);

		$("#"+option.Id).show();
		$("#"+option.Id + " .DialogContent").css({
			"margin-top": -option.height/2 +"px",
			"margin-left": -option.width/2 +"px",
		});
		$("#"+ option.Id +" .DialogHeader i").click(function(){
			$("#"+option.Id).hide();
		})
	}
	this.Init();
}

//输出弹窗
$.fn.ShowWarnTip = function(_options){
	var option = {
		id: _options.id,
		html: _options.html,
		width: _options.width != undefined ? _options.width : "auto",
		offsetX: _options.offsetX,
        offsetY: _options.offsetY,
	}

	if(option.offsetX == undefined){
		option.offsetX = this.width();
	}else{
		option.offsetX = this.width() + option.offsetX;
	}

	if(option.offsetY == undefined){
		option.offsetY = 0;
	}
	// console.log(this[0].offsetTop);
	// console.log(this[0].offsetLeft);
	var topPx = option.offsetY + this[0].offsetTop;
	var leftPx = option.offsetX + this[0].offsetLeft;

	if($("#"+ option.id).length > 0){

	}else{
		var ShowTip = '<div id="'+ option.id +'" class="DialogKuang" style="top:' + topPx + 'px;left:' + leftPx + 'px;">'
			+'<div class="input_warn"><span class="info">'+ option.html+'</span></div></div>';

		$("body").append(ShowTip);
	}
}


//隐藏弹窗
$.fn.RemoveTip = function(){
	this.remove();
}

//删除弹窗
$.fn.HideWranTip = function(){
	this.hide();
}


	