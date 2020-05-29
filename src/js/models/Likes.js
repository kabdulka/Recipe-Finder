export default class Likes {
    constructor() {
        this.likes = [];
    }
    
    addLike (id, title, author, img) {
        const like = {
            id, title, author, img
        };
        this.likes.push(like);
//        console.log("like is: " + like);
        return like;
    }
    
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }
    
    isLiked(id) {
        console.log("inside Base id is: " + id);
        console.log("testing for if is liked: " + this.likes.findIndex(el => el.id === id) !== -1);
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    
    getNumLikes() {
        return this.likes.length;
    }
}































