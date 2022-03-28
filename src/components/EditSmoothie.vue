<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
    <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <div
        v-for="(ing, index) in smoothie.ingredients"
        :key="index"
        class="field"
      >
        <label for="ingredent"> Ingredient: </label>
        <input
          type="text"
          name="ingredent"
          v-model="smoothie.ingredients[index]"
        />
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
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
import slugify from "slugify";

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      feedback: null,
      anotherIng: null,
    };
  },
  methods: {
    async EditSmoothie() {
      console.log(this.smoothie.title);
      if (this.smoothie.title) {
        this.feedback = null;
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });

        const docRef = doc(db, "smoothies", this.smoothie.id);

        await updateDoc(docRef, {
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug,
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
        this.smoothie.ingredients.push(this.anotherIng);
        this.anotherIng = null;
        this.feedback = null;
      } else {
        this.feedback = "You have to add Ingredients";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        (ingredent) => {
          return ingredent !== ing;
        }
      );
    },
  },
  created() {
    let q = query(
      collection(db, "smoothies"),
      where("slug", "==", this.$route.params.smoothie_slug)
    );
    getDocs(q).then((docs) => {
      docs.forEach((doc) => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  },
};
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
