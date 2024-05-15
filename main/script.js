let navbar = document.querySelector('.header .navbar');
let menu = document.querySelector('#menu');

menu.onclick = () =>{
    menu.clickList.toggle('fa-times');
    navbar.classList.toggle('active');
};


window.onscroll = () =>{
    menu.clickList.remove('fa-times');
    navbar.classList.remove('active');
}

$(document).ready(function(){
    $('.buttons').click(function(){
        $(this).addClass('active').siblings().removeClass('active');

        var filter = $(this).attr('data-filter')
        if(filter =='all'){
           $('diet .box').show(400); 
        }
        else{
            $('.diet .box').not('.'+filter).hide(200);
            $('.diet .box').filter('.'+filter).show(400);
        }
});

});

var swiper = new Swiper('.review-slider',{
    loop:true,
    grabCursor:true,
    spaceBetween:20,
    breakpoints:{
        0:{
            slidesPerView: 1,
        },
        640:{
            slidesPerView: 2,
        },
        768:{
            slidesPerView: 3,
        },
    },
});
document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.querySelector('.diet .content .btn');
    
    calculateButton.addEventListener('click', function() {
        // Get the user input values for age, gender, weight, height, and activity level
        const age = parseInt(prompt("Enter your age (in years):"));
        const gender = prompt("Enter your gender (male/female):").toLowerCase();
        const weight = parseFloat(prompt("Enter your weight (in kg):"));
        const height = parseFloat(prompt("Enter your height (in cm):"));
        const activityLevel = parseFloat(prompt("Enter your activity level (sedentary=1.2, lightly active=1.375, moderately active=1.55, very active=1.725, extra active=1.9):"));
        
        // Perform the calorie calculation based on the Harris-Benedict Equation
        let calorieIntake;
        if (gender === 'male') {
            calorieIntake = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === 'female') {
            calorieIntake = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        } else {
            alert("Invalid gender input. Please enter 'male' or 'female'.");
            return;
        }

        // Adjust calorie intake based on activity level
        calorieIntake *= activityLevel;

        // Display the calculated calorie intake
        alert("Your estimated daily calorie intake is: " + calorieIntake.toFixed(2) + " calories.");
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".controls .buttons");
    const mealBoxes = document.querySelectorAll(".image-container .box");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const filter = this.getAttribute("data-filter");

            buttons.forEach(button => {
                button.classList.remove("active");
            });
            this.classList.add("active");

            mealBoxes.forEach(box => {
                if (filter === "all" || box.classList.contains(filter)) {
                    box.style.display = "block";
                } else {
                    box.style.display = "none";
                }
            });
        });
    });
});