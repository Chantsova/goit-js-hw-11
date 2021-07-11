const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {
    return new Promise((resolve, reject) => {
        const updatedUsers = allUsers.map(user => {
            if (user.name === userName) {
                resolve({ ...user, active: !user.active});
            }
        });
    });
}

const logger = updatedUsers => console.table(updatedUsers);

// /*
//  * Должно работать так
//  */
toggleUserState(users, 'Mango').then(logger);
toggleUserState(users, 'Lux').then(logger);