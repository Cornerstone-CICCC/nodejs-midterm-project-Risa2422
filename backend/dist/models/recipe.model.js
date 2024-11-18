"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class RecipeModel {
    constructor() {
        this.recipes = [
            {
                id: "1",
                userId: "19988b16-58b9-4b2c-9147-3a84307982ae",
                title: "Pho",
                cuisineType: "Vietnamese",
                cookingTime: 20,
                difficulty: "Medium",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731798360/pexels-quang-nguyen-vinh-222549-2133989_ntzp4l.jpg",
                date: new Date("2024-11-16T12:00:00Z"),
                price: 10,
                about: "Pho is a traditional Vietnamese noodle soup made with a flavorful broth, rice noodles, and either beef or chicken. It's served with fresh herbs, and bean sprouts, offering a delicious and customizable meal.",
                ingredients: `・4 lbs beef bones (with marrow)\n\n・1onion \n\n・1piece of ginger\n\n・3-4 star anise\n\n・1 cinnamon stick\n\n・4-5 cloves\n\n・1-2 cardamom pods (optional)\n\n・2-3 teaspoons fish sauce\n\n・1 tablespoon sugar\n\n・Salt to taste`,
                procedure: `1. Make the Broth: Blanch the bones:\n\nPut beef bones in a pot, cover with cold water, and bring to a boil. Once it boils, discard the water to remove impurities.\n\nSimmer the broth:\n\nAdd the bones back to the pot, cover with fresh water, and add onion, ginger, star anise, cinnamon, cloves, and cardamom.\n\nBring to a boil, then lower heat and simmer for 3-4 hours. Skim off any scum.\nFlavor the broth:\nAfter simmering, strain the broth and season with fish sauce, sugar, and salt to taste.\n\n2. Prepare the Noodles:\nCook rice noodles according to the package instructions. Drain and set aside.\n\n3. Prepare the Beef and Toppings:\nThinly slice the beef.\nPrepare herbs, lime wedges, and bean sprouts.\n\n4. Assemble the Pho:\nPlace noodles in bowls.\nAdd raw beef on top of the noodles.\nPour hot broth over the beef and noodles. The hot broth will cook the beef.\n\n5. Serve:\nServe with fresh herbs, bean sprouts, lime wedges, hoisin sauce, and Sriracha.`,
            },
            {
                id: "2",
                userId: "19988b16-58b9-4b2c-9147-3a84307982ae",
                title: "Okoniyaki",
                cuisineType: "Japanese",
                cookingTime: 10,
                difficulty: "Easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731782725/TSU_mayomayookonomi_TP_V4_ntspye.jpg",
                date: new Date("2024-11-16T12:00:00Z"),
                price: 10,
                about: "about",
                ingredients: "ingredients",
                procedure: "procedure",
            },
            {
                id: "3",
                userId: "19988b16-58b9-4b2c-9147-3a84307982ae",
                title: "Bibimbap",
                cuisineType: "Korean",
                cookingTime: 10,
                difficulty: "Easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731782785/pexels-becerragoveaphoto-5773960_ecdfsd.jpg",
                date: new Date("2024-11-16T12:00:00Z"),
                price: 10,
                about: "about",
                ingredients: "ingredients",
                procedure: "procedure",
            },
            {
                id: "4",
                userId: "19988b16-58b9-4b2c-9147-3a84307982ae",
                title: "Toppoki",
                cuisineType: "Korean",
                cookingTime: 10,
                difficulty: "Easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731782912/pexels-pip-pip-1842307-12963392_fsj5il.jpg",
                date: new Date("2024-11-16T12:00:00Z"),
                price: 10,
                about: "about",
                ingredients: "ingredients",
                procedure: "procedure",
            },
            {
                id: "5",
                userId: "19988b16-58b9-4b2c-9147-3a84307982ae",
                title: "Tacos",
                cuisineType: "Mexican",
                cookingTime: 20,
                difficulty: "Easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731783192/pexels-cristian-rojas-7613568_nc6q98.jpg",
                date: new Date("2024-11-16T12:00:00Z"),
                price: 10,
                about: "about",
                ingredients: "ingredients",
                procedure: "procedure",
            },
            {
                id: "6",
                userId: "19988b16-58b9-4b2c-9147-3a84307982ae",
                title: "Bubble Tea",
                cuisineType: "Taiwanese",
                cookingTime: 20,
                difficulty: "Easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731783567/pexels-bam-awey-348707-4013151_pepa84.jpg",
                date: new Date("2024-11-16T12:00:00Z"),
                price: 10,
                about: "about",
                ingredients: "ingredients",
                procedure: "procedure",
            },
            {
                id: "7",
                userId: "90393cd5-ab1f-40fc-be7f-ca2dfaccb438",
                title: "Adobo",
                cuisineType: "Filipino",
                cookingTime: 20,
                difficulty: "Advanced",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731783740/pexels-fox-58267-6525933_lufl5d.jpg",
                date: new Date("2024-11-16T12:00:00Z"),
                price: 10,
                about: "about",
                ingredients: "ingredients",
                procedure: "procedure",
            },
            {
                id: "8",
                userId: "90393cd5-ab1f-40fc-be7f-ca2dfaccb438",
                title: "Tamales",
                cuisineType: "Costa Rican",
                cookingTime: 20,
                difficulty: "Easy",
                image: "https://res.cloudinary.com/do9wpvadq/image/upload/v1731783861/pexels-gonzalogfg-14179987_g3ardf.jpg",
                date: new Date("2024-11-16T12:00:00Z"),
                price: 10,
                about: "about",
                ingredients: "ingredients",
                procedure: "procedure",
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
