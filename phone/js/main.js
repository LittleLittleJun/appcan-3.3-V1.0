function localS(a, v) {
    return appcan.locStorage.setVal(a, v);
}

function locGet(v) {
    return appcan.locStorage.getVal(v);
}

var j = 0;
//searchContent  产品列表页/////////////////////////////////////////////
function ajaxD(sval, ind, num) {
    j = 0;
    if ($("#inpp").val() == "") {
        $("#fontt").html("请先输入查询关键字");
    }
    var surl = ajaxUrl+'/GetProductJson.ashx?keyword=' + sval + '&index=' + ind + '&numPerPage=100';
    $.ajax({
        url : ajaxUrl+'/GetProductJson.ashx?keyword=' + sval + '&index=' + ind + '&numPerPage=' + num,
        type : 'GET',
        dataType : 'json',
        success : function(data) {
            // console.log(data)
            for (var i = 0; i < data.ItemList.length; i++) {
                j++;
                var idd = "d" + j;
                var HTML = '<span href="" class="de-aaa" id=' + idd + '><div class="ub ub-hor ub-f1 ulev-1 uinn ub-ac bc-border ubt ubb c-gra1 umh4 bgbg" ><div class="aui-ellipsis-2 ub-f1 ub-con ub-ac ub-pc ub bid myId">' + data.ItemList[i].Id + '</div><div class="umw1"></div><div class="ub-f1 ub-con ub-ac ub-pc ub mingcheng namE aui-ellipsis-2">' + data.ItemList[i].Name + '</div><div class="umw1"></div><div class="ub-f1 ub-con ub-ac ub-pc ub miaoshu aui-ellipsis-2">' + data.ItemList[i].Description + '</div><div class="umw1"></div><div class="ub-f1 ub-con ub-ac ub-pc ub shuoming aui-ellipsis-2">' + data.ItemList[i].CategoryId + '</div></div></span>'
                $("#buttom").append(HTML);
            }
            localS("numCp", j);
            $("#fontt").html("与" + sval + "相关的产品");

            if (data.ItemList.length == 0) {
                $("#fontt").html("您查找的内容不存在，请重新输入");
            }
            //product打开详情页
            $(".bgbg").each(function(j) {
                $(".bgbg").eq(j).on("tap", function() {
                    var $this = j;
                    localS("productsID", $(".myId").eq(j).html());
                    localS("proName", $(".namE").eq(j).html());
                    appcan.window.open({
                        name : "ProductDetail",
                        data : "ProductDetail.html"
                    });
                    appcan.window.evaluatePopoverScript({
                        name : 'ProductDetail',
                        popName : 'content',
                        scriptContent : ' detal_fun(locGet("productsID")) '
                    });
                })
                if (j % 2 == 0) {
                    $(".bgbg").eq(j).css({background:"#FCF8F8"});
                }
            })
        },
        error : function(e) {
            console.log('error');
        }
    })
}

