<template>
    <div id="networks">
        <network style="height: 80vh;" ref="network"
                 :nodes="nodes"
                 :edges="edges"
                 :options="options">
        </network>
    </div>
</template>

<script>
import {Dialog, Toast} from 'vant'
import Vue from 'vue'
import { Network } from 'vue-vis-network'
// require('vis-network/dist/vis-network.min.css')

Vue.use(Dialog)
Vue.use(Toast)
Vue.component('network', Network)

export default {

    data () {
        return {
            options: {
                nodes: {
                    font: {
                        color: '#333' // 字体的颜色
                    },
                    borderWidth: 1,
                    color: {
                        border: 'white',
                        background: 'white' // 若是引用图标，背景颜色
                    }
                }
            },
            nodes: [],
            edges: [],
            network: null
        }
    },
    methods: {
        getNetwork () {
            this.$api.network({}, res => {
                if (res.status) {
                    this.nodes = res.data.nodes
                    this.edges = res.data.edges
                }
            })
        }
    },
    created () {
        this.getNetwork()
    }
}
</script>
@import "vue-vis-network/dist/vueVisNetwork.css"
<style scoped lang="less">

</style>
