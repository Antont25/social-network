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
    dispatch: (action: ActionTypeAddPost | ActionTypeNewPost) => void
}
export type PostType = {
    posts: Array<PostsType>
    newPostText: string
}

export type StateType = {
    postPage: PostType
    dialogsPage: DialogsPageType

}
export type StoreType = {
    state: StateType
    subscriber: (observer: () => void) => void
    render: () => void
    dispatch: (action: ActionTypeAddPost | ActionTypeNewPost) => void
}


export type ActionTypeAddPost = {
    type: 'ADD-POST'
}
export  type ActionTypeNewPost = {
    type: 'NEW-TEXT'
    newText: string
}

export const store: StoreType = {
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
    render() {
    },

    subscriber(observer: () => void) {
        this.render = observer
    },

    dispatch(action) {
        if (action.type === 'ADD-POST') {
            let newPost: PostsType = {
                id: 4,
                massage: this.state.postPage.newPostText,
                likes: 4
            }
            this.state.postPage.posts.push(newPost)
            this.render()
        } else if (action.type === 'NEW-TEXT') {
            this.state.postPage.newPostText = action.newText
            this.render()
        }
    }
}








