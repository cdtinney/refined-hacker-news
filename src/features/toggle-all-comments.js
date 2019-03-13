import features from '../libs/features';
import {getTopLevelComments} from '../libs/utils';

const init = () => {
    const target = document.querySelector('table.fatitem > tbody');

    const row = document.createElement('tr');
    const leftCell = document.createElement('td');
    const rightCell = document.createElement('td');
    leftCell.setAttribute('colspan', '2');

    const toggleAllBtn = document.createElement('a');
    toggleAllBtn.classList.add('__rhn__toggle-btn');
    toggleAllBtn.innerHTML = 'toggle all comments';
    toggleAllBtn.href = 'javascript:void(0)';
    
    toggleAllBtn.addEventListener('click', () => {
        const topLevelComments = getTopLevelComments();
        for (const comment of topLevelComments) {
            comment.querySelector('a.togg').click();
        }
    });

    rightCell.appendChild(toggleAllBtn);
    row.appendChild(leftCell);
    row.appendChild(rightCell);
    target.appendChild(row);
}

features.add({
    id: 'toggle-all-comments',
    pages: {
        include: ['/item'],
        exclude: []
    },
    login_required: false,
    init: init
});

export default init;