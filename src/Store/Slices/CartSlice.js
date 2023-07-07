import { createSlice } from "@reduxjs/toolkit"

const initialState = { existingIds: [] }

const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: {
            reducer: (state, action) => {

                try {

                    let cartUID = action.payload.currentUID
                    delete action.payload.Uid



                    let existingIds = [...state.existingIds]
                    // console.log(existingIds)

                    let userCartItems
                    let userExists = false

                    for (let i = 0; i < existingIds.length; i++) {
                        if (cartUID == existingIds[i]) {
                            // console.log("user Found")
                            userExists = true
                            break
                        }
                    }

                    if (userExists) {
                        console.log("adding to Cart")
                        userCartItems = [...state[cartUID]]
                        // eval('userCartItems = [...state.' + cartUID + ']' + ';');
                        // console.log(userCartItems)

                        for (let i = 0; i < userCartItems.length; i++) {
                            // console.log(i)
                            if (action.payload.Name === userCartItems[i].Name) {
                                alert("already added to Cart")
                                return state
                                break
                            }
                        }

                        userCartItems.push(action.payload)
                        alert("added")
                        return state = { ...state, [cartUID]: userCartItems }
                    }
                    else {
                        // console.log("adding new key for new user")
                        existingIds.push(cartUID)
                        alert("added")
                        return state = { ...state, existingIds: existingIds, [cartUID]: [action.payload] }
                    }

                }
                catch (e) {
                    console.log(e.message)
                }
            }
        },
        deleteCartItem: {
            reducer: (state, action) => {
                try {
                    // console.log(action.payload)
                    let cartUID = action.payload.currentUID
                    let existingIds
                    let copyState = { ...state }
                    let copyArr = [...copyState[cartUID]]
                    // console.log("1", copyState)
                    // console.log("2", copyArr)
                    
                    for (let i = 0; i < copyArr.length; i++) {
                        if (copyArr[i].Name == action.payload.Name) {
                            copyArr.splice(i, 1)
                            copyState[cartUID] = copyArr
                            // console.log("3", copyState[cartUID])
                            // console.log("4", copyArr)
                            break
                        }
                    }

                    if (copyArr.length == 0) {
                        // console.log("0 wala if working")
                        existingIds = [...copyState.existingIds]
                        let delIndex = existingIds.indexOf(cartUID)
                        existingIds.splice(delIndex, 1)
                        copyState.existingIds = existingIds
                        delete copyState[cartUID]
                    }

                    alert("Item Deleted")

                    return copyState
                }
                catch (e) {
                    console.log(e.message)
                }
            }
        },
        emptyCart: {
            reducer: (state, action) => {
                try {
                    let cartUID = action.payload.currentUID

                    let existingIds = [...state.existingIds]
                    console.log(existingIds)
        
                    let userExists = false
        
                    for (let i = 0; i < existingIds.length; i++) {
                        if (cartUID == existingIds[i]) {
                            console.log("user Found")
                            userExists = true
                            break
                        }
                    }
        
                    if (userExists) {
        
                        let copyState = { ...state }
                        // console.log("1", copyState)
                        delete copyState[cartUID]
                        // console.log("2", copyState)
                        let delIndex = copyState.existingIds.indexOf(cartUID)
                        // console.log("3", delIndex)                                              
                        existingIds.splice(delIndex, 1)
                        // console.log("4", existingIds)
                        copyState.existingIds = existingIds

                        alert("Cart Empty! Add new Items")
                        // return {...copyState, existingIds:existingIds  }
                        return copyState
                    }
                    else {
                        alert("cart already empty")
                    }
                }
                catch(e) {
                    console.log(e.message)
                }
            }
        }
       
           
    }
})

export const { addToCart, deleteCartItem, emptyCart } = CartSlice.actions

export default CartSlice.reducer

