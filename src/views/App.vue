<template>
     <router-view></router-view>
</template>

<script>
    export default {
    	watch:{
        	'$route':function(to,from){
        		document.body.scrollTop = '0';
        	}
        }
    }
</script>

<style scoped>

</style>