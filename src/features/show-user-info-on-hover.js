import features from '../libs/features';
import {getUserInfo} from '../libs/api';

const init = () => {
    const allUsers = document.querySelectorAll('a.hnuser');
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    for (const user of allUsers) {
        const userDiv = document.createElement('div');
        userDiv.classList.add('__rhn__hover-user-info', '__rhn__no-display');
        userDiv.style.left = user.getBoundingClientRect().left + 'px';
        user.dataset['rhn_info_loaded'] = '0';
        
        userDiv.innerHTML = 'Loading...';
        user.parentElement.appendChild(userDiv);
        
        user.addEventListener('mouseover', async () => {
            userDiv.classList.remove('__rhn__no-display');
            if (user.dataset['rhn_info_loaded'] === '0') {
                user.dataset['rhn_info_loaded'] = '1';
                const userInfo = await getUserInfo(user.innerText);
                const userDate = new Date(userInfo.created * 1000);
                const renderedDate = `${monthNames[userDate.getMonth()]} ${userDate.getDate()}, ${userDate.getFullYear()}`;

                const table = `
                    <table>
                        <tbody>
                            <tr>
                                <td>user:</td>
                                <td>${userInfo.id}</td>
                            </tr>
                            <tr>
                                <td>created:</td>
                                <td>${renderedDate}</td>
                            </tr>
                            <tr>
                                <td>karma:</td>
                                <td>${userInfo.karma}</td>
                            </tr>
                            ${userInfo.about ? '<tr><td>about:</td><td>'+userInfo.about+'</td></tr>' : ''}
                        </tbody>
                    </table>
                `;
                userDiv.innerHTML = table;
            }
        });

        user.addEventListener('mouseout', () => {
            userDiv.classList.add('__rhn__no-display');
        })
    }
};

features.add({
    id: 'show-user-info-on-hover',
    pages: {
        include: ['*'],
        exclude: ['/user']
    },
    login_required: false,
    init: init
});

export default init;