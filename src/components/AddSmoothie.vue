<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredent"> Ingredient: </label>
        <input type="text" name="ingredent" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="AddIng"
          v-model="anotherIng"
        />
      </div>
      <div class="field center-align">
        <p class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import { collection, addDoc } from "firebase/firestore/lite";

export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      anotherIng: null,
      ingredients: [],
      feedback: null,
      slug: null,
    };
  },
  methods: {
    async AddSmoothie() {
      if (this.title) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        await addDoc(collection(db, "smoothies"), {
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug,
        })
          .then(() => {
            this.$router.push({ name: "HomeView" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.feedback = "You have to enter the Title";
      }
    },
    AddIng() {
      if (this.anotherIng) {
        this.ingredients.push(this.anotherIng);
        this.anotherIng = null;
        this.feedback = null;
      } else {
        this.feedback = "You have to add Ingredients";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter((ingredent) => {
        return ingredent !== ing;
      });
    },
  },
};
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
