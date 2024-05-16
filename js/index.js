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
