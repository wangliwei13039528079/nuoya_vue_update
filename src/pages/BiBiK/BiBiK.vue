<template>
    <div>
        <div class="charts">
            <div class="right">
                <div id="myEchart" ref="myEcharts" style="height: 500px;width: 100%"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rawData: [
                    ['2016-12-12', 19.16, 19.25, 18.9, 19.65, 79.00, 1, 0.34, 0.28, 0.11],
                    ['2016-12-13', 19.09, 18.88, 18.81, 19.2, 24.00, 0, 0.27, 0.20, 0.06],
                    ['2016-12-14', 18.8, 18.82, 18.8, 19.14, 32.00, 0, 0.23, 0.13, 0.02],
                    ['2016-12-15', 18.73, 18.24, 18.2, 18.73, 36.00, 0, 0.13, 0.05, -0.01],
                    ['2016-12-16', 18.24, 18.18, 18.12, 18.4, 24.00, 0, 0.10, 0.02, -0.03],
                    ['2016-12-19', 18.15, 18.01, 17.93, 18.18, 24.00, 0, 0.06, -0.02, -0.05],
                    ['2016-12-20', 17.99, 17.79, 17.7, 17.99, 29.00, 1, 0.02, -0.05, -0.05],
                    ['2016-12-21', 17.83, 17.81, 17.77, 17.98, 30.00, 0, 0.00, -0.05, -0.06],
                    ['2016-12-22', 17.85, 17.72, 17.65, 17.85, 21.00, 0, -0.03, -0.07, -0.06],
                    ['2016-12-23', 17.77, 17.6, 17.54, 17.77, 18.00, 0, -0.04, -0.08, -0.05],
                    ['2016-12-26', 17.56, 17.75, 17.39, 17.77, 16.00, 0, -0.04, -0.07, -0.05],
                    ['2016-12-27', 17.73, 17.71, 17.65, 17.82, 10.00, 0, -0.06, -0.07, -0.04],
                    ['2016-12-28', 17.72, 17.62, 17.49, 17.77, 26.00, 0, -0.09, -0.07, -0.03],
                    ['2016-12-29', 17.6, 17.49, 17.43, 17.62, 28.00, 0, -0.09, -0.06, -0.02],
                    ['2016-12-30', 17.53, 17.6, 17.47, 17.61, 22.00, 0, -0.05, -0.03, -0.01],
                    ['2017-01-03', 17.6, 17.92, 17.57, 17.98, 28.00, 1, 0.00, 0.00, 0.00]
                ],
                kData:{},
                myEcharts: {},
                options:{

                }

            }
        },

        mounted() {
            this.kData = this.splitData(this.rawData)
            this.initCharts();
        },

        methods: {
            // 数据分割
            splitData(rawData) {
                var datas = [];
                var times = [];
                var vols = [];
                var macds = [];
                var difs = [];
                var deas = [];
                for (var i = 0; i < rawData.length; i++) {
                    datas.push(rawData[i]);
                    times.push(rawData[i].splice(0, 1)[0]);
                    vols.push(rawData[i][4]);
                    macds.push(rawData[i][6]);
                    difs.push(rawData[i][7]);
                    deas.push(rawData[i][8]);
                }
                return {
                    datas: datas,
                    times: times,
                    vols: vols,
                    macds: macds,
                    difs: difs,
                    deas: deas
                };

            },
            //MA计算公式
            calculateMA(dayCount) {
                var result = [];
                for (var i = 0, len = this.rawData.times.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += this.rawData.datas[i - j][1];
                    }
                    result.push((sum / dayCount).toFixed(2));
                }
                return result;
            },
            initCharts() {
                this.myEcharts = this.$echarts.init(this.$refs.myEcharts);
                //this.myEcharts.setOption(this.optionsData)
            },


        },

        watch: {
        }
    }
</script>

<style scoped>

</style>
