<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <search-result v-if="isResultShow" :search-text="searchText" />
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <search-history
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
    />
  </div>
</template>
<script>
import SearchHistory from "./components/search-history";
import SearchResult from "./components/search-result";
import SearchSuggestion from "./components/search-suggestion";
export default {
  name: "SearchIndex",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  data() {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: [],
    };
  },
  methods: {
    onSearch(val) {
      this.searchText = val;
      const index = this.searchHistories.indexOf(val);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val);

      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less" scoped>
.search-container {
    padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
