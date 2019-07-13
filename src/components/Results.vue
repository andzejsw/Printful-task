<template>
    <div class="results text-center h-100 d-flex align-items-center">
        <div class="container pt-4 pb-4">    
            <h1 class="mb-3">Thanks, {{name}}!</h1>
            <p v-if="results">You responded correctly to {{results.correct}} out of {{results.total}} questions.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Results',
    props: ['name', 'results'],
    data: function() {
        return {}
    },
    mounted() {  
        if(!this.results) {
            this.$router.push({ name: 'home'});
        }
    },
}
</script>
