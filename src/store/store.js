import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state : { 
        filter : 'all',
        todos : [
            {
              'id' : 1,
              'title' : 'Vue 끝내기',
              'completed' : false,
              'editing' : false
            },
                    {
              'id' : 2,
              'title' : '우헤헤헤헤',
              'completed' : false,
              'editing' : false
            },
    
          ]
        
    }
})