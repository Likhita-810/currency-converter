
const base_url = "https://api.frankfurter.app/latest";

// for (code in countryList) {
//     console.log(code, countryList[code]); //currency code and country code
// }

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".form button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");

for(let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==='from' && currCode ==="USD") {
            newOption.selected = "selected";
        } else if(select.name ==='to' && currCode ==="INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    })
}

const updateFlag = (ele) => {
    let currCode = ele.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    console.log(fromCurr.value, toCurr.value);
    const url = `${base_url}?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
    // https://api.frankfurter.app/latest?amount=1&from=USD&to=EUR

    try {
            let response = await fetch(url);
            console.log(response);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
                // console.log("error");
            }

            let data = await response.json();
            console.log(data);
            let finalAmt = data.rates[toCurr.value];
            console.log(finalAmt);

            msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
        }
        catch(error) {
            msg.innerText = "Error fetching conversion data. Please try again later."
    }
})

