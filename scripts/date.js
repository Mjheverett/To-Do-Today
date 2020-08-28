document.addEventListener('DOMContentLoaded', (event) => {
    
    function displayDate(){
        const currentDay = new Date();
          let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          let day = days[currentDay.getDay()];
        const currentDate = new Date();
          let year = currentDate.getFullYear();
          let date = currentDate.getDate();
          let months =      ["January","February","March","April","May","June","July","August","September","October","November","December"];
          let month = months[currentDate.getMonth()];
          
          // Use for Month inAPI
          console.log(currentDate.getMonth());
          
          if (date<10){
              date = "0" + date;
          }
        
        const dateToday = document.getElementById('date');
        dateToday.innerHTML = (day +" "+ month +" "+ date +", "+ year);
        // Use for Date and Year in API
        console.log(date);
        console.log(year);
    }
    displayDate();
 });