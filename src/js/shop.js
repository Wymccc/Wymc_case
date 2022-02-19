$(function () {
    let shop = cookie.get('shop');

    shop = JSON.parse(shop);

    let idList = shop.map(el => el.id).join();

    $.ajax({
        url: '../interface/shop.php',
        data: { idList },
        type: 'get',
        dataType: 'json'
    }).then(res => {

        // 商品数量
        // $('.btn_switch_cart>a>em').html(`购物车（全部`+res.length+`）`);

        // 修改商品内容
        let template = '';
        res.forEach(el => {
            let picture = JSON.parse(el.picture);

            let current = shop.filter(elm => elm.id == el.id);


            template += ` <div id="OrderList">
             <div class="J_ItemHead">
                 <div class="shop-info">
                     <div class="cart-checkbox">
                         <input type="checkbox" class="j-checkbox1">
                     </div>
                     &nbsp;
                     <svg class="icon" aria-hidden="true">
                         <use xlink:href="#icon-tianmao-"></use>
                     </svg>
                     店铺：
                     <a href="javascript:;" title="美特斯邦威官方网" class="J_MakePoint">美特斯邦威官方网</a>
                     <span class="ww-light">
                         <a href="javascript:;" target="_blank" class="ww-inline"
                             title="点此可以直接和卖家交流选好的宝贝，或相互交流网购体验，还支持语音视频噢。">
                             <!-- <span>旺旺在线</span> -->
                         </a>
                     </span>
                 </div>
             </div>
             <div class="order-content">
                 <div class="wp">
                     <div class="td td-chk">
                         <input type="checkbox" class="j-checkbox">
                     </div>
                     <div class="td td-item">
                         <div class="td-inner">
                             <div class="item-pic">
                                 <a href="javascript:;">
                                     <img src="${picture[0].src}" alt="">
                                 </a>
                             </div>
                             <div class="item-info">
                                 <div class="item-basic-info">
                                     <a href="javascript:;" class="item-title">
                                         ${el.title}
                                     </a>
                                 </div>
                                 <div class="item-other-info">
                                     <div class="promo-logos"></div>
                                     <div class="margin_icon_bottom">
                                         <a href="">
                                             <img src="../img/shop-8.png" alt="">
                                         </a>
                                         <a href="">
                                             <img src="../img/shop-6.png" alt="">
                                         </a>
                                         <a href="">
                                             <img src="../img/shop-7.png" alt="">
                                         </a>
                                     </div>
                                     <div class="promo-logos"></div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div class="td td-info" style="min-height: 100px;">
                         <div class="item-props item-props-can">
                             <p class="sku-line">颜色：黑色组</p>
                             <p class="sku-line">尺码：175/L[适合175-185身高]</p>
                             <span class="btn-edit-sku">修改</span>
                         </div>
                     </div>
                     <div class="td td-price">
                         <div class="td-inner" style="padding-top: 12px;">
                             <div class="price-content">
                                 <div class="price-line">
                                     <em class="price-original">￥599.00</em>
                                 </div>
                                 <div class="price-line child">
                                     <em class="J_Price price-now">￥${parseFloat(el.price).toFixed(2)}</em>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div class="td td-amount">
                         <div class="td-inner">
                             <div class="item-amount">
                                 <a href="javascript:;" class="J_Minus no-minus">-</a>
                                 <input type="text" value="${current[0].num}" class="text text-amount" max="100" min="1">
                                 <a href="javascript:;" class="J_Plus plus">+</a>
                             </div>
                             <div class="amount-msg J_AmountMsg"></div>
                         </div>
                     </div>
                     <div class="td td-sum">
                         <div class="td-inner" style="padding-top: 16px;">
                             <em tabindex="0" class="J_ItemSum number">￥${(el.price * current[0].num).toFixed(2)}</em>
                             <div class="J_ItemLottery"></div>
                         </div>
                     </div>
                     <div class="td td-op">
                         <div class="td-inner" style="padding-top:17px">
                             <a href="javascript:;">移入收藏夹</a>
                             <a href="javascript:;" class="shanchu" data-id="${el.id}">删除</a>
                             <div class="xsbb_hover">
                                 <a href="javascript:;" class="xsbb">相似宝贝</a>
                                 <i class="iconfont icon-iconfonti2-copy-copy-copy-copy"></i>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>`

        });

        $('.shangp').html(template);

        //删除商品
        $('.shanchu').on('click', function () {
            let result = shop.filter(el => el.id != $(this).attr('data-id'));

            //出现bug  删多个商品时，cookie只能删一个
            cookie.set('shop', JSON.stringify(result));
            // location.reload();
            $(this).parents("#OrderList").remove();
            getSum();
        });

        //全选选项框
        $(".checkall").change(function () {
            $(".j-checkbox,.j-checkbox1,.checkall").prop("checked", $(this).prop("checked"));
            if ($(".checkall").prop("checked")) {
                getSum()
            } else {
                loseSum()
            }
        });
        //商品选项框
        $(".j-checkbox").change(function () {
            // console.log();
            if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
                $(".checkall").prop("checked", true);

            } else {
                $(".checkall").prop("checked", false);
            }
            getSum();
        });

        // 店铺名 选项框
        $(".j-checkbox1").change(function () {
            // console.log();
            if ($(".j-checkbox1:checked").length == $(".j-checkbox").length) {
                $(".checkall").prop("checked", true);

            } else {
                $(".checkall").prop("checked", false);
            }
            getSum();

        });

        // 点击加减号改变商品数量
        $(".J_Plus").click(function () {
            let index = $(this).parents("#OrderList").index();
            // console.log(res[index]);
            var num = ++shop[index].num;
            cookie.set("shop", JSON.stringify(shop));
            $(this).siblings(".text-amount").val(num);
            $(this).parents(".td-amount").siblings(".td-sum").children().children(".J_ItemSum").html("￥" + (res[index].price * shop[index].num).toFixed(2));
            getSum();

        });

        $(".J_Minus").click(function () {
            let index = $(this).parents("#OrderList").index();
            if (shop[index].num > 1) {
                var num = --shop[index].num;
                cookie.set("shop", JSON.stringify(shop));
                $(this).siblings(".text-amount").val(num);
            }
            // console.log(res[index].price);
            $(this).parents(".td-amount").siblings(".td-sum").children().children(".J_ItemSum").html("￥" + (res[index].price * shop[index].num).toFixed(2));
            getSum();
        });

        // 修改文本框的值  改变总价
        // getSum();
        $(".text-amount").change(function () {
            let index = $(this).parents("#OrderList").index();
            var n = $(this).val();
            shop[index].num = n;
            cookie.set("shop", JSON.stringify(shop));
            var p = $(this).parents(".td-amount").siblings(".td-price").children().children().children(".child").children().html();
            var p = p.substr(1);
            $(this).parents(".td-amount").siblings(".td-sum").children().children(".J_ItemSum").html("￥" + (p * shop[index].num).toFixed(2));
            getSum();
        })

        //计算总数量和总金额
        function getSum() {
            var count = 0;  //总件数    
            var money = 0;  //总价
            $(".text-amount").each(function (i, ele) {
                if ($(".j-checkbox").eq(i).prop("checked")) {
                    count += parseInt($(ele).val());
                }
            });
            $("#J_SelectedItemsCount").text(count);
            $('.btn_switch_cart>a>em').html(`购物车（全部` + count + `）`);

            $(".J_ItemSum").each(function (i, ele) {
                if ($(".j-checkbox").eq(i).prop("checked")) {
                    money += parseFloat($(ele).text().substr(1));
                };

            });
            $(".price>em").text("￥" + money.toFixed(2));
            if (count) {
                $(".cart_sum>a").addClass("active");
                $(".float-bar-right>a").addClass("active");
            } else {
                $(".cart_sum>a").removeClass("active");
                $(".float-bar-right>a").removeClass("active");
            }

        };
        function loseSum() {
            var count = 0;  //总件数    
            var money = 0;  //总价
            $(".text-amount").each(function (i, ele) {
                count = 0;
            });
            $("#J_SelectedItemsCount").text(count);
            $('.btn_switch_cart>a>em').html(`购物车（全部` + count + `）`);

            $(".J_ItemSum").each(function (i, ele) {
                money = 0;
            });
            $(".price>em").text("￥" + money.toFixed(2));
            if (count) {
                $(".cart_sum>a").addClass("active");
                $(".float-bar-right>a").addClass("active");
            } else {
                $(".cart_sum>a").removeClass("active");
                $(".float-bar-right>a").removeClass("active");
            };
        }


    }).catch(xhr => {
        console.log(xhr.status);
    })
});