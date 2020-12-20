import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 文章收藏
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/articles/collections',
    data: {
      target
    }
  })
}

export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/articles/collections/${target}`
  })
}

// 文章点赞
export const addLike = target => {
  return request({
    method: 'POST',
    url: ' /app/v1_0/article/likings',
    data: {
      target
    }
  })
}

export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}