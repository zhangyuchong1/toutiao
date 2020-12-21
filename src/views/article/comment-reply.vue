<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? '${comment.reply_count}条回复' : '暂无回复'
      "
    />
    <van-icon slot="left" name="cross" @click="$emit('close')" />
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- 评论回复列表 -->
      <van-cell title="全部回复" />
      <comment-list :list="commentList" :source="comment.com_id" type="c" />

      <div class="post-wrap">
        <van-button class="post-btn" size="small" round>写评论</van-button>
      </div>
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post :target="comment.com_id" @post-success="onPostSuccess" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import CommentList from "./comment-list";
import CommentPost from "./comment-post";
export default {
  name: "CommentReply",
  components: {
    CommentItem,
    CommentList,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
        isPostShow:false,
        commentList:[]
    };
  },
  methods: {
      onPostSuccess(data){
          this.comment.reply_count++
          this.isPostShow=false
          this.commentList.unshift(data.new_obj)
      }
  },
};
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  right: 0;
  bottom: 88px;
  left: 0;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
