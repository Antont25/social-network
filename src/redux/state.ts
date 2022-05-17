import {render} from "../render";

export type DialogsType={
    id:number
    name:string
}
export type MassagesType={
    id:number
    message:string
}

export type DialogsPageType={
    dialogs:Array<DialogsType>
    massages:Array<MassagesType>
}

export type PostsType={
    id:number
    massage:string
    likes:number
}

export type PostPageType={
    posts:Array<PostsType>
    addPost?:(text:string)=>void

}

export type StoreType={
    postPage:PostPageType
    dialogsPage:DialogsPageType
    addPost?:(text:string)=>void
}
// export type StateAppType={
//     store:StateType
// }



export let store:StoreType={
            postPage: {
                posts: [
                    {id: 1, massage: "sacasc", likes: 4},
                    {id: 2, massage: "sacasc", likes: 4},
                    {id: 3, massage: "sacasc", likes: 4},
                    {id: 4, massage: "sacasc", likes: 4},
                ],
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

}



export const addPost=(text:string)=>{
    const newPost:PostsType={
        id:4,
        massage:text,
        likes:4
    }
    store.postPage.posts.push(newPost)
    render(store)
}