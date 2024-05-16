function postFeedback(endpoint, text) {
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}

function toggleButton(button, active) {
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
}

document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-button');
    const dislikeButtons = document.querySelectorAll('.dislike-button');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const text = button.dataset.id;
            postFeedback('/api/like', text).then(() => {
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
            const text = button.dataset.id;
            postFeedback('/api/dislike', text).then(() => {
                toggleButton(button, true);

                // Remove active class from like button if it exists
                const likeButton = button.previousElementSibling;
                if (likeButton && likeButton.classList.contains('like-button')) {
                    toggleButton(likeButton, false);
                }
            });
        });
    });
});