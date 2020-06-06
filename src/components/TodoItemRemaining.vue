<template>
    <div>{{remaining}} 개가 남음 </div>
</template>

<script>
export default {
    name : 'todo-remaining',
    props : {
        remaining : {
            type : Number,
            required : true,

        }
    }

}
</script>