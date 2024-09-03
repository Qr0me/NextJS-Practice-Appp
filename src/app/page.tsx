"use client"; // Ensures this is a Client Component

import React, { useState, useEffect } from 'react';

interface FoodItem{
  name: string,
  qty: number
}

export default function Home() {

  // State to manage the user's food list
  const [userList, setUserList] = useState<FoodItem[]>([]);

  async function fetchUserList() {
    try {
      const response = await fetch('/api/foods', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserList(data.foods);
      } else {
        console.error('Failed to load food items');
      }
    } catch (error) {
      console.error('Error loading food items:', error);
    }
  }

  // Fetch the user list when the component mounts
  useEffect(() => {
    fetchUserList();
  }, []);

  // Function to add food to the user's list
  async function addFood(foodList: string[], index: number) {
    const foodName = foodList[index];
    const existingFood = userList.find(item => item.name === foodName);
  
    if (existingFood) {
      const updatedUserList = userList.map(item =>
        item.name === foodName ? { ...item, qty: item.qty + 1 } : item
      );
      setUserList(updatedUserList);
  
      // Call API to update the database
      await fetch('/api/foods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: foodName, qty: 1 }),
      });
    } else {
      const newFood: FoodItem = { name: foodName, qty: 1 };
      const updatedUserList = [...userList, newFood];
      setUserList(updatedUserList);
  
      // Call API to add the new item to the database
      await fetch('/api/foods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFood),
      });
    }
  }

  // Function to delete food from user's list
  async function deleteFood(index: number) {
    const foodToDelete = userList[index];
    if (foodToDelete.qty > 1) {
      const updatedUserList = userList.map(item =>
        item.name === foodToDelete.name ? { ...item, qty: item.qty - 1 } : item
      );
      setUserList(updatedUserList);
  
      // Call API to decrement the quantity in the database
      await fetch('/api/foods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: foodToDelete.name, qty: -1 }),
      });
    } else {
      const updatedUserList = userList.filter(item => item.name !== foodToDelete.name);
      setUserList(updatedUserList);
  
      // Call API to delete the item from the database
      await fetch('/api/foods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: foodToDelete.name, qty: -1 }),
      });
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
            <div className="flex justify-between w-full md:w-1/2 h-12 text-sm md:text-md lg:text-lg bg-white m-auto mb-5 p-1 lg:p-3" key={index}>
              <span>{food}</span>
              <button className="w-7 h-7 bg-green-500" onClick={() => addFood(foodsList, index)}>+</button>
            </div>
        ))}
      </div>

      <div className="bg-blue-500 h-full p-5">
        {userList.map((food, index) => (
            <div className="flex justify-between w-full md:w-1/2 h-12 text-sm lg:text-md bg-white m-auto mb-5 p-1 lg:p-3" key={index}>
              <span>{food.name} x{food.qty}</span>
              <button className="w-7 h-7 bg-red-500" onClick={() => deleteFood(index)}>X</button>
            </div>
        ))}
      </div>
    </div>
  );
}
