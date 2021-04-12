export const getAllCategories = async () => {
    try {
        const res = await fetch('http://localhost:9000/api/v1/categories', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        if (res.status === 200) {
            const categories = await res.json();
            return categories.data;
        } else {
            throw new Error(await res.text())
        }
    } catch (error) {
        console.error('An unexpected error happened occurred:', error)
    }
};

export const getAllArticles = async (page, limit = 3, query) => {
    try {
        const res = await fetch(`http://localhost:9000/api/v1/articles?${query != undefined ? query+'&' : ''}page=${page+1}&limit=${limit}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        if (res.status === 200) {
            const articles = await res.json();
            return articles.data;
        } else {
            if (!res.ok) {
                throw new Error("HTTP status " + res.status);
            }
            return res.json();
        }
    } catch (error) {
        console.error('An unexpected error happened occurred:', error)
    }
};

export const getArticleBySlug = async (slug) => {
    try {
        const res = await fetch(`http://localhost:9000/api/v1/articles/${slug}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        if (res.status === 200) {
            const article = await res.json();
            return article.data;
        } else {
            throw new Error(await res.text())
        }
    } catch (error) {
        console.error('An unexpected error happened occurred:', error)
    }
};
