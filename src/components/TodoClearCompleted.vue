<template>
<button v-if="showClearCompletedButton" @click="clearCompleted"> 완료된 것 지우기</button>
</template>

<script>
export default {
    name : 'todo-clear-completed',
    computed : {
        showClearCompletedButton() {
            return this.$store.getters.showClearCompletedButton
        }
    },
    methods : {
        clearCompleted() {
            $this.$store.dispatch('clearCompleted')
            this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
        }
    }

}
</script>