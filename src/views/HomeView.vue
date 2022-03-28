<template>
  <div class="index container col s3">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)"
        >delete</i
      >
      <div class="card-content">
        <h2 class="indigo-text">
          {{ smoothie.title }}
        </h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip"> {{ ing }} </span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link
          :to="{
            name: 'EditSmoothie',
            params: { smoothie_slug: smoothie.slug },
          }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore/lite";
// import { doc, deleteDoc } from "firebase/firestore";

export default {
  name: "HomeView",
  data() {
    return {
      smoothies: [],
    };
  },
  methods: {
    async deleteSmoothie(id) {
      deleteDoc(doc(db, "smoothies", id)).then(() => {
        this.smoothies = this.smoothies.filter((smoothie) => {
          return smoothie.id !== id;
        });
      });

      console.log(id);
    },

    async getSmoothies() {
      const colRef = collection(db, "smoothies");
      // const docRef = await getDocs(colRef);

      // docRef.docs.map((doc) => {
      //   let smoothie = doc.data();
      //   smoothie.id = doc.id;
      //   this.smoothies.push(smoothie);
      // });

      getDocs(colRef).then((docs) => {
        docs.forEach((doc) => {
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
    },
  },

  created() {
    this.getSmoothies();
  },
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .ingredients {
  margin: 30px auto;
}

.index .ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
