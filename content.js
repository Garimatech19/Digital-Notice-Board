document.addEventListener('DOMContentLoaded', () => {
    
    // const button = document.getElementById('randomWidgetBtn');
    // const popupContent = document.getElementById('popupContent');

    // button.addEventListener('click', () => {
    //     if (popupContent.classList.contains('hidden')) {
    //         popupContent.classList.remove('hidden');
    //     } else {
    //         popupContent.classList.add('hidden');
    //     }
    // });
    
    
    
    // Pomodoro Timer Variables
    let timerInterval;
    let minutes = 25;
    let seconds = 0;
    let isRunning = false;
    let isBreak = false;
    let breakType = 'short'; // 'short' or 'long'

    // Get DOM Elements for Timer
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const shortBreakButton = document.getElementById('short-break');
    const longBreakButton = document.getElementById('long-break');
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskListUl = document.getElementById('task-list');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    // Get DOM Elements for Notice Board
    const likeButton = document.getElementById('like-button');
    const dislikeButton = document.getElementById('dislike-button');
    const noticeText = document.getElementById('notice-text');

    // Get DOM Element for Toggle Mode Button
    const toggleModeButton = document.getElementById('toggle-mode-button');
    
    // Get DOM Elements for Quote of the Day
    const quoteIcon = document.getElementById('quote-icon');
    const quotePopup = document.getElementById('quote-popup');
    const quoteCloseButton = document.getElementById('quote-popup-close');

    // Event Listeners for Quote of the Day
    quoteIcon.addEventListener('click', () => {
        quotePopup.classList.remove('hidden');
    });

    quoteCloseButton.addEventListener('click', () => {
        quotePopup.classList.add('hidden');
    });

      
    

    


     // Poll Variables
     let pollVotes = {
        'Option 1': 0,
        'Option 2': 0,
        'Option 3': 0
    };
    const totalVotes = 0;

    // Get DOM Elements for Poll
    const pollButton = document.getElementById('poll-button');
    const pollBox = document.getElementById('poll-box');
    const pollForm = document.getElementById('poll-form');
    const pollOptions = document.querySelectorAll('input[name="poll"]');
    const option1Percentage = document.getElementById('option1-percentage');
    const option2Percentage = document.getElementById('option2-percentage');
    const option3Percentage = document.getElementById('option3-percentage');

    // Poll Form Submit Event Listener
    pollForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedOption = document.querySelector('input[name="poll"]:checked');
        if (selectedOption) {
            pollVotes[selectedOption.value]++;
            updatePollPercentages();
        }
    });

    function updatePollPercentages() {
        const totalVotes = pollVotes['Option 1'] + pollVotes['Option 2'] + pollVotes['Option 3'];
        if (totalVotes > 0) {
            option1Percentage.textContent = `${((pollVotes['Option 1'] / totalVotes) * 100).toFixed(2)}%`;
            option2Percentage.textContent = `${((pollVotes['Option 2'] / totalVotes) * 100).toFixed(2)}%`;
            option3Percentage.textContent = `${((pollVotes['Option 3'] / totalVotes) * 100).toFixed(2)}%`;
        } else {
            option1Percentage.textContent = '0%';
            option2Percentage.textContent = '0%';
            option3Percentage.textContent = '0%';
        }
    }


    // Event Listeners for Timer
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    shortBreakButton.addEventListener('click', startShortBreak);
    longBreakButton.addEventListener('click', startLongBreak);
    addTaskButton.addEventListener('click', addTask);

    // Event Listeners for Notice Board
    if (likeButton) {
        likeButton.addEventListener('click', () => {
            alert('You liked the notice!');
            noticeText.textContent += ' (Liked)';
        });
    }

    if (dislikeButton) {
        dislikeButton.addEventListener('click', () => {
            alert('You disliked the notice!');
            noticeText.textContent += ' (Disliked)';
        });
    }

    // Event Listener for Toggle Mode Button
    toggleModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });

    // Timer Functions
    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            timerInterval = setInterval(updateTimer, 1000);
        }
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        minutes = isBreak ? 5 : 25;
        seconds = 0;
        updateDisplay();
    }

    function startShortBreak() {
        clearInterval(timerInterval);
        isRunning = false;
        isBreak = true;
        minutes = 5; // 5 minutes for short break
        seconds = 0;
        updateDisplay();
        startTimer();
    }

    function startLongBreak() {
        clearInterval(timerInterval);
        isRunning = false;
        isBreak = true;
        minutes = 10 * 60; // 10 hours for long break
        seconds = 0;
        updateDisplay();
        startTimer();
    }

    function updateTimer() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timerInterval);
                isRunning = false;
                isBreak = false;
                alert("Time's up!");
                return;
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateDisplay();
    }

    function updateDisplay() {
        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                taskListUl.removeChild(taskItem);
            });
            taskItem.appendChild(deleteButton);
            taskListUl.appendChild(taskItem);
            taskInput.value = '';
        }
    }

    // Get DOM Elements
    const blinkingButton = document.getElementById('blinking-button');
    const popupAnnouncement = document.getElementById('popup-announcement');
    const popupCloseButton = document.getElementById('popup-announcement-close');

    // Event Listener for Showing/Hiding Popup Window
    blinkingButton.addEventListener('mouseover', () => {
        popupAnnouncement.style.display = 'block';
    });

    blinkingButton.addEventListener('mouseout', () => {
        // Use a slight delay to ensure the user has time to interact with the popup
        setTimeout(() => {
            if (!popupAnnouncement.matches(':hover')) {
                popupAnnouncement.style.display = 'none';
            }
        }, 200);
    });

    // Event Listener for Closing Popup Window
    popupCloseButton.addEventListener('click', () => {
        popupAnnouncement.style.display = 'none';
    });
   
    // Get DOM Elements for Opportunity Board
    const problemInput = document.getElementById('problem-input');
    const submitProblemButton = document.getElementById('submit-problem');
    const problemListUl = document.getElementById('problem-list');

    // Event Listener for Submit Problem Button
    submitProblemButton.addEventListener('click', () => {
        const problemText = problemInput.value.trim();
        if (problemText) {
            const problemItem = document.createElement('li');
            problemItem.textContent = problemText;

            // Add a "Solve" Button
            const solveButton = document.createElement('button');
            solveButton.textContent = 'Solve';
            solveButton.addEventListener('click', () => {
                const solution = prompt('Enter your solution:');
                if (solution) {
                    problemItem.textContent += ` - Solved: ${solution}`;
                    problemItem.removeChild(solveButton);
                }
            });
            problemItem.appendChild(solveButton);

            problemListUl.appendChild(problemItem);
            problemInput.value = '';
        }
    });

   
       
     // Modal Elements
     const settingsButton = document.getElementById('settings-button');
     const settingsModal = document.getElementById('settings-modal');
     const closeModal = document.querySelector('.modal .close');
 
     // Open Modal
     settingsButton.addEventListener('click', function() {
         settingsModal.style.display = 'block';
     });
 
     // Close Modal
     closeModal.addEventListener('click', function() {
         settingsModal.style.display = 'none';
     });
 
     // Close Modal when clicking outside of the modal content
     window.addEventListener('click', function(event) {
         if (event.target == settingsModal) {
             settingsModal.style.display = 'none';
         }
     });
 
     // Ensure all checkboxes are checked by default
     document.querySelectorAll('.settings-checkbox').forEach(checkbox => {
         checkbox.checked = true;
     });
 
     // Event Listener for Settings Checkboxes
     document.querySelectorAll('.settings-checkbox').forEach(checkbox => {
         checkbox.addEventListener('change', function() {
             const widgetId = this.dataset.widgetId;
             const widget = document.getElementById(widgetId);
             if (widget) {
                 widget.style.display = this.checked ? 'block' : 'none';
             }
         });
     });

     
    
    console.log('Content script loaded and running.');

    
});
// Function to show the popup
function showPopup() {
    const popup = document.querySelector('.widget-popup');
    popup.classList.remove('hidden');
    popup.classList.add('show');
}

// Function to hide the popup
function hidePopup() {
    const popup = document.querySelector('.widget-popup');
    popup.classList.remove('show');
    popup.classList.add('hidden');
}

// Example usage
document.querySelector('.open-popup-btn').addEventListener('click', showPopup);
document.querySelector('.widget-popup .close-btn').addEventListener('click', hidePopup);
