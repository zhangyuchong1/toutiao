<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="请求失败，点击重新加载"
        :error.sync="error"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";

export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态，默认不 loading
      finished: false, // 数据是否加载完成
      timestamp: null, //请求获取下一页数据的时间戳
      error: false,
      isRefreshLoading: false,
      refreshSuccessText: "刷新成功",
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false; //本次加载结束之后设定为false才能进行下一次加载
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        console.log("文章请求失败", err);
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1,
        });
        const { results } = data.data;
        this.list.unshift(...results);
        // 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false;
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (err) {
        // 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false;
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = "刷新失败";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
