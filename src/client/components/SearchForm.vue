<template>
  <div>
    <div class="top">
      <h2 style="Avenir Next">Car Hire – Search, Compare & Save</h2>
      <input
        :placeholder="placeHolder"
        type="text"
        class="my-input"
        ref="textSuggestionRef"
        v-model="inputVal"
        @input="referralSuggestion"
        id="inputBox"
      />
      <button style="width: 12rem; height: 6rem; font-size: 2rem">
        Search
      </button>
    </div>
    <div :v-show="textSuggestionState">
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
  </div>
</template>
<script>
import { getSearchResponse } from "../../server/index";

export default {
  data() {
    return {
      placeHolder: "Pick-up Location",
      textSuggestionWidth: 30,
      allResponseData: [],
      inputVal: "",
      completedSuggestions: [],
    };
  },

  methods: {
    setRefText(suggestion) {
      this.inputVal = suggestion;
      this.textSuggestionState = false;
    },

    async referralSuggestion(e) {
      try {
        // fetch the response from the endpoint and store it in local variable
        const response = await getSearchResponse(6, this.inputVal);
        this.allResponseData = response.data.results.docs;
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
