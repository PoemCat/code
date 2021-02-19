// 饿汉式单例模式
class Singleton {
    static instance = new Singleton();

    static getInstance() {
        return this.instance;
    }
}

// 懒汉式单例模式
class Singleton2 {
    static instance = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new Singleton2()
        }
        return this.instance;
    }
}
