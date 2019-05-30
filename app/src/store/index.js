import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://localhost:9090/notification';

export const store = new Vuex.Store({
    state: {
        services: [],
        service: {
            id: "",
            name: "",
            helpPhone: "",
            helpURL: ""
        },
    },
    mutations: {
        GET_SERVICES(state, services) {
            state.services = services
        },
        ADD_SERVICE(state, service) {
            const index = state.services.findIndex((e) => e.id === service.id);

            if (index === -1) {
                state.services.push(service);
            } else {
                state.services[index] = service;
            }
        },
        EDIT_SERVICE(state, service) {
            state.service = service
        },
        REMOVE_SERVICE(state, service) {
            state.services.splice(state.services.indexOf(service), 1)
        },
        CLEAR_SERVICE(state) {
            state.service = {}
        }
    },
    actions: {
        getServices({ commit }) {
            const url = API_URL + '/getAllService/';
            axios.get(url).then(response => commit('GET_SERVICES', response.data))
        },
        addService({ commit, state }) {
            const url = API_URL + '/service/';
            axios.post(url, state.service).then(response =>
                commit('ADD_SERVICE', response.data)
            );
        },
        editService({ commit }, service) {
            commit('EDIT_SERVICE', service)
        },
        deleteService({ commit }, service) {
            const url = API_URL + '/deleteService/' + service.id;
            axios.get(url).then(commit('REMOVE_SERVICE', service))
        },
        clearService({ commit }) {
            commit('CLEAR_SERVICE')
        },

    },
    getters: {
        service: state => state.service,
        services: state => state.services,
    }

})