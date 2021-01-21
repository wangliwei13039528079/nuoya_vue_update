<template>
    <div id="editProduct">
        <van-field
        readonly
        clickable
        label="产品分类"
        :value="value"
        placeholder="请选择产品分类"
        @click="showPicker = true"
        />

        <van-popup v-model="showPicker" position="bottom">
        <van-picker
            show-toolbar
            :columns="columns"
            :default-index="index"
            @cancel="showPicker = false"
            @confirm="onConfirm"
        />
        </van-popup>
        <div class="con">
            <label for="">商品名称</label>
            <input type="text" placeholder="请输入商品名称" v-model="name">
        </div>
        <div class="con">
            <label for="">商品单价</label>
            <input type="number" placeholder="请输入商品单价" v-model="price">
        </div>
        <div class="con">
            <label for="">成本价</label>
            <input type="number" placeholder="请输入商品价" v-model="costprice">
        </div>
        <div class="con">
            <label for="">市场价</label>
            <input type="number" placeholder="请输入市场价" v-model="mktprice">
        </div>
        <div class="con">
            <label for="">库存量</label>
            <input type="number" placeholder="请输入库存量" v-model="stock">
        </div>
        <div class="upImg">
            <p>商品图片</p>
            <label for="img" v-if="!productImg">点击上传商品</label>
            
            <input type="file" @change="uploadImg" id="img" v-show="false">
            <div class="imgBox" v-if="productImg">
                <img :src="productImg" alt="">
            </div>
            <label for="img">上传商品图片</label>
            
        </div>
        
        <div class="introduce">
            <label for="">商品信息</label>
            <!-- <textarea name="" id="" cols="30" rows="10" placeholder="请输入商品信息" v-model="info"></textarea> -->
            <div class="rich-text-test">
                <vue-html5-editor :content="info" :height="400" @change="updateData"></vue-html5-editor>
            </div>
        </div>
        <div class="btn" @click="confirm">
            确定
        </div>
    </div>
</template>

<script>
import {host} from '../../common/serviceUrl'
export default {
    data() {
        return {
            name:'',
            price:'',
            costprice:'',
            mktprice:'',
            stock:'',
            productImg:'',
            imageId:'',
            info:'',
            goods_id:this.$route.query.id,
            value: '',
            showPicker: false,
            columns: [],
            classify:[],
            index:''
        };
    },
    created() {},
    mounted() {
        this.getProduct()
        this.getClassify()
    },
    methods: {
        getProduct(){
            let goods_id = this.goods_id
            this.$api.myCommodityDetail({goods_id},res=>{
                if(res.status){
                    this.name = res.data.name
                    this.price = res.data.price
                    this.costprice = res.data.costprice
                    this.mktprice = res.data.mktprice
                    this.stock = res.data.stock
                    this.imageId = res.data.image
                    this.productImg = res.data.image_id
                    this.info = res.data.text
                    this.catId = res.data.cat_id
                }
            })
        },
        uploadImg(){
            let image = document.getElementById('img').files[0]
            let data = new FormData()
            data.append('image',image,image.name)
            this.$api.merchantUploadFile(data,res=>{
                this.imageId = res.data
                this.productImg = host + res.data
            })
        },
        updateData(e = "") {
            let c1 = e.replace(/<img width="100%"/g, "<img");
            let c2 = c1.replace(/<img/g, '<img width="100%"');
            this.info = c2;
        },  
        confirm(){
            let name = this.name
            let price = this.price
            let costprice = this.costprice
            let mktprice = this.mktprice
            let stock = this.stock
            let text = this.info
            let image_id = this.imageId
            let goods_id = this.goods_id
            let cat_id = this.classify[this.index].id
            this.$api.uploadMerchant({name,price,costprice,mktprice,stock,text,image_id,goods_id,cat_id},res=>{
                if(res){
                    this.$dialog.toast({mes:res.msg,timeout:1000})
                }
                if(res.status) {
                    this.$router.replace({path:'/MyCommodity'})
                }

            })
        },
        getClassify(){
            this.$api.productClassify({},res=>{
                this.classify = res.data
                this.classify.forEach((item,index)=>{
                    this.columns.push(item.name)
                    if(item.id == this.catId){
                        this.value = item.name
                        this.index = index
                    }
                })
            })
        },
        onConfirm(value,index) {
            this.value = value;
            this.index = index
            this.showPicker = false;
        }
    },
};
</script>

<style lang="less" scoped>
    #editProduct {
        padding: 0 .3rem;
        font-size: .25rem;
        .con {
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
            
            border-bottom: 1px solid #1A202E;
            label {
                width:20%;
            }
            input {
                flex: 1;
                border: none;
            }
        }
        .introduce {
            label {
                display: block;
                padding: 10px 0;
            }
            textarea {
                width: 100%;
                background-color: #000;
                border: 1px solid #1A202E;
            }
        }
        .upImg {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #1A202E;
            align-items: center;
            p {
                width: 20%;
            }
            .imgBox {
                width: 200px;
                height: 200px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .btn {
            padding: 10px 0;
            text-align: center;
            background-color: #ef4f4f;
            margin: 10px 0;
        }
        .rich-text-test {
            background-color: #000;
            color: #fff;
        }
        .van-cell {
            background-color: #000;
            color: #fff;
            padding-left:0;
            padding-right: 0; 
            border-bottom: 1px solid #1A202E;
        }
        .van-cell:not(:last-child)::after {
            width: 0;
        }
        /deep/.van-field__label {
            max-width: 20%;
        }
        /deep/.van-field__control {
            color: #fff;
        }
    }

</style>
