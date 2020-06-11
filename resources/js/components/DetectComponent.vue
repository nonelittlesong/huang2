<template>
    <div class="container" style="background: #3F3F45;">

        <div class="row">

            <div class="col-md-4">
                <div class="metroblock buysblock">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pro-success"></use>
                    </svg>
                    <h1>{{ getTotalOK }}</h1>
                    <div class="clearfix"></div>
                    <h2>OK</h2>
                </div>
                <div class="metroblock commentsblock">
                    <svg class="icon">
                        <use xlink:href="#icon-pro-fail"></use>
                    </svg>
                    <h1>{{ getTotalNG }}</h1>
                    <div class="clearfix"></div>
                    <h2>NG</h2>
                </div>
            </div>

            <div class="col-md-8">
                <div class="itemID">ID: {{ getItemID }}</div>
                <div class="passFail" :style="{color: activeColor, fontSize: dynamicFontSize}">
                    {{ getPass }}
                </div>
            </div>

        </div>

    </div>


</template>

<script>
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {

        computed: {
            ...mapGetters([
                'getTotalOK',
                'getTotalNG',
                'getPass',
                'getItemID'
            ]),

            activeColor: function () {
                if (this.getPass === 'PASS') {
                    return 'rgb(39,183,121)';
                } else if (this.getPass === 'FAIL') {
                    return '#f44336';
                } else {
                    return '#aaa';
                }
            },

            dynamicFontSize: function () {
                if (this.getPass === 'PASS' || this.getPass === 'FAIL') {
                    return '20em';
                } else {
                    return '10em';
                }
            }
        },

        methods: {
            ...mapActions([
                'loadResult'
            ]),
            ...mapMutations([
                'showResult'
            ])

        },

        mounted() {
            window.Echo.channel('laravel_database_detection')
                .listen('Detection', (e) => {
                    console.log(e);
                    this.showResult(JSON.parse(e.detectionResult));
                });
        }
    }
</script>

<style>

    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        float: left;
    }

    .buysblock {
        background: rgb(39,183,121);
    }
    .commentsblock {
        background: #f44336;
    }

    .metroblock {
        width: 100%;
        padding: 0 1em 1em 1em;
        color: #fff;
        font-family: 'Open Sans', sans-serif;
        margin: 1em;
    }

    .metroblock h1, .metroblock h2, .metroblock .icon {
        font-weight: 300;
        margin: 0;
        padding: 0;
    }
    .metroblock h1, .metroblock .icon {
        font-size: 7em;
        text-align: center;
    }
    .metroblock .icon {
        margin-right: .2em;
    }

    .itemID {
        font-size: 2em;
        color: #eee;
        margin: calc(1em / 2);
    }
    .passFail {
        margin: .05em;
        line-height: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>