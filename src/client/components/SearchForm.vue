<template>
  <div>
    <div class="top">
      <input
        placeholder="Input Your Favourite Dog Breed Here"
        type="text"
        class="my-input"
        ref="textSuggestionRef"
        v-model="inputVal"
        @input="referralSuggestion"
        id="inputBox"
      />
      <button
        style="width: 16rem; height: 6rem; font-size: 1.5rem"
        @click="fetchPuppy"
      >
        Fetch Input Breed
      </button>
      <button
        style="width: 16rem; height: 6rem; font-size: 1.5rem"
        @click="fetchAnyPuppy"
      >
        Fetch Any Puppy
      </button>
    </div>
    <div v-show="false">
      <div class="my-input-suggestion" id="scrollContent1">
        <ul
          id="ulContent"
          v-show="inputVal.length > 1"
          v-for="(suggestion, index) in completedSuggestions"
          :key="index"
        >
          <li id="liContent">
            {{ suggestion }}
          </li>
        </ul>
      </div>
    </div>
    <img v-show="!!onePuppyImgUrl" :src="onePuppyImgUrl" />
  </div>
</template>
<script>
import { getSearchResponse, getPuppy } from "../../server/index";

export default {
  data() {
    return {
      placeHolder: "Pick-up Location",
      textSuggestionWidth: 30,
      allResponseData: [],
      inputVal: "",
      completedSuggestions: [],
      onePuppyImgUrl:
        "https://images.dog.ceo/breeds/saluki/n02091831_10978.jpg",
    };
  },

  methods: {
    setRefText(suggestion) {
      this.inputVal = suggestion;
      this.textSuggestionState = false;
    },

    async referralSuggestion() {
      try {
        // fetch the response from the endpoint and store it in local variable
        const response = await getSearchResponse(6, this.inputVal);
        this.allResponseData = response.data.results.docs;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchAnyPuppy() {
      try {
        const randomResponse = await getPuppy(
          "https://dog.ceo/api/breeds/image/random"
        );
        this.onePuppyImgUrl = randomResponse.data.message;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchPuppy() {
      try {
        const allInput = this.inputVal.toLowerCase().split(" ");
        const paramFromInput =
          allInput.length === 1 ? allInput[0] : allInput.reverse().join("/");
        const breededUrl = `https://dog.ceo/api/breed/${paramFromInput}/images/random`;
        const response = await getPuppy(breededUrl);
        if (response.data.status === "success")
          this.onePuppyImgUrl = response.data.message;
        else {
          const randomResponse = await getPuppy(
            "https://dog.ceo/api/breeds/image/random"
          );
          this.onePuppyImgUrl = randomResponse.data.message;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    textSuggestionState() {
      return !!(this.inputVal && this.inputVal !== this.placeHolder);
    },
  },
  watch: {
    allResponseData(newVal, oldVal) {
      // if there is new information returned from endpoint
      // parse the data and show the result
      // when a section has no meaningful data, show '-' to indicate undefined
      if (newVal !== oldVal && newVal.length) {
        this.completedSuggestions = this.allResponseData.map((item) => {
          const resultName = item.name;
          const country = item.country === undefined ? "-" : item.country;
          const city = item.city === undefined ? "-" : item.city;
          return resultName === "No results found"
            ? resultName
            : `${resultName} - Country: ${country} ; City: ${city}`;
        });
      } else if (!newVal || newVal.length === 0) {
        // set the variable back to empty array
        this.completedSuggestions = [];
      }
    },
  },
};
</script>

<style scoped>
#ulContent {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding-left: 0;
}

#liContent {
  text-align: left;
  box-sizing: border-box;
  background-color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 60rem;
  height: 6rem;
  font-size: 2rem;
}

#inputBox {
  width: 60rem;
  height: 6rem;
  margin-bottom: 0px;
  line-height: 1.5;
  font-size: 2rem;
  border-width: 0.5rem;
  border-color: #ffb700;
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif;
}
</style>
