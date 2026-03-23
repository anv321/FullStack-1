// models/User.js
let usersCache = [];
let isInitialized = false;

class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    static init() {
        if (isInitialized) return;

        const defaultUser = new User(1, 'testuser', '$2a$10$0Diw5Az0CHfrXWUiQy/vo..75w9aQOWx140bxmkxVo/5fXG.IDYeW');
        usersCache.push(defaultUser);
        isInitialized = true;

        console.log(`Initialized ${usersCache.length} users in memory`);
    }

    static findAll() {
        if (!isInitialized) {
            throw new Error('User model not initialized. Call User.init() first.');
        }
        return [...usersCache]; 
    }

    static findByUsername(username) {
        if (!isInitialized) {
            throw new Error('User model not initialized. Call User.init() first.');
        }
        return usersCache.find(user => user.username === username);
    }

    static findById(id) {
        if (!isInitialized) {
            throw new Error('User model not initialized. Call User.init() first.');
        }
        return usersCache.find(user => user.id === id);
    }

    static save(user) {
        if (!isInitialized) {
            throw new Error('User model not initialized. Call User.init() first.');
        }

        const existingIndex = usersCache.findIndex(u => u.id === user.id);
        if (existingIndex >= 0) {
            usersCache[existingIndex] = user;
        } else {
            usersCache.push(user);
        }

        return user;
    }

    static create(username, password) {
        if (!isInitialized) {
            throw new Error('User model not initialized. Call User.init() first.');
        }

        const newId = usersCache.length > 0 ? Math.max(...usersCache.map(u => u.id)) + 1 : 1;
        const user = new User(newId, username, password);
        this.save(user);
        return user;
    }

    toPublicData() {
        return {
            id: this.id,
            username: this.username
        };
    }
}

export default User;
