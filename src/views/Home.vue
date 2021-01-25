<template>
  <div>
    <div class="content">
      <md-content>

        <md-table>
          <md-table-row>
            <md-table-head>Partition Key</md-table-head>
            <md-table-head>Sort Key</md-table-head>
            <md-table-head>Thing Name</md-table-head>
            <md-table-head>Thing Type</md-table-head>
            <md-table-head>Results</md-table-head>
          </md-table-row>
          <template v-for="row in things" >
            <md-table-row @click="getThing(row.thingId)" :key="row.partitionKey">
              <md-table-cell>{{row.partitionKey}}</md-table-cell>
              <md-table-cell>{{row.sortKey}}</md-table-cell>
              <md-table-cell>{{row.thingName}}</md-table-cell>
              <md-table-cell>{{row.thingType}}</md-table-cell>
              <md-table-cell>{{row.results}}</md-table-cell>
            </md-table-row>
          </template>
        </md-table>

        <div class="input">
          <md-field>
            <label>Thing Name</label>
            <md-input v-model="postData.thingName"></md-input>
          </md-field>
          <md-field>
            <label>Thing Type</label>
            <md-input v-model="postData.thingType"></md-input>
          </md-field>
          <md-button class="md-primary" @click="postThing">Create Thing</md-button>
        </div>
      </md-content>

    </div>
  </div>
</template>

<script>
import { Auth, } from 'aws-amplify';
export default {
  name: 'Home',
  props: {
    msg: String
  },
  data: function(){ 

    return {
      auth: Auth,
      user: {},
      username: null,
      session: {},
      authHeader: null,

      dataLoaded: false,
      things: [],
      thing: {},
      postData: {
        thingName: null,
        thingType: null,
      },
    }
  },
  async created(){
    this.user = await Auth.currentAuthenticatedUser();
    this.username = this.user.username;
    this.session = await Auth.currentSession();
    this.authHeader = `Bearer ${this.session.idToken.jwtToken}`;
    this.getData();
  }, 
  methods: {
    async getData(){
      await this.getThings();
      this.dataLoaded = true;
    },
    async getThings(){
      const headers = { "Content-Type": "application/json", "Authorization": this.authHeader};
      try {
        const response = await fetch("YOUR_URL_HERE/things", { headers });
        this.things = await response.json();
        this.dataLoaded = true;
      }
      catch(e){
        console.log(e);
        this.dataLoaded = true;
      }
    },
    async getThing(thingId){
      const headers = { "Content-Type": "application/json", "Authorization": this.authHeader};
      try {
        const response = await fetch(`YOUR_URL_HERE/things/${thingId}`, { headers });
        this.oneThing = await response.json();
      }
      catch(e){
        console.log(e);
      }
    },
    async postThing(){
      const headers = { "Content-Type": "application/json", "Authorization": this.authHeader};
      const response = await fetch("YOUR_URL_HERE/things", { 
        method: "POST",
        headers,
        body: JSON.stringify(this.postData),
      });
      await response.json();
      await this.getThings()
      // this.postData = data;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lange="scss" scoped>
  .md-card {
    width: 320px;
    margin: 12px;
    display: inline-block;
    vertical-align: top;
  }
  .form-margin {
    margin: 24px;
  }
  .content {
    margin: 48px;
  }
  .input {
    padding: 48px;
  }

</style>
