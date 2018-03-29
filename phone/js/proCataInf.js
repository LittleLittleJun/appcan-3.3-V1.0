/////////////产品中心///////////
function proC() {
    var pci = appcan.locStorage.getVal("pci");
    $("#smallName").html(pci);
    $.ajax({
        url : ajaxUrl+'/GetProductCatagoryInfoJson.ashx?subcategory=' + pci,
        type : 'GET',
        dataType : 'json',
        success : function(data) {
            if(data.ItemInfoList[0]!=undefined){
                 $("#bigName").html(data.ItemInfoList[0].CategoryId+"&nbsp;>>");
             }
            $("#pciP").html(data.SubDescription)
            for (var i = 0; i < data.ImageURL.length; i++) {
                if (data.ImageURL[i] != "") {
                    var img81=data.ImageURL[i].replace("www.zsbio.com","www.zsbio.com:81");
                    var ht = "<img src='" + img81 + "' style='width:300px;height:30s0px;margin:10px 0px 10px 30px'/>";
                    $(".pcImg").after(ht);
                }
            }
            for (var j = 0; j < data.ProductContent.length; j++) {
                if (data.ProductContent.length != 0) {
                    $("#pcList").html(pci + "内容");
                }
                var lili = "<li>" + data.ProductContent[j] + "</li>";
                $("#pcI_ul").append(lili);
            }

            for (var i = 0; i < data.ItemInfoList.length; i++) {
                var html2 = '<div class="ub ub-hor ub-f1 ulev-1 uinn ub-ac bc-border ubt ubb c-gra1 umh4 bgbg bgbg2" ><div class="ub-f1 ub-con ub-ac ub-pc ub bid myId aui-ellipsis-2">' + data.ItemInfoList[i].Id + '</div><div class="umw1"></div><div class="ub-f1 ub-con ub-ac ub-pc ub mingcheng aui-ellipsis-2">' + data.ItemInfoList[i].Name + '</div><div class="umw1"></div><div class="ub-f1 ub-con ub-ac ub-pc ub miaoshu aui-ellipsis-2">' + data.ItemInfoList[i].Description + '</div><div class="umw1"></div><div class="ub-f1 ub-con ub-ac ub-pc ub shuoming aui-ellipsis-2">' + data.ItemInfoList[i].Manual_link + '</div></div>';
                $("#cpzxDecontent").append(html2);
                if (i % 2 == 0) {
                    $(".bgbg2").eq(i).css({
                        background : "#F7F6F6"
                    });
                }
            }

            $(".bgbg2").each(function(i) {
                $(this).on("click", function() {
                    appcan.locStorage.setVal("productsID", data.ItemInfoList[i].Id);
                    appcan.locStorage.setVal("proName", data.ItemInfoList[i].Name);
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
            })
        }
    })
}

proC();

