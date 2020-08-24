$(function () {
  // 1.轮播图图片适应
  $(window).on("resize", function () {
    // 获取窗口大小
    let clientW = $(window).width();
    // console.log(clientW)
    // 设置临界值
    let isShowBigImg = clientW >= 800;
    // 获取所有item
    let $allItems = $("#xb_carousel .item");

    // 遍历
    $allItems.each(function (index, item) {
      let src = isShowBigImg ? $(item).data("lg-img") : $(item).data("sm-img")
      // let imgUrl='url("'+src+'")';
      let imgUrl = `url("${src}")`;
      // console.log(imgUrl);


      // 设置背景
      $(item).css({
        backgroundImage: imgUrl
      });
      // 设置img标签(小屏时轮播为图片)
      if (!isShowBigImg) {
        let $img = `<img src="${src}" ></img>`
        $(item).empty().append($img);
      } else {
        $(item).empty()
      }
    });
  });
  $(window).trigger("resize");

  // 2.工具提示
  $('[data-toggle="tooltip"]').tooltip()

  // 3.动态处理宽度
  $(window).on("resize", function () {
    let $ul = $("#xb_product .nav");
    let $allLis = $(`[role='presentation']`, $ul);
    // console.log($allLis)
    // 遍历
    let totalW = 0;
    $allLis.each(function (index, item) {
      totalW += $(item).width();
    });
    // 设置宽度
    let parentW = $ul.parent().width();
    if (parentW < totalW) {
      $ul.css({
        width: totalW + "px"
      })
    } else {
      // $ul.removeAttribute("style");
      // 上面语句会报错
      $ul.removeAttr("style")
    }
  });

  // 导航处理
  let $allLis = $("#xb_nav li");
  // 报错不是jquery方法
  $($allLis[0]).on("click", function () {
    $("html,body").animate({ scrollTop: $("#xb_about").offset().top }, 1000)
  });
  $($allLis[1]).on("click", function () {
    $("html,body").animate({ scrollTop: $("#xb_product").offset().top }, 1000)
  });
  $($allLis[2]).on("click", function () {
    $("html,body").animate({ scrollTop: $("#xb_hot").offset().top }, 1000)
  });
  $($allLis[3]).on("click", function () {
    $("html,body").animate({ scrollTop: $("#xb_footer").offset().top }, 1000)
  });
  $($allLis[4]).on("click", function () {
    $("html,body").animate({ scrollTop: $("#xb_footer").offset().top }, 1000)
  });
  $($allLis[5]).on("click", function () {
    $("html,body").animate({ scrollTop: $("#xb_footer").offset().top }, 1000)
  });
  
  // 开启cookie，定义方法
  function setCookie(key, value) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + 10);
    document.cookie = key + '=' + value + ';expires=' + oDate;

  }
  function removeCookie(key) {
    setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
  }
  function getCookie(key) {
    var cookieArr = document.cookie.split('; ');
    for (var i = 0; i < cookieArr.length; i++) {
      var arr = cookieArr[i].split('=');
      if (arr[0] === key) {
        return arr[1];
      }
    }
    return false;
  }
  // 注册处理
  $('#reg_true').on("click", function () {
    if(getCookie('uname')===$("#uname").val()){
      alert("该用户已经注册了")
      return;
    }
    setCookie('uname', $("#uname").val())
    setCookie('upwd', $("#upwd").val())
    $('#xb_reg').modal('hide')
    alert("注册成功")
    $("#login_btn").html(getCookie('uname'))
    $("#login_btn").attr("disabled",true)
    $("#login_btn").css("pointer-events","none"); 
  })
  
  //登录处理
  $("#login_true").on("click", function () {
    if($("#uname_login").val()===$("#uname").val()){
      alert("该用户已经登陆了")
    }else{
      setCookie('uname', $("#uname_login").val())
      setCookie('upwd', $("#upwd_login").val())
      alert("登录成功")
      $('#xb_login').modal('hide')
    }
  })
})