<template>
    <div class="goodsnum">
        <div class="goodsnum-content">
            <div>数量</div>
            <yd-spinner :longpress="true" :max="stock" v-model="spinner"></yd-spinner>
            <div class="inventory">库存：{{ stock }} {{ unit }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            spinner: 1
        }
    },
    props: {
        stock: {
            type: [String, Number],
            require: true
        },
        unit: {
            type: String,
            default () {
                return ''
            }
        }
    },
    watch: {
        spinner () {
            this.$emit('num', this.spinner)
        }
    }
}
</script>

<style>
</style>
