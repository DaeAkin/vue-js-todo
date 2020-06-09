<template>
    <div>{{remaining}} 개가 남음 </div>
</template>

<script>
export default {
    name : 'todo-remaining',
    computed : {
        remaining() {
            return this.$store.getters.remaining
        }
    }

}
</script>