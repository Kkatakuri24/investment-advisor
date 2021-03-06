calculate = () => {
    let bp = +document.getElementById("buyPrice").value;
    let sp = +document.getElementById("sellPrice").value;
    let ns = +document.getElementById("numShares").value;
    let bc = +document.getElementById("buyCom").value;
    let sc = +document.getElementById("sellCom").value;
    let com = (bc + sc);
    let profit = (((sp * ns) - (bp * ns)) - com);
    let roi = ((profit/((bp*ns)+bc)) * 100);
    document.getElementById("profit").innerHTML = "Total Profit: $" + profit;
    document.getElementById("ROI").innerHTML = "Return on investment: " + roi.toFixed(2) + "%";
}

reset = () => {
    document.getElementById("buyPrice").value = "";
    document.getElementById("sellPrice").value = "";
    document.getElementById("numShares").value = "";
    document.getElementById("buyCom").value = "";
    document.getElementById("sellCom").value = "";
    document.getElementById("profit").value = "";
    document.getElementById("ROI").value = "";
    document.getElementById("profit").innerHTML = "Total Profit: ";
    document.getElementById("ROI").innerHTML = "Return on investment: ";
}


checkSymbol = () => {
    var url = "http://localhost:8080";
    var params = document.getElementById("ticker").value;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var myData = JSON.parse(this.responseText);
            displayData(myData);
            displayChart(myData);
        }
    };
    xhttp.open("GET", url + "?" + params, true);
    xhttp.send();
    return xhttp;
}


displayChart = (myData) =>{

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Buy', 'Sell', 'Hold'],
        datasets: [{
            label: '# of professional analysis',
            data: [myData.Buy, myData.Sell, myData.Hold],
            backgroundColor: [
                'rgba(22, 240, 145, 0.8)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                
            ],
            borderColor: [
                'rgba(22, 240, 145, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

displayData = (myData) => {
    var display = "";
    display = display + "Long Business Summary: " + '<br>' + '<br>' + myData.lbs + '<br>' + '<br>';
    display = display + "Current Price: $" + myData.currentPrice + '<br>' + '<br>';
    display = display + "Market Cap: $" + myData.marketCap + '<br>' + '<br>';
    display = display + "Website: " + '<a href="' + myData.site + '" target="_blank"'+'>' + myData.site + '</a><br>' + '<br>';
    display = display + "Shares Outstanding: " + myData.os + '<br>' + '<br>';
    display = display + "Float Shares: " + myData.floatS + '<br>' + '<br>';
    display = display + "FiftyTwoWeekHigh: $" + myData.fftHigh + '<br>'+ '<br>';
    display = display + "FiftyTwoWeekLwo: $" + myData.fftLow+ '<br>' + '<br>';
    display = display + "<div class='chart-container' style='position: relative; height:500px; width:500px'><canvas id='myChart'></canvas></div>"
    document.getElementById("displayData").innerHTML = display;
}


resetSymbol = () => {
    document.getElementById("ticker").value = "";
    document.getElementById("displayData").innerHTML = "";
}

darkmodeFunc = () => {
    var element = document.body;
    var elementTwo = document.getElementsByClassName("coolTheme");
    var navBarColor = document.querySelector(".navBar");
    element.classList.toggle("dark-mode");
    for(var i = 0; i < elementTwo.length; i++){
        elementTwo[i].classList.toggle("dark-modeTwo");
    }
    navBarColor.classList.toggle("dark-mode");
}

// js for stickied navbar
window.onscroll = function() {stickyNav()};

stickyNav = () => {
    var nav = document.querySelector(".navBar");
    var sticky = nav.offsetTop;  
    if(window.pageYOffset >= sticky){
        nav.classList.add("sticky");
    } else{
        nav.classList.remove("sticky");
    }
}

