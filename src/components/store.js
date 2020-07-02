import { observable} from "mobx";

class MainStore {
    @observable token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVmNWI0NmJjYWVkOTdiN2NhZTE1MGY1In0sImlhdCI6MTU5MzcyNTU4MywiZXhwIjoxNTkzNzI5MTgzfQ.O2PHci9-RQOZEDuOoacloY5v65d-aQIRf-c8wTTDmpw"

    @observable users = []

    @observable user = {}

    @observable chosenDay = 0
}

const store = new MainStore()

export default store;