<template>
  <div>
      <input type="text" class="todo-input" placeholder="뭘 해야 할까?" v-model="newTodo"
      @keyup.enter="addTodo">
      <transition-group name="fade" enter-active-class="animated fadeInUp"
       leave-active-class="animated fadeOutDown">
      <todo-item v-for="(todo) in todosFiltered" 
      v-bind:key="todo.id" :todo="todo" :checkAll="!anyRemaining">
      </todo-item>>
      </transition-group>
      <div class="extra-container">
       <todo-check-all></todo-check-all>
        <todo-item-remaining ></todo-item-remaining>
      </div>
      
      <div class="extra-container">
        <todo-filtered></todo-filtered>

        <div>
          <transition name="fade">
          <todo-clear-completed></todo-clear-completed>
          </transition>
        </div>
      </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemRemaining from './TodoItemRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'


export default {
  name: 'todo-list',
  components : {
    TodoItem,
    TodoItemRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted,
  },
  data () {
    return {
      newTodo : '',
      idForTodo : 3,
      beforeEditCache : '',
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
    }
  },
  created() {
    //이벤트 버스를 쓰면 형제들끼리 소통할 수 있음
    // eventBus.$on('removedTodo', (index) => this.removeTodo(index))
    // eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
    // eventBus.$on('checkAllChanged', (checked) => this.checkAllTodos(checked))
    // eventBus.$on('filterChanged', (filter) => this.$store.state.filter = filter)
    // eventBus.$on('clearCompletedTodos', () => this.clearCompleted())
  },
  beforeDestroy() {
    // eventBus.$off('removedTodo', (index) => this.removeTodo(index))
    // eventBus.$off('finishedEdit', (data) => this.finishedEdit(data))
    // eventBus.$off('checkAllChanged', (checked) => this.checkAllTodos(checked))
    // eventBus.$off('filterChanged', (filter) => this.$store.state.filter = filter)
    // eventBus.$off('clearCompletedTodos', () => this.clearCompleted())
  },

  created() {
    this.$store.dispatch('retrieveTodos')

  },
  // computed는 항상 return을 해야함.
  computed : {
    remaining() {
     return this.$store.getters.remaining
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining
    },
    todosFiltered() {
     return this.$store.getters.todosFiltered
    },
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton
    }
  },

  //method는 computed와 다르게 return이 필수가 아니다.
  methods : {
    addTodo() {
      if(this.newTodo.trim().length == 0) {
        return;
      }

      this.$store.dispatch('addTodo', {
        // id : this.idForTodo,
        title : this.newTodo,
      })

      // this.$store.state.todos.push({
      //   id : this.idForTodo,
      //   title : this.newTodo,
      //   completed : false
      // })

      this.newTodo = '';
      this.idForTodo++;
    },
    
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size : 18px;
    margin-bottom: 16px;

    &:focus {
      outline : 0;
    }
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color : black;
    }
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border : 1px solid white;
    margin-left : 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color : #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Arial, Helvetica, sans-serif;
  }


  .completed {
    text-decoration: line-through;
    color : grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }
  .fade-enter-active, .fade-leave-active {
    transition : opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
