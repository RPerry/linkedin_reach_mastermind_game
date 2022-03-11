import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import playButton from './components/playButton.vue'
import startGame from './components/startGame.vue'
import gamePlay from './components/gamePlay.vue'


Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: playButton
	},
  {
    path: '/startGame',
    component: startGame
  },
  {
    path: '/gameplay',
    component: gamePlay
  }
];

const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
