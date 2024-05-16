// UserID

function get_user_id() {
    let userId = localStorage.getItem('user_id');
    if (!userId) {
        userId = generateUUID();
        localStorage.setItem('user_id', userId);
    }
    return userId;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Like/Dislike

function recordOpinion(article_id, topic_id, opinion) {
    return fetch('/api/record-opinion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: get_user_id(),
            article_id: article_id,
            topic_id: topic_id,
            opinion: opinion,
        })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}

function toggleButton(button, active) {
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
}

function loadLikeDislike(articleId) {
    const likeButtons = document.querySelectorAll('.like-button');
    const dislikeButtons = document.querySelectorAll('.dislike-button');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const topic_id = button.dataset.id;
            recordOpinion(articleId, topic_id, "DISLIKE").then(() => {
                toggleButton(button, true);

                // Remove active class from dislike button if it exists
                const dislikeButton = button.nextElementSibling;
                if (dislikeButton && dislikeButton.classList.contains('dislike-button')) {
                    toggleButton(dislikeButton, false);
                }
            });
        });
    });

    dislikeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const topic_id = button.dataset.id;
            recordOpinion(articleId, topic_id, "LIKE").then(() => {
                toggleButton(button, true);

                // Remove active class from like button if it exists
                const likeButton = button.previousElementSibling;
                if (likeButton && likeButton.classList.contains('like-button')) {
                    toggleButton(likeButton, false);
                }
            });
        });
    });
}

// LOAD ARTICLE


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function loadArticle() {
    const articleId = getQueryParam('article_id');
    let commentoId = articleId
    if (articleId == "israelpalestine") {
        commentoId = "/"
    }
    /*document.getElementById('commento-comments').innerHTML = `
    <script defer src="https://cdn.commento.io/js/commento.js" data-page-id="${commentoId}"></script>
    <div id="commento"></div>
    `;*/
    if (articleId) {
        const articlePath = `./articles/${articleId}.html`;
        document.getElementById('article-name').innerHTML = {
            "israelpalestine": "May's Israel-Palestine Developments",
            "ucla": "UCLA protester encampment ended by police.",
            "trumptrial": "Trump awaiting trial for \"hush money\" payments to Stormy Daniels.",
        }[articleId];
        if (articleId != "israelpalestine") {
            document.getElementById('commento').style.display = 'none';
        }
        fetch(articlePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('article-text').innerHTML = data;
                loadLikeDislike(articleId);
            })
            .catch(error => {
                console.error('Error fetching the article:', error);
            });
    } else {
        console.error('No article_id query parameter found.');
    }
}

document.addEventListener('DOMContentLoaded', loadArticle);
