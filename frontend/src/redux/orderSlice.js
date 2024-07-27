import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const initialState = {
    orders:[]

}
export const orderSlice = createSlice({
    name: 'orders',
 initialState,
 reducers: {
    addOrder: (state, action) => {
        if (!action.payload.userId) {
            throw new Error('Order must include a userId');
         }
         // Add a new order to the orders array
         state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      // Find the index of the order to update
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        // Update the order at the found index
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action) => {
      // Remove the order with the given id
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
 },

}) 

export const{addOrder, updateOrder, deleteOrder} =orderSlice.actions

export default orderSlice.reducer