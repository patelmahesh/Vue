import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/pages/Index'
import Service from '@/pages/Service'
import SubService from '@/pages/SubService'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index

        }, {
            name: 'Service',
            path: '/service',
            component: Service,
        }, {
            name: 'Sub Service',
            path: '/subservice',
            component: SubService,
        }
    ]
})