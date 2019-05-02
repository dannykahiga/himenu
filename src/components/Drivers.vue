<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-card class="card--flex-toolbar" style="box-shadow: none">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">
              <p>Order Number: {{ $route.params.order_number }}</p>
            </v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-text>
            <v-card class="elevation-1" v-if="!driver_found">
              <v-card-text>
                <p class="text-xs-center">WAITING FOR DRIVER</p>
                <div>
                  <v-layout align-center>
                    <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
                  </v-layout>
                </div>
                <small class="text-xs-center">Searching for drivers nearby...</small>
              </v-card-text>
            </v-card>

            <br>

            <v-card v-if="!driver_found" pa-4 elevation-1>
              <v-card-text>
                <p class="text-xs-left">Driver Found</p>
                <div>
                  <v-list-tile avatar @click>
                    <v-list-tile-avatar>
                      <v-icon class="light-blue white--text">person</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Jane Doe</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </div>
              </v-card-text>
            </v-card>

            <v-list two-line subheader>
              <v-subheader>Other Drivers</v-subheader>

              <v-list-tile avatar @click>
                <v-list-tile-avatar>
                  <v-icon class="light-blue white--text">person</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>Chris</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  drivers/delivery
                  <!-- <v-btn @click="$router.push('/hiorders/'+$route.params.menu_key+'/order/'+$route.params.orderid+'/drivers/drivery')" depressed round color="success">Assign</v-btn> -->
                  <v-btn
                    @click="$router.push('/menu/'+$route.params.menu_id+'/hiorders/'+$route.params.menu_key+'/order/'+$route.params.orderid+'/drivers/delivery')"
                    depressed
                    round
                    color="success"
                  >Assign</v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { db } from "../service/firebase";
export default {
  data() {
    return {
      menus: [],
      loading: false,
      search: null,
      select: null,
      driver_found: false,
      order_name: "",
      items: [
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Managu",
          subtitle: "Jan 9, 2014"
        },
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Ugali",
          subtitle: "Jan 17, 2014"
        },
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Chicken",
          subtitle: "Jan 28, 2014"
        }
      ]
    };
  },
  mounted() {
    let that = this;
    // var orderRef = db
    //   .ref("global_menus/" + this.$route.params.menu_key + "/orders")
    //   .orderByChild("order_number")
    //   .child(this.$route.params.orderid);
    // orderRef.orderByValue().on("child_added", data => {
    //   that.order_name = data.val().order_number;
    // });
    // orderRef.orderByValue().on("value", data => {
    //   that.order_name = data.val().order_number;
    // });
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.menus = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    }
  }
};
</script>
<style>
</style>
