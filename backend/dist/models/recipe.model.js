"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class RecipeModel {
    constructor() {
        this.recipes = [
            {
                id: "1",
                userId: "1",
                title: "Pho",
                cuisineType: "Vietnamese",
                cookingTime: 20,
                difficulty: "easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731754888/uploads/xfh6n2r4ammduqaktptq.jpg",
            },
            {
                id: "2",
                userId: "2",
                title: "Okoniyaki",
                cuisineType: "Japanese",
                cookingTime: 10,
                difficulty: "easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731782725/TSU_mayomayookonomi_TP_V4_ntspye.jpg",
            },
            {
                id: "3",
                userId: "19988b16-58b9-4b2c-9147-3a84307982ae",
                title: "Bibimbap",
                cuisineType: "Korean",
                cookingTime: 10,
                difficulty: "easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731782785/pexels-becerragoveaphoto-5773960_ecdfsd.jpg",
            },
            {
                id: "4",
                userId: "19988b16-58b9-4b2c-9147-3a84307982ae",
                title: "Toppoki",
                cuisineType: "Korean",
                cookingTime: 10,
                difficulty: "easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731782912/pexels-pip-pip-1842307-12963392_fsj5il.jpg",
            },
            {
                id: "5",
                userId: "19988b16-58b9-4b2c-9147-3a84307982ae",
                title: "Tacos",
                cuisineType: "Mexican",
                cookingTime: 20,
                difficulty: "easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731783192/pexels-cristian-rojas-7613568_nc6q98.jpg",
            },
            {
                id: "6",
                userId: "90393cd5-ab1f-40fc-be7f-ca2dfaccb438",
                title: "Bubble Tea",
                cuisineType: "Taiwanese",
                cookingTime: 20,
                difficulty: "easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731783567/pexels-bam-awey-348707-4013151_pepa84.jpg",
            },
            {
                id: "7",
                userId: "90393cd5-ab1f-40fc-be7f-ca2dfaccb438",
                title: "Adobo",
                cuisineType: "Filipino",
                cookingTime: 20,
                difficulty: "easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731783740/pexels-fox-58267-6525933_lufl5d.jpg",
            },
            {
                id: "8",
                userId: "90393cd5-ab1f-40fc-be7f-ca2dfaccb438",
                title: "Tamales",
                cuisineType: "Costa Rican",
                cookingTime: 20,
                difficulty: "easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731783861/pexels-gonzalogfg-14179987_g3ardf.jpg",
            },
        ];
    }
    findAllRecipe() {
        return this.recipes;
    }
    findRecipeByUserId(id) {
        const filteredRecipes = this.recipes.filter((recipe) => recipe.userId === id);
        if (filteredRecipes.length === 0)
            return undefined;
        return filteredRecipes;
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
        const index = this.recipes.findIndex((recipe) => recipe.id === id);
        if (index === 1)
            return false;
        this.recipes.splice(index, 1);
        return true;
    }
}
exports.default = new RecipeModel();
