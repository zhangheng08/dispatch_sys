<template>
    <div>
        <baidu-map :style="{ width: '100%', height: '450px' }" class="bm-view" :zoom="15"
            :center="{ lng: 116.404, lat: 39.915 }">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
                anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-driving :start="lushuPoint.start" :end="lushuPoint.end" :auto-viewport="true" :policy="policy"
                :panel="true" location="北京" :waypoints="['西二旗']">
            </bm-driving>
        </baidu-map>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const policy = ref('BMAP_DRIVING_POLICY_LEAST_TIME');

const lushuPoint = ref({
    start: {
        lng: 116.298488,
        lat: 39.872257
    },
    end: {
        lng: 116.330065,
        lat: 39.949641
    },
});

const leastDistance = () => {
    policy.value = "BMAP_DRIVING_POLICY_LEAST_DISTANCE"
};
const leastTime = () => {
    policy.value = "BMAP_DRIVING_POLICY_LEAST_TIME"
};

</script>

<style scoped>
.bm-view {}
</style>