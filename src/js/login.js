window.onload = function(){
    let text = document.getElementsByClassName('fm-text');
    let icon = document.getElementsByClassName('dianji'); 
    let container = document.querySelector('.container');
    let container1 = document.querySelector('.container1');
    



        icon[0].onclick = function () {
                container.style.display = 'none';
                container1.style.display = 'block';
            }
        icon[1].onclick = function(){
                container.style.display = 'block';
                container1.style.display = 'none';
        }


    text[0].onfocus = function(){
        if(this.placeholder === '会员名/邮箱/手机号'){
            this.placeholder = '会员名/邮箱/手机号';
        }
        this.style.borderColor = '#ff0036';
    }
    text[0].onblur = function(){
        if(this.value === ''){
            this.placeholder = '会员名/邮箱/手机号';
        }
        this.style.borderColor = '#f1eeee';

    }
    text[1].onfocus = function(){
        if(this.placeholder === '请输入登录密码'){
            this.placeholder = '请输入登录密码';
        }
        this.style.borderColor = '#ff0036';
    }
    text[1].onblur = function(){
        if(this.value === ''){
            this.placeholder = '请输入登录密码';
        }
        this.style.borderColor = '#f1eeee';

    }
}