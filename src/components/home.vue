<template>
<div>
    <h2>这是Home页</h2>
    <el-button type='info' @click="exit">退出</el-button>
</div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        exit(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>

<style lang='less' scoped>

</style>