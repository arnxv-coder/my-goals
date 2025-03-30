document.addEventListener('DOMContentLoaded', () => {
    const goalInput = document.getElementById('goalInput');
    const addGoalBtn = document.getElementById('addGoal');
    const goalsList = document.getElementById('goalsList');

    // Load goals from localStorage when page loads
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    
    // Render existing goals
    renderGoals();

    // Add new goal
    addGoalBtn.addEventListener('click', addGoal);
    goalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addGoal();
        }
    });

    function addGoal() {
        const goalText = goalInput.value.trim();
        
        if (goalText !== '') {
            goals.push({
                id: Date.now(),
                text: goalText
            });
            
            // Save to localStorage
            localStorage.setItem('goals', JSON.stringify(goals));
            
            // Clear input
            goalInput.value = '';
            
            // Render updated goals
            renderGoals();
        }
    }

    function renderGoals() {
        goalsList.innerHTML = '';
        
        goals.forEach(goal => {
            const li = document.createElement('li');
            li.className = 'goal-item';
            
            li.innerHTML = `
                <span>${goal.text}</span>
                <button class="delete-btn" data-id="${goal.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            goalsList.appendChild(li);
        });

        // Add delete functionality to all delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const goalId = parseInt(e.target.closest('.delete-btn').dataset.id);
                deleteGoal(goalId);
            });
        });
    }

    function deleteGoal(goalId) {
        goals = goals.filter(goal => goal.id !== goalId);
        localStorage.setItem('goals', JSON.stringify(goals));
        renderGoals();
    }
});
