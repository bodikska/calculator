let result = '';
let AllButton = document.querySelectorAll('.btn');
let contentResult = document.querySelector('.result-screen');
let nowRes = '';


AllButton.forEach(function(element){
    element.addEventListener('click', calcAll)
})
function calcAll() {
    let blockTareg = event.target;
     if (blockTareg.textContent == 'X') { 
        if (nowRes == '' && result == '') return;
        if (result[result.length-1]=='*' && nowRes == '') return;
        nowRes += '*';
        result += nowRes;
        nowRes = '';
    } else if (blockTareg.textContent == 'ac') {
        result = '';
        nowRes = '';
        contentResult.innerHTML = '0';
    } else if (blockTareg.textContent == '-' || blockTareg.textContent == '+')  {
        if (nowRes == '' && result == '') return;
        if (result[result.length-1]=='-' && nowRes == '' || result[result.length-1]=='+' && nowRes == '') return;
        nowRes += blockTareg.textContent;
        result += nowRes;
        nowRes = '';
    }else if (blockTareg.textContent == '=') { 
        if (nowRes == '' && result == '') return;
       result += nowRes;
       contentResult.textContent = eval(result);
       result = String(eval(result));
       nowRes = '';
    } else if (blockTareg.textContent == '+/-') {
        if (nowRes == '' && result == '') return;
        if (nowRes[0]=='-') return;

        let newArr = nowRes.split('');
        newArr.unshift('-');
        newArr = newArr.join('');
        nowRes = newArr;
        contentResult.textContent = nowRes;
    } else if (blockTareg.textContent == '%') {
        if (nowRes == '' && result == '') return;
        if (result == '') {
            nowRes = String((eval(nowRes))/100);
            contentResult.textContent = nowRes;
        } else {
            let newArr = result.split('');
            let newArrRes = [];
            // находим индексы 
        for (let i = newArr.length-2; i >=0;i--) {
            if (isNaN(+newArr[i]) && newArr[i]!='.') {
                return;
            } else {
                newArrRes.unshift(newArr[i])
            }
        } 
        newArrRes = newArrRes.join('');
        nowRes = String(eval((newArrRes*nowRes)/100));
        contentResult.textContent = nowRes;
        }
    } else if(blockTareg.textContent == '/') { 
        if (nowRes == '' && result == '') return; 
        if (result[result.length-1]=='/' && nowRes == '') return;
        nowRes += '/';
        result += nowRes;
        nowRes = '';
    } else if(blockTareg.textContent == '.') {
        if (nowRes == '' && result == '') return; 
        if (nowRes[0] == '0' && nowRes.length>1) return; 
        nowRes += '.';
        contentResult.textContent = nowRes;
    } else {
        if ( result.length>0) {
            let arr = result.split('');            
            let resBul = arr.every(item => {
                if (isNaN(+item)==false){
                     return true;
                } 
            })
            if (resBul) {
                result = '';
                nowRes = '';
                nowRes+= blockTareg.textContent;
                contentResult.textContent = nowRes;
            } else {
                nowRes+= blockTareg.textContent;
                contentResult.textContent = nowRes;
            }
           
        } else {
            nowRes+= blockTareg.textContent;
            contentResult.textContent = nowRes;
        }
      
       
    }
}