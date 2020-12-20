import request from '@/utils/request'
import store from '@/store'

export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}

export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user',
        headers: {
            Authorization:`Bearer ${store.state.user.token}`
        }
    })
}

export const getUserchannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels'
    })
}

// 关注用户
export const addFollow = target => {
    return request({
      method: 'POST',
      url: '/app/v1_0/user/followings',
      data: {
        target // 代表要关注的目标（用户ID）
      }
    })
  }
  
  // 取消关注用户
  export const deleteFollow = target => {
    return request({
      method: 'DELETE',
      url: `/app/v1_0/user/followings/${target}`
    })
  }