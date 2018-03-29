/////////////产品中心///////////
function cpzxCata() {
    var sum = 0;
    $.ajax({
        url : ajaxUrl+'/GetProductCategoryJson.ashx',
        type : 'GET',
        dataType : 'json',
        success : function(data) {

            for (var i = 0; i < data.Catagory.length; i++) {
                var ddd = "d" + i;
                var lists = "<li class='lili' id=" + ddd + ">" + data.Catagory[i].FCatagory + "</li><p></p>"
                $("#cpzxList").append(lists);
                var ccc = "c" + i;
                for (var j = 0; j < data.Catagory[i].SCatagory.length; j++) {
                    var html2 = "<div class=" + ccc + " style='padding-left:14%;line-height:1.8em;'>" + data.Catagory[i].SCatagory[j] + "</div>";
                    $("#" + ddd).after(html2);
                    sum++;
                }
            }

            $("#cpzxList li").each(function(i) {
                $(this).on("click", function() {
                    appcan.locStorage.setVal("pci", $(this).html());
                    appcan.window.open({
                        name : "ProductCatagoryInfo",
                        data : "ProductCatagoryInfo.html"
                    });
                    appcan.window.evaluatePopoverScript({
                        name : 'ProductCatagoryInfo',
                        popName : 'content',
                        scriptContent : ' window.location.reload(); '
                    });
                })
            })

            $("#cpzxList div").each(function(i) {
                $(this).on("click", function() {
                    appcan.locStorage.setVal("pci", $(this).html());
                    appcan.window.open({
                        name : "ProductCatagoryInfo",
                        data : "ProductCatagoryInfo.html"
                    });
                    appcan.window.evaluatePopoverScript({
                        name : 'ProductCatagoryInfo',
                        popName : 'content',
                        scriptContent : ' window.location.reload(); '
                    });
                })
            })
        }
    })

}

