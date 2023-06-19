<template>
    <div>
        <h2 class="default-color">股票交易計算機</h2>

        <table>
            <tr>
                <td>
                    <label class="default-color" for="count-1">股數：</label><br>
                    <input type="number" id="count-1" v-model="count_1" v-on="restrictInput" @focus="enlargePage" @blur="restorePage">
                </td>
                <td>
                    <label class="default-color" for="count-2">張數：</label><br>
                    <input type="number" id="count-2" v-model="count_2" v-on="restrictInput" @focus="enlargePage" @blur="restorePage">
                </td>
            </tr>
            <tr>
                <td>
                    <label class="default-color" for="purchase-amount">買入金額：</label><br>
                    <input type="number" id="purchase-amount" v-model="purchaseAmount" v-on="restrictInput" @focus="enlargePage" @blur="restorePage">
                </td>
                <td>
                    <label class="default-color" for="sale-amount">賣出金額：</label><br>
                    <input type="number" id="sale-amount" v-model="saleAmount" v-on="restrictInput" @focus="enlargePage" @blur="restorePage">
                </td>
            </tr>
        </table>
        <br>

        <label class="default-color" for="half-tax">當沖&nbsp;</label>
        <input type="checkbox" id="half-tax" v-model="halfTax"> 
        <b class="default-color">&nbsp;|&nbsp;</b>
        <label class="default-color" for="discount">手續費折扣&nbsp;</label>
        <select id="discount" v-model="discount">
        <option v-for="discount in discounts" :value="discount.value" :key="discount.value">{{ discount.label }}</option>
        </select>
        <br><br>

        <button class="default-color" @click="calculateProfit">計算盈虧</button>
        <br>

        <div v-if="netProfit !== null">
            <p class="default-color">
                盈虧金額：<span :class="getColorClass(netProfit)">{{ netProfit }}</span>
            </p>
        </div>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
                count_1: 1000,
                count_2: 1,
                purchaseAmount: 0,
                saleAmount: 0,
                discount: 0.596,
                halfTax: false,
                netProfit: null,
                isEnlarged: false,
                discounts: [
                    { label: '無折扣', value: 0 },
                    { label: '9折', value: 0.1 },
                    { label: '8折', value: 0.2 },
                    { label: '7折', value: 0.3 },
                    { label: '6折', value: 0.4 },
                    { label: '5折', value: 0.5 },
                    { label: '4折', value: 0.6 },
                    { label: '3折', value: 0.7 },
                    { label: '2折', value: 0.8 },
                    { label: '1折', value: 0.9 },
                    { label: '4.04折(元大)', value: 0.596 },
                    { label: '3.5折(永豐)', value: 0.65 }
                ]
            };
        },
        methods: {
            calculateProfit() {
                // 未扣手續費收益
                const profit = (this.saleAmount - this.purchaseAmount) * this.count_1 * this.count_2;
                // 買入手續費
                const purchaseFee = Math.floor(Math.floor(this.purchaseAmount * this.count_1 * this.count_2 * 0.001425, 1) * (1 - this.discount), 1);
                // 賣出手續費
                const saleFee = Math.floor(Math.floor(this.saleAmount * this.count_1 * this.count_2 * 0.001425, 1) * (1 - this.discount), 1);
                // 證交稅 (非當沖: 0.3% / 當沖: 0.15%)
                const tax = Math.floor(this.saleAmount * this.count_1 * this.count_2 * (this.halfTax ? 0.0015 : 0.003));
                // 淨收益
                this.netProfit = (profit - purchaseFee - saleFee - tax);
            },
            restrictInput(event) {
                // 使用正則表達式檢查輸入是否為數字及小數點
                const regex = /^[0-9.]*$/;
                const input = event.target.value;

                if (!regex.test(input)) {
                    // 如果不符合條件，將輸入設置為前一次的合法值
                    event.target.value = this.inputValue;
                } else {
                    // 更新合法的輸入值
                    this.inputValue = input;
                }
            },
            enlargePage() {
                this.isEnlarged = true;
            },
            restorePage() {
                this.isEnlarged = false;
            }
        },
        computed: {
            getColorClass() {
                return function(netProfit) {
                    if (netProfit > 0) {
                        return 'positive-color'; // 正数的 CSS 类名
                    } else if (netProfit < 0) {
                        return 'negative-color'; // 负数的 CSS 类名
                    } else {
                        return 'default-color'; // 零的 CSS 类名，或者您可以返回其他默认样式
                    }
                };
            }
        }
    };
</script>

<style>
    .positive-color {
        color: rgb(85, 212, 85);
    }
    .negative-color {
        color: rgb(255, 66, 66);
    }
    .default-color {
        color: white;
    }
    .enlarged {
        zoom: 1.2; /* 放大比例，可以根據需要調整 */
        -moz-transform: scale(1.2); /* Firefox 支援 */
        -webkit-transform: scale(1.2); /* Chrome 和 Safari 支援 */
        transform: scale(1.2); /* 通用語法 */
        transition: transform 0.3s ease-in-out; /* 轉場動畫效果 */
    }
</style>