<template>
<button v-if="showClearCompletedButton" @click="clearCompleted"> 완료된 것 지우기</button>
</template>

<script>
export default {
    name : 'todo-clear-completed',
    props : {
        showClearCompletedButton : {
            type : Boolean,
            required : true,
        }
    },
    methods : {
        clearCompleted() {
            eventBus.$emit('clearCompletedTodos')
        }
    }

}
</script>