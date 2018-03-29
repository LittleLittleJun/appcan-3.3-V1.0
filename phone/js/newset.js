function newset2(n) {
    $.ajax({
        url : ajaxUrl+'/GetNewProductsJson.ashx',
        type : 'GET',
        dataType : 'json',
        success : function(data) {
            //  console.log(data)
            localS("znum", data.ItemList.length);
            var listData = [];
            for (var i = 0; i < n; i++) {
                var idd = "li" + i;
                 var img81=data.ItemList[i].Image.replace("www.zsbio.com","www.zsbio.com:81");
                var imgT = img81;
                if (imgT == "") {
                    imgT = "images/zanwu.png";
                }
                var list = {
                    title : data.ItemList[i].Id,
                    describe : data.ItemList[i].Name,
                    note : data.ItemList[i].CategoryId,
                    icon : imgT,
                    id : i
                }
                listData.push(list);
            }
            lv.set(listData);
            lv.on("click", function(ele, obj, curEle) {
                var $this = obj.id;
                localS("productsID", data.ItemList[$this].Id);
                localS("proName", data.ItemList[$this].Name);
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
        },
        error : function() {
            console.log("error");
        }
    })
}
