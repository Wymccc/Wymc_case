$(function(){
    let id = location.search.split('=')[1];
    // console.log(id);

    $.ajax({
        url:'../interface/getitem.php',
        data:{ id },
        type:'get',
        dataType:'json'
    }).then(res=>{
        let pic = JSON.parse(res.picture);
        $(`.tb-detail-hd>h1>a`).html(res.title);
        $(`.tm-price`).html(res.price);
        $(`#J_ImgBooth`).attr("src",pic[0].src);
        $(`.img-ks-lazyload`).attr("src",res.details.slice(10,-2));
        $(`.mui-amount-input`).attr("max",res.num);
        
        var im = $(`#J_UlThumb>li>a>img`);
         for(var i =0;i<pic.length;i++){
            im.eq(i).attr("src",pic[i].src);
        }
        //点击购物车添加商品事件
        $('.tb-btn-basket').on('click',function(){
            addItem(res.id,$('.mui-amount-input').val());
        });


    }).catch(xhr=>{
        
    });
});
//向cookie中添加一项内容
//cookie存储的是 键值对 数据类型是字符串

//在cookie中存储JSON字符串 是最好的方式
// shop=[{"id":"100001","num":3},{"id":"100002","num":1}]
function addItem(id,num){
    let product1 = { id, num };

    let shop = cookie.get('shop'); //从cookie中读取shop

    //判断当前购物车是否有数据
    if(shop){
        // 购物车中有数据
        shop = JSON.parse(shop);

        // 判断当前商品在购物车中是否存在 如果存在则修改数量 不存在则添加
        if(shop.some(el => el.id == id)){
        //判断出商品存在 需要修改这个商品id对应的num数据
            let index = shop.findIndex(elm=>elm.id == id);//找到当前商品的索引
            let count = parseInt(shop[index].num);//当前该商品的数量
            count += parseInt(num); 
            shop[index].num = count;

        }else{
            shop.push(product1);
        }

    }else{
        shop = [];
        shop.push(product1);

    }
    cookie.set('shop', JSON.stringify(shop))
}