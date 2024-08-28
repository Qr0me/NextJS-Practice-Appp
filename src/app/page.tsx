"use client"; // Ensures this is a Client Component

import React, { useState } from 'react';

interface FoodItem{
  name: string,
  qty: number
}

export default function Home() {

  // State to manage the user's food list
  const [userList, setUserList] = useState<FoodItem[]>([]);

  // Function to add food to the user's list
  function addFood(foodList: string[], index: number) {

    const foodExists = userList.find(item => item.name === foodList[index])

    if(foodExists){
      setUserList(userList.map( item =>
        item.name === foodList[index] ? {...item, qty: item.qty + 1} : item
      ))
    } 

    else{
      const newFood: FoodItem = {
        name: foodList[index],
        qty: 1,
      }
  
      setUserList([...userList, newFood]);
    }

  }

  // Function to delete food from user's list
  function deleteFood(index:number){
    const deletedFood = userList[index]
    if(deletedFood.qty > 1){
      setUserList(userList.map( item =>
        item === deletedFood ? {...item, qty: item.qty - 1} : item
      ))
    }
    else{
      setUserList(userList.filter(food => food !== deletedFood))
    }
  }


  const foodsList = [
    "Pizza",
    "Sushi",
    "Burger",
    "Pasta",
    "Tacos",
    "Salad",
    "Steak",
    "Ice Cream",
    "Pancakes",
    "Ramen",
    "Apple Pie",
    "Chicken Curry",
    "Dim Sum",
    "Falafel",
    "Paella",
    "Lasagna",
    "Chocolate Cake",
    "Biryani",
    "Pho",
    "Guacamole"
  ];
  

  return (
    <div className="grid grid-cols-2 h-screen w-screen">
      <div className="bg-red-500 h-full p-5">
        {foodsList.map((food, index) => (
            <div className="flex justify-between w-1/2 sm:w-3/4 h-12 bg-white m-auto mb-5 p-3" key={index}>
              <span>{food}</span>
              <button className="w-7 h-7 bg-green-500" onClick={() => addFood(foodsList, index)}>+</button>
            </div>
        ))}
      </div>

      <div className="bg-blue-500 h-full p-5">
        {userList.map((food, index) => (
            <div className="flex justify-between w-1/2 h-12 sm-w-3/4 bg-white m-auto mb-5 p-3" key={index}>
              <span>{food.name} x{food.qty}</span>
              <button className="w-7 h-7 bg-red-500" onClick={() => deleteFood(index)}>X</button>
            </div>
        ))}
      </div>
    </div>
  );
}
