// IGNORE THIS FILE
// THiS IS A REFERENCE FILE

import { useEffect, useState } from "react";
import { db } from "../firebase-config"
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"

const Firebase = () => {
    const [recipes, setRecipes] = useState([])
    const [label, setLabel] = useState("")
    const userCollectionRef = collection(db, "favourite")

    const createRecipe = async () => {
        await addDoc(userCollectionRef, {label: label});
    }

    const updateRecipe = async (id, label) => {
        const recipeDoc = doc(db, "favourite", id)
        const newFields = {label: label + 1}
        await updateDoc(recipeDoc, newFields)
    }

    const deleteRecipe = async (id) => {
        const recipeDoc = doc(db, "favourite", id)
        await deleteDoc(recipeDoc)
    }

    useEffect(() => {
        const getRecipes = async () => {
            const data = await getDocs(userCollectionRef);
            setRecipes(data.docs.map(doc => ({...doc.data(), id: doc.id})))
        }

        getRecipes()
    }, []);

    return ( 
        <div>
            {recipes.map(recipe => (
            <div> { recipe.label }
                <input placeholder="label" onChange={(e) => setLabel(e.target.value)} />
                <button onClick={createRecipe}>Create</button>
                <button onClick={() => {updateRecipe(recipe.id, recipe.label)}}>Update</button>
                <button onClick={() => {deleteRecipe(recipe.id)}}>Delete</button>
            </div>
            ))}
        </div> 
    );
}
 
export default Firebase;