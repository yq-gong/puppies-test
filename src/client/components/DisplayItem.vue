<template>
  <div>
    <div class="header">
      <a
        href="/"
        data-testid="brand-logo"
        class="btui-c-link btui-c-link--primary bgui-c-header__brand-logo-link"
        rel=""
        ><h4>Back to default</h4>
      </a>
      <a href="https://dog.ceo/dog-api/" style="float:right" target="_blank">Source: Dog API</a>
      <a href="https://dog.ceo/dog-api/breeds-list" style="float:right; margin-right: 20px" target="_blank">Breed List</a>
    </div>
    <br />
    <h2 style="Avenir Next">Get Your a Copy of a Lovely Puppy!</h2>
    <search-form />
  </div>
</template>

<script>
import SearchForm from "./SearchForm.vue";
export default {
  components: {
    SearchForm,
  },
  data() {
    return {
      items: [],
    };
  },

  created: function() {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      let uri = "http://localhost:4000/items";
      this.axios.get(uri).then((response) => {
        this.items = response.data;
      });
    },
    deleteItem(id) {
      let uri = "http://localhost:4000/items/delete/" + id;
      this.items.splice(id, 1);
      this.axios.get(uri);
    },
  },
};
</script>
