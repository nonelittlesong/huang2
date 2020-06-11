import DefectionAPI from '../api/detection';

export const detections = {
    state: {
        totalOK: 0,
        totalNG: 0,
        pass: "WAITING...",
        itemID: "???"
    },

    getters: {
        getTotalOK: (state) => {
            return state.totalOK;
        },
        getTotalNG: (state) => {
            return state.totalNG;
        },
        getPass: (state) => {
            return state.pass;
        },
        getItemID: (state) => {
            return state.itemID;
        }
    },

    mutations: {
        increaseTotalOK(state) {
            state.totalOK++;
        },
        increaseTotalNG(state) {
            state.totalNG++;
        },
        setPass(state, pass) {
            state.pass = pass;
        },
        setTotalOK(state, totalOK) {
            state.totalOK = totalOK;
        },
        setTotalNG(state, totalNG) {
            state.totalNG = totalNG;
        },
        setItemID(state, itemID) {
            state.itemID = itemID;
        },
        showResult(state, payload) {
            state.itemID = payload.id;
            state.pass = payload.resultStr? "PASS" : "FAIL";
            state.totalOK = payload.totalOK;
            state.totalNG = payload.totalNG;
        }
    },

    actions: {
        loadResult({commit}) {
            DefectionAPI.getResult()
                .then(function (response) {
                    console.log(response.data);
                    commit('setPass', response.data.resultStr);
                    commit('setTotalOK', response.data.totalOK);
                    commit('setTotalNG', response.data.totalNG);
                    commit('setItemID', response.data.id);
                });

        }
    }
};