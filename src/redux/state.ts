export type DialogsType = {
    id: number
    name: string
}
export type MassagesType = {
    id: number
    message: string
}

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    massages: Array<MassagesType>
}

export type PostsType = {
    id: number
    massage: string
    likes: number
}

export type PostPageType = {
    posts: Array<PostsType>
    newPostText: string
    addPost?: (text: string) => void
    changeNewPostText?: (text: string) => void

}

export type StateType = {
    postPage: PostPageType
    dialogsPage: DialogsPageType
}
export type StoreType = {
    state: StateType
    addPost: () => void
    changeNewPostText: (text: string) => void
    subscriber:(observer: () => void)=>void
    render:()=>void
}

export const store:StoreType = {
    state: {
        postPage: {
            posts: [
                {id: 1, massage: "sacasc", likes: 4},
                {id: 2, massage: "sacasc", likes: 4},
                {id: 3, massage: "sacasc", likes: 4},
                {id: 4, massage: "sacasc", likes: 4},
            ],
            newPostText: 'a'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Amdrey'},
                {id: 2, name: 'Any'}
            ],
            massages: [
                {id: 1, message: 'yoooo'},
                {id: 1, message: 'ysss'},
            ]
        }

    },
    render(){},
    addPost() {
        const newPost: PostsType = {
            id: 4,
            massage: this.state.postPage.newPostText,
            likes: 4
        }
        this.state.postPage.posts.push(newPost)
        this.render()
    },
    changeNewPostText(text: string) {
        this.state.postPage.newPostText = text
        this.render()

    },
    subscriber(observer: () => void) {
       this.render= observer
    }
}






