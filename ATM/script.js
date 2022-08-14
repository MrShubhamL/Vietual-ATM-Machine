// Initial balance

let availableBalance = Number(localStorage.getItem("balance"))

function numButton(value){
    audio.play();
    let amount = Number(value);
    document.getElementById("enteredAmount").innerHTML += amount;
    document.getElementById("amountValue").value += amount;
    console.log(amount);
}

function clean(value){
    document.getElementById("enteredAmount").innerHTML = "";
    document.getElementById("amountValue").value = null;
}

function entered(){
    pleaseWait.play();
    let inputAmount =  Number(document.getElementById("amountValue").value);
    if(inputAmount == null || inputAmount == ""){
        alert("Please enter the amount!")
    }
    else{
        
        if(inputAmount>availableBalance){
            document.getElementById("enteredAmount").innerHTML = "";
            document.getElementById("amountValue").value = 0;
            Swal.fire({
                icon: 'error',
                title: 'Insufficent Balance',
                text: 'Please check your account balance.',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
              }).then((result) => {
                location.replace("http://127.0.0.1:5500/index.html"); 
              })
        }
        else{
            availableBalance = availableBalance - inputAmount;
            localStorage.setItem("balance",availableBalance);
            document.getElementById("withdrawDisplay").style = "display:none"
            setTimeout(() => { 
                successfulSound.play();
                Swal.fire({
                  icon: 'success',
                  title: 'Successful',
                  text: 'Please Collect Your Cash.',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Home'
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        location.replace("http://127.0.0.1:5500/index.html"); 
                    } 
                    else{
                        document.getElementById("withdrawDisplay").style = "display:block"
                        document.getElementById("messageInfo2").style = "display:none";
                        document.getElementById("enteredAmount").innerHTML = "";
                        document.getElementById("amountValue").value = 0;
                    }
                  })
            
            
            }, 5000);
            document.getElementById("messageInfo").style = "display:block";
            
        }



    }
}


function addDeposit(){
    document.getElementById("depositDisplay").style = "display:none"
    let depositedAmount = Number(document.getElementById("amountValue").value);

    availableBalance = availableBalance + depositedAmount;
    localStorage.setItem("balance",availableBalance)

    setTimeout(() => { 
        // 
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Amount Deposited Successfully',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Home'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                location.replace("http://127.0.0.1:5500/index.html"); 
            } 
            else{
                document.getElementById("depositDisplay").style = "display:block"
                document.getElementById("messageInfo2").style = "display:none";
                document.getElementById("enteredAmount").innerHTML = "";
                document.getElementById("amountValue").value = 0;
            }
          })
    
    
    }, 3000);
    document.getElementById("messageInfo").style = "display:block";
}


const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
const pleaseWait = new Audio("https://nf1f8200-a.akamaihd.net/downloads/ringtones/files/mp3/atm-2249.mp3");
const successfulSound = new Audio("successful.wav");
