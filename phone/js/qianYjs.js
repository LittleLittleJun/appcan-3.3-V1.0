function qianYjs2(qz, lvv, index, page, cl) {
    $("#title").html("");
    $.ajax({
        url : ajaxUrl+"/GetPublishingJson.ashx?category=" + qz + "&index=" + index + "&numPage=" + page,
        type : 'GET',
        dataType : 'json',
        success : function(data) {
            $("#title").html(qz);
            var listData2 = [];
            for (var i = 0; i < data.publishList.length; i++) {
                var list = {
                    title : data.publishList[i].Title,
                    id : i,
                    icon : "css/icons/icon-caret-right.png"
                }
                listData2.push(list);
            }
            lvv.set(listData2);
            lvv.on("click", function(ele, obj, curEle) {
                appcan.locStorage.val("titleq", qz);
                var linenum = obj.id;
                localS("qzID", data.publishList[linenum].ID);

                qianNewInfo(locGet("qzID"));

            })
        }
    })
}

function qianNewInfo(ID) {
    // alert("qianNewInfo");
    $.ajax({
        url : ajaxUrl+"/GetPublishingInfoJson.ashx?ID=" + ID,
        type : 'GET',
        dataType : 'json',
        success : function(data) {

            appcan.locStorage.val("pubcontent", data.publishing.Contents);
            var str = data.publishing.Contents[0] + data.publishing.Contents[1] + data.publishing.Contents[2] + data.publishing.Contents[3];
            if (str == "http") {
                localS("urlID", data.publishing.Contents);
                appcan.window.open({
                    name : "qianYjs",
                    data : "qianYjs.html"
                });

            } else {
                localS("urlID", "qianYjs_content.html");
                localS("PublishingContents", data.publishing.Contents);

                appcan.window.open({
                    name : "qianYjs",
                    data : "qianYjs.html"
                });
                appcan.window.evaluatePopoverScript({
                    name : 'qianYjs',
                    popName : 'content',
                    scriptContent : 'refreshdetail()'
                });
            }
        }
    })
}

