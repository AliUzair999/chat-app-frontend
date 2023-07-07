import { createSlice } from "@reduxjs/toolkit"

const initialState = { existingIds: [] }

const FavoritesSlice = createSlice({
    name: "Favorites",
    initialState,
    reducers: {
        addFavorites: {
            reducer: (state, action) => {
                try {

                    let favUID = action.payload.currentUID
                    delete action.payload.Uid



                    let existingIds = [...state.existingIds]
                    // console.log(existingIds)

                    let userAds
                    let userExists = false

                    for (let i = 0; i < existingIds.length; i++) {
                        if (favUID == existingIds[i]) {
                            // console.log("user Found")
                            userExists = true
                            break
                        }
                    }

                    if (userExists) {
                        console.log("adding current ad to favorites")
                        userAds = [...state[favUID]]
                        // eval('userAds = [...state.' + favUID + ']' + ';');
                        // console.log(userAds)

                        for (let i = 0; i < userAds.length; i++) {
                            // console.log(i)
                            if (action.payload.Name === userAds[i].Name) {
                                alert("already added to favorites")
                                return state
                                break
                            }
                        }

                        userAds.push(action.payload)
                        alert("added")
                        return state = { ...state, [favUID]: userAds }
                    }
                    else {
                        // console.log("adding new key for new user")
                        existingIds.push(favUID)
                        alert("added")
                        return state = { ...state, existingIds: existingIds, [favUID]: [action.payload] }
                    }

                }
                catch (e) {
                    console.log(e.message)
                }
            }
        },
        removeAllFavorites(state) {
            return state = initialState
        }
    }
})

export const { addFavorites, removeAllFavorites } = FavoritesSlice.actions

export default FavoritesSlice.reducer

