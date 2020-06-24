import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'


Vue.use(Vuex)
// axios.defaults.baseURL = "http://localhost:7811"

export const store = new Vuex.Store({

    state : { 
        token : localStorage.getItem('access_token') || null,
        filter : 'all',
        todos : [
            // {
            //   'id' : 1,
            //   'title' : 'Vue 끝내기',
            //   'completed' : false,
            //   'editing' : false
            // },
            //         {
            //   'id' : 2,
            //   'title' : '우헤헤헤헤',
            //   'completed' : false,
            //   'editing' : false
            // },
    
          ]
        
    },
    getters : {
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length
           },
           anyRemaining(state,getters) {
             return getters.remaining != 0
           },
           todosFiltered(state) {
             if(state.filter == 'all'){
               return state.todos
             } else if (state.filter == 'active') {
               return state.todos.filter(todo => !todo.completed)
             } else if (state.filter == 'completed') {
               return state.todos.filter(todo => todo.completed)
             }
             return state.todos;
           },
           showClearCompletedButton(state) {
             return state.todos.filter(todo => todo.completed).length > 0
           }
    },
    mutations : {
        addTodo(state,todo) {
            console.log('pushed data :', todo)
            state.todos.push({
                id : todo.id,
                title : todo.title,
                completed : false,
                editing : false,
            })
        },
        updateTodo(state,todo) {
             const index = state.todos.findIndex(item => item.id == todo.id);
                state.todos.splice(index,1 , {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing
            })
        },
        deleteTodo(state,id) {
        
            console.log('id :' + id)
            const index = state.todos.findIndex(item => item.id == id);
            console.log('index :' + index)
            state.todos.splice(index,1);
            
        },
        checkAll(state,checked) {
            state.todos.forEach((todo) => todo.completed = checked)
        },
        updateFilter(state,filter) {
            state.filter = filter;
        },
        clearCompleted(state) {
            axios.get('/todos/1')
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
            state.todos = state.todos.filter(todo => !todo.completed);
        },
        retrieveTodos(state,todos) {
            state.todos = todos
        },
        retrieveToken(state,token) {
            state.token = token
        },
    },
    // 밑에 애는 async를 지원하는듯. 쓰는 쪽은 dispatch를 사용 
    //TODO : mapAction에 대해 알아보기
    actions : {
        retrieveToken(context,credentials) {

            return new Promise((resolve,reject) => {
            const data = qs.stringify({
                username : credentials.username,
                password : credentials.password,
                grant_type : 'password'
            })

            const headers = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic Y2xpZW50aWQ6cHdk'
                }
            }
            axios.post('/oauth/token',data,headers)
            .then(response => {
                const token = response.data.access_token;
                localStorage.setItem('access_token',token)
                context.commit('retrieveToken',token)
                //부모(Login.Vue)에게 이 post 요청이 성공했는지 실패했는지 알려줌
                resolve(response)
            })
            .catch(error => {
                alert("아이디나 비밀번호가 틀립니다.")
                console.log(error)
                reject(error)
            })
        })
    },
        retrieveTodos(context) {
            axios.get('/api/todos?skip=0&limit=100')
            .then(response => {
                context.commit('retrieveTodos',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        addTodo(context,todo) {
            axios.post('/api/todos',{
                title : todo.title,
                completed : false,
            })
            .then(response => {
                context.commit('addTodo',response.data)
            })
            .catch(error => {
                console.log(error)
            })
            
        },
        updateTodo(context,todo) {
            axios.put('/api/todos/' + todo.id,{
                title : todo.title,
                completed : todo.completed,
            })
            .then(response => {
                context.commit('updateTodo',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        deleteTodo(context,id) {
            axios.delete('/api/todos/' + id,{
            })
            .then(response => {
                context.commit('deleteTodo',id)
            })
            .catch(error => {
                console.log(error)
            })
        
        },
        checkAll(context,checked) {
            axios.put('/api/todos/checkAll',{
                completed : checked,
            })
            .then(response => {
                context.commit('checkAll',checked)
            })
            .catch(error => {
                console.log(error)
            })
            
        },
        updateFilter(context,filter) {
            context.commit('updateFilter',filter)
        },
        clearCompleted(context) {
            const completed = context.state.todos
            .filter(todo => todo.completed)
            .map(todo => todo.id)

            axios.delete('/api/todos/deleteCompleted',{
                data : {
                    todos : completed
                }
            })
            .then(response => {
                context.commit('clearCompleted')
            })
            .catch(error => {
                console.log(error)
            })
            
        }
    },
    
})