<template>
  <div id="language">
    <HeaderTop :title="$i18n.t('language')">
      <a class="back" @click="$router.back()" slot="left">
                        <i class="iconfont iconfanhui"></i>

      </a>
    </HeaderTop>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="中文" clickable @click="radio = 'zh'">
          <van-radio name="zh" />
        </van-cell>
        <van-cell title="English" clickable @click="radio = 'zh'">
          <van-radio name="en" />
        </van-cell>
        <!-- <van-cell title="한국어" clickable @click="radio = 'zh'">
          <van-radio name="ko" />
        </van-cell>
        <van-cell title="日本語" clickable @click="radio = 'zh'">
          <van-radio name="ja" />
        </van-cell>
        <van-cell title="Français" clickable @click="radio = 'zh'">
          <van-radio name="fr" />
        </van-cell> -->
      </van-cell-group>
    </van-radio-group>
  </div>
</template>
<script>
import Vue from "vue";
import { Cell, CellGroup } from "vant";
Vue.use(Cell).use(CellGroup);
import { RadioGroup, Radio } from "vant";
Vue.use(RadioGroup);
Vue.use(Radio);
import { Toast } from 'vant';

Vue.use(Toast);

import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  data() {
    return {
      radio: ""
    };
  },

  mounted() {
    this.radio = localStorage.getItem("language");
  },

  methods: {},
  components: {
    HeaderTop
  },
  watch: {
    radio(newVal, oldVal) {
      if(newVal=='zh'){
        // console.log(newVal);
      localStorage.setItem("language", newVal);
      this.$i18n.locale = newVal;
      }else{
          Toast('自动检查您的所属区域为中国，将启用中文系统')
      }
      
    }
  }
};
</script>
<style lang="less" scoped>
#language {
  height: 100%;
  padding-top: 50px;
  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  .van-cell-group,
  .van-cell {
    background: rgba(0, 0, 0, 0);
  }
  .van-cell {
    color: #fff !important;
  }
}
</style>
