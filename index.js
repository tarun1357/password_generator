const pwd_length = document.querySelector("[get_len]");
const slider = document.querySelector("[data_len_slider]");
const addmsg = document.querySelector("[data_copyMsg]");
const ucase = document.querySelector("#uppercase");
const lcase = document.querySelector("#lowercase");
const num = document.querySelector("#numbers");
const sp_char = document.querySelector("#special_char");
const display = document.querySelector("[pwd_display]");
const strength_color = document.querySelector(".str_color");
const gen_button = document.querySelector("[gen_password]");
const allcheckbox = document.querySelectorAll("input[type=checkbox]")
const special_chars = "!@#$%^&*()_+{}:<>?}{[];'}";
const l_case = "abcdefghijklmnopqrstuvwxyz";
const u_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const copybutton = document.querySelector(".copy_btn");

let len_value = 10;
let password = "";
let checkcount = 0;

function setpwdlen(){
    pwd_length.textContent = len_value;
    slider.value = len_value;
}

setpwdlen();

function getrandINT(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getrandnum(){
    return getrandINT(0,9);
}

function getrandschar(){
    return special_chars.charAt(getrandINT(0,24));
}

function getrandlcase(){
    return l_case.charAt(getrandINT(0,25));
    // return String.fromCharCode(getrandINT(97,123));
}

function getranducase(){
    return u_case.charAt(getrandINT(0,25));
    // return String.fromCharCode(getrandINT(65,92));
}

slider.addEventListener('input', (event) =>{
    len_value = event.target.value;
    setpwdlen();
})

function setcolor(color){
    strength_color.style.backgroundColor = color;
}

function findstrength(){
    let ucheck = false;
    let lcheck = false;
    let ncheck = false;
    let spcharcheck = false;

    if(ucase.checked) ucheck = true;
    if(lcase.checked) lcheck = true;
    if(sp_char.checked) spcharcheck = true;
    if(num.checked) ncheck = true;

    // if(ucheck && lcheck && (ncheck || spcharcheck) && len_value >= 8) setcolor("#00FF00");
    // else if((ucheck || lcheck) && (ncheck || spcharcheck) && len_value >= 6) setcolor("#FF0000");
    // else setcolor("#808080");

    if(ucheck && lcheck && (ncheck || spcharcheck) && len_value >= 8) setcolor("#00FF00");
    else if((ucheck || lcheck) && (ncheck || spcharcheck) && len_value >= 6) setcolor("yellow");
    else setcolor("red");

}

function handlechange(){
    checkcount = 0;
    allcheckbox.forEach((checkbox) => {
      if(checkbox.checked) checkcount++;
    })
    if(len_value < checkcount){
        len_value = checkcount;
        setpwdlen();
    }
}

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handlechange);
})


async function copy_cntn(){
    try{
        await navigator.clipboard.writeText(display.value);
        addmsg.textContent = "Copied!";
    }
    catch(e){
        addmsg.textContent = "Failed!";
    }

    addmsg.classList.add("active");

    setTimeout(() => {
        addmsg.classList.remove("active");
    }, 2000);

    console.log(addmsg.textContent);
}


copybutton.addEventListener('click',() => {
    if(password.length > 0) copy_cntn();
});

function shufflepassword(array){
    //Fisher Yates shuffle Algorithm.
    for(let i = array.length-1 ;i>=0;i--){
        let j = Math.floor(Math.random()*(i+1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";

    array.forEach((el) => str += el);
    return str;
}

function generatepwd(){
    if(checkcount <= 0) return;
    password = "";
    let arr = [];
    
    if(ucase.checked) arr.push(getranducase);
    if(lcase.checked) arr.push(getrandlcase);
    if(sp_char.checked) arr.push(getrandschar);
    if(num.checked) arr.push(getrandnum);

    for(let i = 0;i<arr.length; i++){
        password += arr[i]();
    }
    
    for(let i = 0;i<len_value-arr.length;i++){
        let randint = getrandINT(0,arr.length-1);
        password += arr[randint]();
    }
    password = shufflepassword(Array.from(password));
    display.value = password;

    findstrength();
}


gen_button.addEventListener('click',generatepwd);