import uniqid from "uniqid";

export default class List {
    constructor() {
        // array of objects which has count, unit and ingredient
        this.items = [];
    }
    
    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }
    
    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1); // splice mutates the original array
    }
    
    updateCount(id, newCount) {
        // find element 
        this.items.find(el => el.id === id).count = newCount;
    }
}






































































































