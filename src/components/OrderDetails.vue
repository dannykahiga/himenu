<template>
  <v-container class="hide-overflow" style="position: relative;">
    <v-toolbar
      absolute
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      dark
      flat
      color="primary"
    >
      <v-btn icon flat @click="$router.go(-1)">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <!-- <v-btn icon flat @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>
      </v-btn>-->
      <v-toolbar-title>Order Items</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card
      id="scrolling-techniques"
      class="scroll-y"
      style="height: 100vh;box-shadow: none; background: #f2f2f2; padding-top: 10vh"
    >
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <v-layout row>
            <v-flex xs12>
              <v-card style="box-shadow: none">
                <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 mt-0>
          <v-card class="card--flex-toolbar" style="box-shadow: none">
            <v-toolbar card prominent>
              <v-toolbar-title class="body-2 grey--text">
                <!-- <p>{{ $route.params.menu_key }}</p> -->
                <p>ORDER: {{ order_name }}</p>
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <div v-if="success_message">
              <v-card flat dark color="green">
                <v-card-text class>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex text-left>
                        <v-layout row wrap>
                          <v-icon large color="white">done_outline</v-icon>
                          <h3>Order Completed</h3>
                        </v-layout>
                      </v-flex>

                      <!-- <v-flex style="width: 400px;">
                        <v-layout row wrap>
                                <v-text-field
                            v-model="email"
                            :rules="[rules.required, rules.email]"
                            label="E-mail"
                            outline
                            clearable
                          ></v-text-field>

                          <v-btn depressed large round color="light-green" darken-2 @click>
                            Send Email
                            <v-icon dark right>email</v-icon>
                          </v-btn>

                        </v-layout>
                      </v-flex>-->
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </div>
<!--
            <div v-if="success_message && delivery">
              <v-card flat dark color="light-blue">
                <v-card-text class>
                  <v-container grid-list text-xs-left>
                    <v-layout row xs12 wrap>
                      <v-icon large color="white">help_outline</v-icon>
                      <h3>Assign a driver</h3>
                      <v-flex text-xs-right>
                        <v-btn
                          depressed
                          large
                          round
                          color="blue"
                          dark
                          @click="$router.push('/menu/'+$route.params.menu_id+'/hiorders/order/'+$route.params.orderid+'/drivers')"
                        >
                          Confirm
                          <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </div> -->

            <v-card-text>
              <v-layout align-center v-if="!hide_buttons">
                <v-dialog v-model="dialog" persistent max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-layout row wrap>
                      <v-flex xs12 sm6 text-center>
                        <div>
                          <v-btn
                            @click="$router.push('/menu/'+$route.params.menu_id+'/hiorders/order/'+$route.params.order_number+'/'+$route.params.orderid+'/receipt')"
                            round
                            depressed
                            large
                            color="success"
                          >Issue Receipt</v-btn>
                        </div>
                      </v-flex>
                      <v-flex xs12 sm6 text-center>
                        <div>
                          <v-btn round depressed large color="primary">Issue Refund</v-btn>
                        </div>
                      </v-flex>
                    </v-layout>
                  </template>
                </v-dialog>
              </v-layout>

              <v-list two-line subheader>
                <v-subheader>PAYMENT DETAILS</v-subheader>

                <v-list-tile avatar @click>
                  <v-list-tile-avatar>
                    <v-icon class="light-blue white--text">call_to_action</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Receipt</v-list-tile-title>
                    <v-list-tile-sub-title>MPESA</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-title>KES: {{ order_amount }}</v-list-tile-title>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-list two-line subheader>
                <v-subheader>ITEMS</v-subheader>

                <v-list-tile v-for="(item, index) in items" :key="index['.key']" avatar @click>
                  <v-list-tile-avatar>
                    <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.item_name }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.created_at }}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-title>KES: {{ item.item_amount}}</v-list-tile-title>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import { db, ordersRef } from "../service/firebase";
export default {
  //   mounted() {
  //   console.log("Component Mounted");

  // },

  data() {
    return {
      dialog: false,
      menus: [],
      states: ["Gardens Falls", "Edlina", "Choma Zone", "Kisumu Ndogo"],
      loading: false,
      search: null,
      select: null,
      order_name: "",
      order_key: "",
      order_type: "",
      order_amount: "",
      order_status: "",
      items: [],
      delivery: false,
      show_dialog: false,
      success_message: false,
      hide_buttons: false,

      snackbar: false,
      color: "",
      mode: "",
      timeout: 6000,
      text: "",

      email: "",
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length <= 20 || "Max 20 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  computed: {
    showMessage: {
      get() {
        this.success_message = true;
        this.hide_buttons = true;

        // $router.push('/menu/'+$route.params.menu_id+'/report')

        if (this.delivery == true) {
          console.log("Delivery");
        } else {
          console.log("Inhouse");
          this.order_status = "Completed";
          // this.changeOrderStatus(this.$route.params.orderid);
        }
      },
      set() {}
    }
  },
  mounted() {
    let that = this;



    console.log("Order ID: " + that.$route.params.orderid);
    var orderRef = db
      .ref("global_menus/" + that.$route.params.menu_id + "/orders")
      .child(this.$route.params.orderid);
    orderRef.orderByValue().on("child_added", data => {
      that.order_name = data.val().order_number;
      that.order_type = data.val().order_type;
      that.order_amount = data.val().amount;
    });
    orderRef.orderByValue().on("value", data => {
      that.order_name = data.val().order_number;
      that.order_type = data.val().order_type;
      that.order_amount = data.val().amount;
      that.order_status = data.val().status
      if (that.order_type == "Delivery") {
        that.delivery = true;
      }
    });

      if (that.order_status == "Completed"){
      that.success_message = true;
      that.hide_buttons = true;
      that.delivery = false
    }else {
      that.success_message = false;
      that.hide_buttons = false;
    }

    var item_obj = {};

    that.items = [];

    var itemsRef = db.ref(
      "global_menus/" + that.$route.params.menu_id + "/items"
    );
    itemsRef
      .orderByChild("order_number")
      .equalTo(that.order_name)
      .on("value", data => {
        data.forEach(data => {
          item_obj = {
            icon: "folder",
            iconClass: "primary lighten-1 white--text",
            item_name: data.val().item_name,
            item_amount: data.val().item_amount,
            order_number: data.val().order_number,
            created_at: data.val().created_at
          };
          that.items.push(item_obj);
        });
      });
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
    },
    changeOrderStatus(key) {
      let vm = this;
      db.ref("global_menus/" + vm.$route.params.menu_id + "/orders/" + key)
        .update({
          status: vm.order_status
        })
        .then(
          (this.text = "Order Updated"),
          ((this.color = "success"), (this.snackbar = true))
        );
    },
  }
};
</script>
<style>
</style>
