<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit" />
      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="{completed : completed}"
      >{{ title}}</div>
      <input
        v-else
        class="todo-item-edit"
        type="text"
        v-model="title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
      />
    </div>
    <div class="remove-item" @click="removeTodo(todo.id)">&times;</div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ""
    };
  },
  //watch는 props의 변경 상태를 감지한다.]
  watch: {
    //checkAll 의 prop을 감지
    checkAll() {
      //   if(this.checkAll) {
      //       this.completed = true
      //   } else {
      //       this.completed = this.todo.completed
      //   }
      this.completed = this.checkAll ? true : this.todo.completed;
    }
  },
  //사용자 지정 디렉티브. v-model과 v-show (기본 디렉티브)이외에도 사용자 정의 디렉티브를 등록할 수 있음.
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    removeTodo(id) {
    
      this.$store.dispatch('deleteTodo',this.id)
      
    //   this.$emit("removedTodo", index);
      // eventBus.$emit("removedTodo", index);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      this.$store.dispatch('updateTodo', {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing
      })
    //   this.$emit("finishedEdit", {
      //   eventBus.$emit("finishedEdit", {
      //   index: this.index,
      //   todo: {
      //     id: this.id,
      //     title: this.title,
      //     completed: this.completed,
      //     editing: this.editing
      //   }
      // });
    }, 
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    }
  }
};
</script>