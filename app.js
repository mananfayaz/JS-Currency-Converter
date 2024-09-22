const BASE_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const btn=document.querySelector("form button");
const dropdowns=document.querySelectorAll(".dropdown select");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


// for(code in countryList){
//     console.log(code,countryList[code]);
// }


for(let select of dropdowns){
    for(currcode in countryList){
        let newOption =document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
       
        if(select.name==="from" && currcode === "USD")
        {
            newOption.selected="selected";
        }
        else if(select.name==="to" && currcode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
        }
select.addEventListener("change",(evt)=>
{
    updateFlag(evt.target);    // pass the value that is clicked to updateflag
})
}

const updateFlag =(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img");   // go into seleects parent node and select img tag to chage it
    img.src= newSrc;

}


btn.addEventListener("click", async (evt)=>{
     evt.preventDefault();
     let amount= document.querySelector(".amount input");  //access input
     let amtVal=amount.value;
     if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
     }

     //console.log(fromCurr.value,toCurr.value);
     const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
     console.log(URL);
     let response= await fetch(URL);
     let data =await response.json();
     let rate=data[toCurr.value.toLowerCase()];
     console.log(data);

     let finalAmount= amtVal * rate;
     msg.innerText= `${amtVal} ${fromCurr.value}= ${finalAmount}${toCurr.value}`;

})  