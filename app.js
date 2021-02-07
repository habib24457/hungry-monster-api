    const searchMealByName = urlInput =>{
        fetch(urlInput)
        .then(resp => resp.json())
        .then(data=>displayMeal(data))
        .catch((error) => {
            alert("invalid input");
            console.log(error)
          });   
    }

        //displaying data
        const displayMeal = mealsData =>{
        console.log(mealsData);
        const mealDiv = document.getElementById('meal-div');
        const mealValue = mealsData.meals;
        if(mealValue === '' ||mealValue === null ||mealValue ===undefined){
            alert("nothing to show");
        }else{      

        for(let i=0; i<mealValue.length;i++){
           const eachMeal = document.createElement('div');//creating a div for each meal
           const meal = mealsData.meals[i];
           console.log(meal);  //matched meals       

            const mealInfo = `
            <img src = "${meal.strMealThumb}" onclick="displayDetailsMeal('${meal.idMeal}')">          
            <h5>${meal.strMeal}</h5>
            `
            eachMeal.innerHTML = mealInfo;
            eachMeal.className='mealCSS';

            mealDiv.appendChild(eachMeal);
       
        }
       }   
   }

   const displayDetailsMeal = (mealID) =>{
    console.log(mealID);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`; 
    fetch(url)
    .then(res => res.json())
    .then(data =>renderMealInfo(data.meals[0])); 
   }

   const renderMealInfo = clickedMeal =>{
    const namePhoto = document.getElementById('namePhoto');
    const infoList = document.getElementById('info-list');

    const ingredient1 = clickedMeal.strIngredient1;
    const ingredient2 = clickedMeal.strIngredient2;
    const ingredient3 = clickedMeal.strIngredient3;
    const ingredient4 = clickedMeal.strIngredient4;
    const ingredient5 = clickedMeal.strIngredient5;
    const ingredient6= clickedMeal.strIngredient6;
   

   
    const oneMealInfo = `
    <h3>${clickedMeal.strMeal}</h3>
    <img src="${clickedMeal.strMealThumb}"> 
    `  
    const ingredients = `
    <h5> Ingredients:</h5> 
    <li>${ingredient1}</li>
    <li>${ingredient2}</li>
    <li>${ingredient3}</li>
    <li>${ingredient4}</li>
    <li>${ingredient5}</li>
    <li>${ingredient6}</li>
    
    ` 
    infoList.innerHTML = ingredients;
    namePhoto.innerHTML = oneMealInfo;
    console.log(ingredient1,ingredient2,ingredient3);
   }


    function gettingInput(){
    const key = document.getElementById("inputMealName").value; 
    if(key===''){
        alert("Input can't be empty");
    }else if(key.length==1){ 
        setDivToEmpty();
        const urlForAlphabet = `https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`;
        searchMealByName(urlForAlphabet); 
    }else{
        setDivToEmpty();
        const urlForName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`;      
        searchMealByName(urlForName);    
    }   
    }

    function setDivToEmpty(){
        const mealSection = document.getElementById("meal-div"); 
        const infoSection = document.getElementById("namePhoto");
        const infoSectionList = document.getElementById("info-list");
        mealSection.innerHTML =''; 
        infoSection.innerHTML='';
        infoSectionList.innerHTML='';
    }