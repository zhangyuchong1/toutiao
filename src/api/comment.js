import request from '@/utils/request'

export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 评论点赞
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: ' /app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

export const deleteCommentLike = target => {
  return request({
    method: 'DELETE',
    url: ` /app/v1_0/comment/likings/${target}`
  })
}

// 发布文章评论
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data 
  })
}