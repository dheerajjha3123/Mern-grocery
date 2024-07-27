import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      
        email: "",
        firstName: "",
        image: "",
        lastName: "",
        _id: "",
      
    
    
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
       loginRedux: (state, action) => {
         // Check if action.payload and action.payload.data are defined
         if (action.payload && action.payload.dataSend) {
           const { _id, firstName, lastName, email, image } = action.payload.dataSend;
           state._id = _id || "";
           state.firstName = firstName || "";
           state.lastName = lastName || "";
           state.email = email || "";
           state.image = image || "";
         } else {
           // Handle the case where action.payload.data is undefined
           console.error("loginRedux: action.payload.data is undefined");
         }
       },
       logoutRedux : (state,action)=>{
           state._id =  "";
           state.firstName = "";
           state.lastName =  "";
           state.email =  "";
           state.image =  "";

       }
    },
});

export const { loginRedux ,logoutRedux} = userSlice.actions;

export default userSlice.reducer;