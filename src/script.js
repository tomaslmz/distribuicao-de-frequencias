var isMessageUp = false

function showMessage() {
    if(!isMessageUp) {
        document.getElementById('message').style.display = 'block';
        isMessageUp = true;
    } else {
        document.getElementById('message').style.display = 'none';
        isMessageUp = false
    }
}

function getNumbers() {
    const elements = document.querySelectorAll('.script');

    elements.forEach((element) => element.remove());

    document.getElementById('error_message').innerHTML = '';

    try {
        const numbersStringList = document.getElementById('rol').value.split(" ");
        const numbers = [];

        for(let numberString of numbersStringList) {
            if(isNaN(parseInt(numberString))) {
                throw new Error('O rol só pode conter números!');
            }

            if(numberString.indexOf(',') !== '-1' || numberString.indexOf('.') !== '-1') {
                numberString = numberString.replaceAll(',', '.');
                numbers.push(parseFloat(numberString));
            } else {
                numbers.push(parseInt(numberString));
            }
        }

        for(let i = 0; i<numbers.length; i++) {
            for(let j = i+1; j<numbers.length; j++) {
                if(numbers[i] > numbers[j]) {
                    throw new Error('Os números devem estar em ordem crescente!');
                }
            }
        }
        
        const list = numbers.filter((index, i) => {
            return numbers.indexOf(index) === i
        });
        
        const count = [];
        
        for(let i = 0; i<list.length; i++) {
            count[i] = 0;
            for(let j = 0; j<numbers.length; j++) {
                if(list[i] === numbers[j]) {
                    count[i]++;
                }
            }
        }

        let html = '';
        let prev1 = 0;
        let prev2 = 0;
        let total1 = 0;
        let total2 = 0;
        for(let i = 0; i<list.length; i++) {
            html+=`<tr class='script number'><td>${list[i]}</td>`;
            html+=`<td class='script number'>${count[i]}</td>`;
            html+=`<td class='script number'>${count[i]+prev1}</td>`;
            html+=`<td class='script number'>${(count[i]/numbers.length*100).toFixed(2)}</td>`;
            html+=`<td class='script number'>${(count[i]/numbers.length*100+parseFloat(prev2)).toFixed(2)}</td></tr>`;
            prev1 = count[i]+prev1;
            prev2 = (count[i]/numbers.length*100)+prev2;
            total1 = count[i]+total1;
            total2 = (count[i]/numbers.length*100+parseFloat(total2)).toFixed(2);
        }

        html+=`<td class='script'>Total</td><td class='script'>${total1}</td><td class='script'>#</td><td class='script'>${total2}</td><td class='script'>#</td>`
        document.querySelector('.rol_section').style.display = "block";
        document.getElementById('rol_text').innerHTML = numbersStringList.join(", ");
        document.querySelector('tbody').insertAdjacentHTML("afterBegin", html);
        console.log(numbers);
        console.log(list);
        console.log(count);
    } catch(e) {
        document.getElementById('error_message').innerHTML = e;
    }

    
}