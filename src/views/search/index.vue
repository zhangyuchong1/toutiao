<template>
    <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
    </form>
    <search-result v-if="isResultShow" :search-text="searchText" />
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch" />
    <search-history v-else />
  </div>
</template>
<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
export default {
  name: 'SearchIndex',
   components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      searchText: '',
      isResultShow: false // 控制搜索结果的展示
    }
  },
  methods: {
    onSearch (val) {
        this.searchText=val
      this.isResultShow=true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>