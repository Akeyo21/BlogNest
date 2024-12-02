import { create } from 'zustand'

const useStore = create((set) => ({
    blogs: [],
    setBlogs: (blogs) => set({blogs}), //store all blogs

    loggedInUser: '' || localStorage.getItem('loggedInUser'),
    setLoggedInUser: (user) => {
        set({loggedInUser: user}),
        localStorage.setItem('loggedInUser', user)
    },

    accessToken: '' || localStorage.getItem('accessToken'),
    setAccessToken: (token) => {
        set({accessToken: token}),
        localStorage.setItem('accessToken', token)
    }
}))

export default useStore;