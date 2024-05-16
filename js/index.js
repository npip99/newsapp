function like(text) {
    fetch('/api/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    }).catch(error => console.error('Error:', error));
}

function dislike(text) {
    fetch('/api/dislike', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    }).catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-button');
    const dislikeButtons = document.querySelectorAll('.dislike-button');

    likeButtons.forEach(button => {
       button.addEventListener('click', () => {
          const text = button.dataset.id;
          like(text);
          button.classList.toggle('active');
          // or, remove active class from dislike button if it exists
          const dislikeButton = button.nextElementSibling;
          if (dislikeButton && dislikeButton.classList.contains('active')) {
             dislikeButton.classList.remove('active');
          }
       });
    });

    dislikeButtons.forEach(button => {
       button.addEventListener('click', () => {
          const text = button.dataset.id;
          dislike(text);
          button.classList.toggle('active');
          // or, remove active class from like button if it exists
          const likeButton = button.previousElementSibling;
          if (likeButton && likeButton.classList.contains('active')) {
             likeButton.classList.remove('active');
          }
       });
    });
});