//详细页的展示//////////////////////////////////////////////////////////////////////////////
function detal_fun(idd) {
    //alert(locGet("imei"));
   // alert(locGet("macAddress"));
    var Idd = locGet("productsID");
    $("#de-idd").html(Idd);
    $("#de-namee").html(locGet("proName"));
    appcan.ajax({
        url : ajaxUrl+'/GetProductInfoJson.ashx',
        type : 'GET',
        data : {
            id : idd,
            imei : locGet("imei"),
            macAddress : locGet("macAddress")
        },
        dataType : 'json',
        success : function(d) {
             //console.log(d);
            $("#de-list").empty();
            $("#lia").empty();
            $(".de-p").html("");
            $("#de-kl").html("");
            $("#de-sy").html("");
            $("#de-yx").html("");
            $("#de-yx2").html("");
            $("#de-zz").html("");
            $("#cpjj").html("");
            var html = "<div class='titleSearch'>" + "<div class='de-sou'><div class='titleId'>编号</div></div><div class='de-sou'>" + "<div class='titleSpc'>规格</div></div><div style='-webkit-box-flex:2;' class='de-sou'>" + "<div style='position:absolute;width:100%;line-height:2.5em;'>单价</div></div><div style='-webkit-box-flex:2;' class='de-sou'>" + "<div style='position:absolute;width:100%;line-height:2.5em;'>库存</div></div></div>";

            var html2 = "<div class='titleSearch'>" + "<div class='de-sou'><div class='titleId'>编号</div></div><div class='de-sou'>" + "<div class='titleSpc'>规格</div></div><div style='-webkit-box-flex:2;' class='de-sou'>" + "<div style='position:absolute;width:100%;line-height:2.5em;'>单价</div></div></div>";
            //判断有内容就显示，没有内容就不显示
            if (d.ItemInfo.ABType != "" || d.ItemInfo.Clonenumber != "" || d.ItemInfo.SampleType != "" || d.ItemInfo.Positive != "" || d.ItemInfo.PositiveControl != "" || d.ItemInfo.TissueProcessing != "") {
                $("#proInfo").html("产品信息");
                $("#proInfo").addClass("liListDetail");
            } else {
                $("#proInfo").html("");
                $("#proInfo").removeClass("liListDetail");
            }
            if (d.ItemInfo.ABType != "") {
                $("#lia").append('<li style="margin-left: 1em;" id="de-xx">' + d.ItemInfo.ABType + '</li>');
                //$("#de-xx").addClass("liListDetail");
            } else {
                $("#de-xx").removeClass("liListDetail");
            }
            if (d.ItemInfo.Clonenumber != "") {
                $("#de-kl").html("克&nbsp; 隆&nbsp; 系: " + d.ItemInfo.Clonenumber);
            } else {
                $("#de-kl").html("");
            }
            if (d.ItemInfo.SampleType != "") {
                $("#de-sy").html("适应组织:  " + d.ItemInfo.SampleType);
            } else {
                $("#de-sy").html("");
            }
            if (d.ItemInfo.Positive != "") {
                $("#de-yx").html("阳性部位:  " + d.ItemInfo.Positive);
            } else {
                $("#de-yx").html("");
            }
            if (d.ItemInfo.PositiveControl != "") {
                $("#de-yx2").html("阳性对照:  " + d.ItemInfo.PositiveControl);
            } else {
                $("#de-yx2").html("");
            }
            if (d.ItemInfo.TissueProcessing != "") {
                $("#de-zz").html("组织处理:  " + d.ItemInfo.TissueProcessing);
            } else {
                $("#de-zz").html("");
            }
            if (d.ItemInfo.Description != "") {
                $("#cpjj").html("产品简介");
                $(".de-p").html(d.ItemInfo.Description);
                $("#cpjj").addClass("liListDetail");
            } else {
                $("#cpjj").html("");
                $(".de-p").html("");
                $("#cpjj").removeClass("liListDetail");
            }
            if (d.ItemInfoList.length != 0) {
                $("#cplb").addClass("liListDetail");
                //根据手机的imei号判断是否显示库存信息
                if (d.IsAuthorized == 1) {
                    for (var i = 0; i < d.ItemInfoList.length; i++) {
                        var price = d.ItemInfoList[i].Price;
                        price = toRmb(price);
                        console.log(d.ItemInfoList);
                        html += '<div class="de-li ub ub-ac ub-pc"><div class="ub ub-f1 aui-ellipsis-2 dt_li">' + d.ItemInfoList[i].Id + '</div><div class="ub ub-f1 aui-ellipsis-2 dt_li">' + d.ItemInfoList[i].ProductId + '</div><div class="ub ub-f1 aui-ellipsis-2 dt_li2" style="text-align:right">' + price + '&nbsp;&nbsp;&nbsp;&nbsp;</div><div class="ub ub-f1 aui-ellipsis-2 dt_li">' + d.ItemInfoList[i].ResidueNum + '</div></div>';
                    }
                    $("#de-list").append(html);
                    $(".de-li").each(function(j) {
                        if (j % 2 == 0) {
                            $(".de-li").eq(j).css({background:"#EEF6EF"});
                        }
                    })
                } else {
                    for (var i = 0; i < d.ItemInfoList.length; i++) {
                        var price = d.ItemInfoList[i].Price;
                        price = toRmb(price);

                        html2 += '<div class="de-li de-li2 ub ub-ac ub-pc"><div class="ub ub-f1 aui-ellipsis-2 dt_li">' + d.ItemInfoList[i].Id + '</div><div class="ub ub-f1 aui-ellipsis-2 dt_li">' + d.ItemInfoList[i].ProductId + '</div><div class="ub ub-f1 aui-ellipsis-2 dt_li" style="text-align:right;">' + price + '&nbsp;&nbsp;&nbsp;&nbsp;</div></div>';
                    }
                    $("#de-list").append(html2);
                    $(".de-li").each(function(j) {
                        if (j % 2 == 0) {
                            $(".de-li").eq(j).css({background:"#F7F6F6"});
                        }
                    })
                }
            } else {
                $("#cplb").html("");
                $("#cplb").removeClass("liListDetail");
            }
            var img81=d.ItemInfo.PictureURL.replace("www.zsbio.com","www.zsbio.com:81");
            $("#de-img").attr("src", img81);
        },
        error : function(ee) {
            console.log(ee);
        }
    })
}

function toRmb(p) {
    if (p < 0) {
        p = "待定";
    } else {
        p = "￥" + p;
    }
    return p;
}
