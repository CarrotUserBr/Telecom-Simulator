let listClient = []

class Client {
    constructor(id, name, age, gender, wealthLevel, satisfaction, desiredSpeed, difficulty, description) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.wealthLevel = wealthLevel;
        this.satisfaction = satisfaction;
        this.desiredSpeed = desiredSpeed;
        this.difficulty = difficulty;
        this.description = description;
    }
}

export default {
    listClient
}
