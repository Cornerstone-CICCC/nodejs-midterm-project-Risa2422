"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class RecipeModel {
    constructor() {
        this.recipes = [
            {
                id: "1",
                userId: "1",
                title: "Takoyaki",
                cuisineType: "Japanese",
                cookingTime: 10,
                difficulty: "easy",
            },
            {
                id: "2",
                title: "Okoniyaki",
            },
        ];
    }
    findAllRecipe() {
        return this.recipes;
    }
    
    findRecipeByUserId(id) {
        const recipe = this.recipes.find((recipe) => recipe.userId === id);
        if (!recipe)
            return undefined;
        return recipe;
    }
    findRecipeById(id) {
        const recipe = this.recipes.find((recipe) => recipe.id === id);
        if (!recipe)
            return undefined;
        return recipe;
    }
    createRecipe(newData) {
        const newRecipes = Object.assign({ id: (0, uuid_1.v4)() }, newData);
        this.recipes.push(newRecipes);
        return newRecipes;
    }
    edit(id, newData) {
        const index = this.recipes.findIndex((recipe) => recipe.id === id);
        if (index === -1)
            return undefined;
        if (this.recipes[index].id !== newData.id)
            return undefined;
        const updatedArticle = Object.assign(Object.assign({}, this.recipes[index]), newData);
        this.recipes[index] = updatedArticle;
        return updatedArticle;
    }
    delete(id, recipeId) {
        const index = this.recipes.findIndex((recipe) => recipe.id === id && recipe.id === recipeId);
        if (index === 1)
            return false;
        this.recipes.splice(index, 1);
        return true;
    }
}
exports.default = new RecipeModel();
