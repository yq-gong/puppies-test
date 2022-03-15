import axios from "axios";
import { baseURL } from "./config/util";

export async function getSearchResponse(numberOfResults, searchTerm) {
  return axios.get(
    `${baseURL}/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${numberOfResults}&solrTerm=${searchTerm}`
  );
}
