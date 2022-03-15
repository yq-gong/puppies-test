<template>
  <div>
    <div class="header">
      <a
        href="/"
        data-testid="brand-logo"
        class="btui-c-link btui-c-link--primary bgui-c-header__brand-logo-link"
        rel=""
        ><h4>RentalCars.com</h4>
      </a>
    </div>
    <br />
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
