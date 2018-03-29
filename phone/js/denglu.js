function denglu(email, password) {
    $.ajax({
        url : ajaxUrl+"/GetLoginInInfoJson.ashx",
        type : 'GET',
        data : {
            email : email,
            password : password,
        },
        dataType : 'json',
        success : function(data) {
            alert("success登陆成功");
            console.log(data);
        },
        error : function(data) {
            console.log(data);
            alert(data.response)
        }
    })
}

function zhuce(email, password, name) {
    $.ajax({
        url : ajaxUrl+"/GetSignupInfoJson.ashx",
        type : 'GET',
        data : {
            email : email,
            password : password,
            name : name,
            comany : "",
            school : "",
            phone : "",
            address : "",
            zip : "",
            city : "",
        },
        dataType : 'json',
        success : function(data) {
            alert("success注册成功");
            console.log(data);
        },
        error : function(data) {
            console.log(data);
            alert(data.response)
        }
    })
}

function isEmail(str) {
    var filter = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
    if (filter.test(str)) {
        // alert("true")
        return true;
    } else {
        alert('请输入正确的邮件地址');
        return false;
    }
}

function isName(str) {
    var reg = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
    if (reg.test(str)) {
        return true;
    } else {
        alert("用户名格式不正确,用户名不含有空格及特殊字符");
        return false;
    }
}

function isMima(str) {
    var reg = /^[0-9A-Za-z]{6,}$/;
    if (reg.test(str)) {
        return true;
    } else {
        alert("密码格式不正确，密码至少是六位字母加数字组成");
        return false;
    }
}