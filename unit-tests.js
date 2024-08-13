describe('Voting Application', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="votes-display"></div>
      <div id="voteModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Computing your vote...</p>
          <div id="progressBar"></div>
        </div>
      </div>
    `;

    // Reset vote counts before each test
    ciVotes = 0;
    cdVotes = 0;
  });

  it('should increment CI votes correctly', () => {
    simulateVote('CI');
    expect(ciVotes).toBe(1);
    expect(cdVotes).toBe(0);
  });

  it('should increment CD votes correctly', () => {
    simulateVote('CD');
    expect(ciVotes).toBe(0);
    expect(cdVotes).toBe(1);
  });

  it('should update the vote display correctly', () => {
    simulateVote('CI');
    expect(document.getElementById('votes-display').innerHTML).toBe('CI Votes: 1 | CD Votes: 0');

    simulateVote('CD');
    expect(document.getElementById('votes-display').innerHTML).toBe('CI Votes: 1 | CD Votes: 1');
  });

  it('should show the modal when a vote is cast', () => {
    const modal = document.getElementById('voteModal');
    expect(modal.style.display).toBe('none'); // Initially hidden

    simulateVote('CI');
    expect(modal.style.display).toBe('block'); // Should be visible
  });

  it('should close the modal after a short delay', (done) => {
    simulateVote('CI');
    const modal = document.getElementById('voteModal');

    setTimeout(() => {
      expect(modal.style.display).toBe('none'); // Should be hidden after delay
      done(); // Signal that the asynchronous test is complete
    }, 1000); // Adjust delay if needed based on your code
  });
});
