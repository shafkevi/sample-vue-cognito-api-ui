<template>
  <div class="page-container md-layout-column" id="app" :style="`background-color:${color}`">
    Color: {{color}}
    <amplify-authenticator v-if="authState!='signedin'">
      <amplify-sign-in header-text="Log in to manage your things!" slot="sign-in"></amplify-sign-in>
    </amplify-authenticator>

    <template v-if="authState==='signedin'">
      <md-toolbar class="md-primary white">
        <md-button class="md-icon-button white" @click="showNavigation = true">
          <md-icon class="white">menu</md-icon>
        </md-button>
        <span @click="$router.push('/')" class="pointer md-title white">My Things</span>

        <!-- <div class="md-toolbar-section-end">
          <md-button @click="showSidepanel = true">Search</md-button>
        </div> -->
      </md-toolbar>

      <md-drawer :md-active.sync="showNavigation" md-swipeable>
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">Things</span>
        </md-toolbar>

        <md-list>

          <md-list-item @click="signOut" >
            <md-icon>no_meeting_room</md-icon>
            <span class="md-list-item-text">
              Sign Out
            </span>
          </md-list-item>

        </md-list>
      </md-drawer>

      <router-view/>
    </template>


  </div>
</template><script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
export default {
  name: "App",
  created() {
    this.color = process.env.VUE_APP_COLOR;
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    })
  },
  methods: {
    async signOut(){
      await Auth.signOut();
    }
  }, 
  data() {
    return {
      color: undefined,
      user: undefined,
      authState: undefined,
      showSidepanel: false,
      showNavigation: false,
    }
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  }
};
</script>
<style scoped>
.page-container {
  min-height: 300px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, .12);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.pointer {
  cursor: pointer
}
.white {
  color:white !important;
}
</style>