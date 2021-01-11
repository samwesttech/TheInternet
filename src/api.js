import axios from 'axios';

const ncNewsApi = axios.create({baseURL:'https://theinternet-api.herokuapp.com/'});

export const getArticles = (topic_slug, sort_by) => {
    return ncNewsApi.get('/api/articles', {params: {topic: topic_slug, sort_by: sort_by}}).then(({data}) => {
        return data.articles;
    })
}

export const getArticleById = (article_id) => {
    return ncNewsApi.get(`/api/articles/${article_id}`).then(({data}) => {
        return data.article;
    })
}

export const getComments = (article_id) => {
    return ncNewsApi.get(`/api/articles/${article_id}/comments`, {params: {sort_by: 'votes'}}).then(({data}) => {
        return data.comments;
    })
}

export const getTopics = () => {
    return ncNewsApi.get('/api/topics').then(({data}) => {
        return data.topics;
    })
}

export const voteArticle = (article_id, vote) => {
    return ncNewsApi.patch(`/api/articles/${article_id}`, {inc_votes : vote})
}

export const voteComment = (comment_id, vote) => {
    return ncNewsApi.patch(`/api/comments/${comment_id}`, {inc_votes : vote})
}

export const postArticle = (article) => {
    return ncNewsApi.post('/api/articles', article)
}

export const postComment = (article_id, comment) => {
    return ncNewsApi.post(`/api/articles/${article_id}/comments`, comment)
  };

export const deleteComment = (comment_id) => {
    return ncNewsApi.delete(`/api/comments/${comment_id}`)
}

export const deleteArticle = (article_id) => {
    return ncNewsApi.delete(`/api/articles/${article_id}`)
}