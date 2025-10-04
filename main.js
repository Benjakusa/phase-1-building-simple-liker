// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    
    // Add click event listeners to all like glyphs
    const likeGlyphs = document.querySelectorAll('.like-glyph');
    
    likeGlyphs.forEach(glyph => {
        glyph.addEventListener('click', function(event) {
            const heart = event.target;
            
            // Check if heart is already activated (full)
            if (heart.classList.contains('activated-heart')) {
                // User clicked on full heart - remove like
                heart.classList.remove('activated-heart');
                heart.textContent = EMPTY_HEART; // Use constant
            } else {
                // User clicked on empty heart - attempt to like
                mimicServerCall()
                    .then(() => {
                        // SUCCESS: Server returned success status
                        heart.classList.add('activated-heart');
                        heart.textContent = FULL_HEART; // Use constant
                    })
                    .catch((error) => {
                        // FAILURE: Server returned error status
                        // Show error modal
                        modal.classList.remove('hidden');
                        modalMessage.textContent = error;
                        
                        // Hide modal after 3 seconds
                        setTimeout(() => {
                            modal.classList.add('hidden');
                        }, 3000);
                    });
            }
        });
    });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
