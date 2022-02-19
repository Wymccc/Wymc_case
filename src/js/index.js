
      //轮播图
      $(function () {
        $('.slider').slider({
            speed: 500, // 动画速度
            delay: 3000 // 间隔时间
        });
    });
    $(function () {
        $('.slider_1').slider({
            speed: 500, // 动画速度
            delay: 3000 // 间隔时间
        });
    });

    $(function(){
        $.ajax({
            url:'../interface/getitems.php',
            type:'get',
            dataType:'json'
        }).then(res=>{
            let template = '';
            res.forEach(elm=>{
                let pic = JSON.parse(elm.picture);
                // console.log(pic);
            template += `<div class="tmcsContentItem rax-view-v2">
                            <a href="./item.html?id=${elm.id}">
                            <img src="${pic[0].src}" alt="">
                            <div class="mask"></div>
                            <div class="tmcsName">${elm.title}</div>
                            <span class="tmcsPrice">￥${elm.price}</span>
                            </a>
                        </div>`
            })
            $('.tmcsContent').html(template);



            // var tmc =  $(`.tmcsContentItem>a>.tmcsName`);
            // var im = $(`.tmcsContentItem>a>img`);
            // var a = $(`.tmcsContentItem>a`);

            // for(var i =0;i<res.length;i++){
            //     var pic = JSON.parse(res[i].picture);
            //     tmc.eq(i).html(res[i].title);
            //     im.eq(i).attr("src",${pic[0].src});
            //     a.eq(i).attr("href",`./item.html?id=${res[i].id}`);
            // }

        }).catch(xhr=>{
           
        });
    });
  