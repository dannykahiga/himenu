<template>
  <v-container class="hide-overflow" style="position: relative; padding: 0% !important">
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
      <v-toolbar-title>HiOrders</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="shown-sm-and-down">
        <router-link to></router-link>
        <v-btn
          flat
          color="white"
          @click="$router.push('/menu/'+$route.params.menu_id+'/hiorders/orders/stats')"
        >
          Orders List
          <v-icon right dark>list</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card
      id="scrolling-techniques"
      class="scroll-y"
      style="height: 100vh;box-shadow: none; background: #f2f2f2; padding-top: 10vh"
    >
      <v-layout row wrap>
        <v-dialog v-model="dialog_add_order" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <!-- <v-toolbar px-4>
              <v-toolbar-title class="shown-sm-and-down">HiOrders</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items class="shown-sm-and-down">
                <router-link to></router-link>
                <v-btn flat color="primary" on="on">
                  Add New Order
                  <v-icon right dark>cloud_upload</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>-->
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">New Order</span>
            </v-card-title>
            <v-card-text>
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

                  <v-divider></v-divider>

                  <!-- <v-stepper-step step="3">Name of step 3</v-stepper-step> -->
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card class="mb-5" color>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              label="Order Number*"
                              required
                              v-model="newOrder.order_number"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              label="Order Type"
                              hint="example of helper text only on focus"
                              v-model="newOrder.order_type"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              label="Number of Items"
                              hint="example of persistent helper text"
                              persistent-hint
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="Amount" v-model="newOrder.amount" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-select
                              :items="menus"
                              item-text="name"
                              item-value="code"
                              label="Menu"
                              required
                              v-model="menu_code"
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-select
                              :items="['Pending']"
                              label="Status"
                              required
                              v-model="newOrder.status"
                            ></v-select>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>

                    <v-btn color="primary" @click="e1 = 2">Continue</v-btn>

                    <v-btn flat>Cancel</v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-card class="mb-5" color height="200px">
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Item Name*" required v-model="newItem.item_name"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              label="Amount"
                              hint="example of helper text only on focus"
                              v-model="newItem.item_amount"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>

                    <v-btn flat>Cancel</v-btn>
                  </v-stepper-content>

                  <!-- <v-stepper-content step="3">
                    <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>

                    <v-btn color="primary" @click="e1 = 1">Continue</v-btn>

                    <v-btn flat>Cancel</v-btn>
                  </v-stepper-content>-->
                </v-stepper-items>
              </v-stepper>

              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" outline @click="dialog_add_order = false">Close</v-btn>
              <v-btn
                color="green darken-1"
                outline
                @click="dialog_add_order = true + addNewOrder()"
              >Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

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
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs12 sm12 md12 lg12>
            <v-toolbar style="box-shadow: none">
              <!-- <v-toolbar-title>Activity</v-toolbar-title> -->
              <v-layout row wrap>
                <!-- <v-autocomplete
                  v-model="menu_code"
                  :loading="loading"
                  item-text="name"
                  item-value="code"
                  :items="menus"
                  :search-input.sync="search"
                  cache-items
                  class="mx-3"
                  flat
                  hide-no-data
                  hide-details
                  label="Select or search Menu"
                  solo
                >
                  <template v-slot:item="data">
                    <template>
                      <v-list-tile-avatar>
                        <img :src="data.item.thumb_logo">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.code"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>-->

                <v-autocomplete
                  v-model="order_type"
                  :loading="loading_type"
                  item-text="order_type"
                  item-value="order_type"
                  :items="orders"
                  :search-input.sync="search_order_type"
                  cache-items
                  class="mx-3"
                  flat
                  hide-no-data
                  hide-details
                  label="Select/search order by type"
                  solo
                ></v-autocomplete>
              </v-layout>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-list two-line subheader>
              <v-subheader>Pending Orders</v-subheader>
              <v-autocomplete
                v-model="order_name"
                item-text="order_number"
                :items="orders"
                label="Select/Search Order"
                :search-input.sync="search2"
                :loading="loading2"
                cache-items
                clearable
                class="mx-3"
                flat
                hide-no-data
                hide-details
                solo
              ></v-autocomplete>
              <div>
                <v-list-tile
                  v-for="(order, index) in orders"
                  :key="index['.key']"
                  avatar
                  @click="$router.push('/menu/'+$route.params.menu_id+'/hiorders/order/'+order.order_number+'/'+order.key) + sendData(order.key)"
                >
                  <v-list-tile-avatar>
                    <v-icon :class="[order.iconClass]">{{ order.icon }}</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ order.order_number }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ order.order_type }}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-title>KES: {{ order.order_amount }}</v-list-tile-title>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-dialog v-model="dialog_add_order2" persistent max-width="600px">
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on" flat icon color="green" @click="editOrder(order.key)">
                          <v-icon>edit</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Update Order</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-flex xs12 sm6 md6>
                                <v-text-field
                                  label="Order Number*"
                                  required
                                  v-model="newOrder.order_number"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md6>
                                <v-text-field
                                  label="Order Type"
                                  hint="example of helper text only on focus"
                                  v-model="newOrder.order_type"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                <v-text-field
                                  label="Number of Items"
                                  hint="example of persistent helper text"
                                  persistent-hint
                                  required
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12>
                                <v-text-field label="Amount" v-model="newOrder.amount" required></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6>
                                <v-select
                                  :items="menus"
                                  item-text="name"
                                  item-value="code"
                                  label="Menu"
                                  required
                                  v-model="menu_code"
                                ></v-select>
                              </v-flex>
                              <v-flex xs12 sm6>
                                <v-select
                                  :items="['Pending']"
                                  label="Status"
                                  required
                                  v-model="newOrder.status"
                                ></v-select>
                              </v-flex>
                            </v-layout>
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="red darken-1"
                            outline
                            @click="dialog_add_order2 = false"
                          >Close</v-btn>
                          <v-btn
                            color="green darken-1"
                            outline
                            @click="dialog_add_order2 = false + UpdateOrder(order.key)"
                          >Update</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-btn flat icon color="red" @click="deleteOrder(order.key)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </div>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import { db, ordersRef, auth, code } from "../service/firebase";
import firebase from "../service/firebase";
import { functions } from "firebase";
import orderDetails from "./OrderDetails";
export default {
  components: {
    orderDetails
  },
  firebase: {
    menus: db.ref("global_menus")
  },
  computed: {},
  data() {
    return {
      order_name: "",
      snackbar: false,
      color: "",
      mode: "",
      timeout: 6000,
      text: "",
      dialog: false,
      dialog_add_order: false,
      dialog_add_order2: false,
      menus: [],
      states: ["Gardens Falls", "Edlina", "Choma Zone", "Kisumu Ndogo"],
      loading: false,
      loading2: false,
      search: null,
      search2: null,
      select: null,
      e1: 0,
      notifications: false,
      sound: true,
      widgets: false,
      selected_code: null,
      menu_code: null,
      user_id: "",
      show_orders: true,
      all_orders: "",
      order_status: "",
      loading_status: "",
      search_order_status: null,

      order_type: "",
      loading_type: "",
      order_type: "",
      search_order_type: "",

      orders: [
        // {
        //   icon: "folder",
        //   iconClass: "grey lighten-1 white--text",
        //   order_number: "",
        //   order_type: ""
        // }
      ],
      newOrder: {
        order_number: "",
        order_type: "",
        amount: "",
        status: ""
      },
      newItem: {
        item_name: "",
        item_amount: "",
        order_number: "",
        order_id: ""
      },
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
      ],
      items2: [
        {
          id: 1,
          icon: "accessible",
          iconClass: "red white--text",
          title: "ORDER #123",
          subtitle: "Delivery"
          // url: "orders/order_details"
        },
        {
          id: 2,
          icon: "local_cafe",
          iconClass: "amber white--text",
          title: "ORDER #232",
          subtitle: "inhouse"
        }
      ],
      search: ""
    };
  },
  mounted() {
    console.log("Component Mounted");

    let vm = this;
    var order_obj = {};
    vm.orders = [];
    vm.menu_code = this.$route.params.menu_id;

    // console.log("Order Name: " + vm.menu_code);

    var orderRef = db.ref(
      "global_menus/" + vm.$route.params.menu_id + "/orders"
    );
    orderRef
      .orderByChild("status")
      .equalTo("Pending")
      .on("value", data => {
        data.forEach(data => {
          order_obj = {
            icon: "folder",
            iconClass: "primary lighten-1 white--text",
            order_number: data.val().order_number,
            order_type: data.val().order_type,
            order_amount: data.val().amount,
            key: data.key
          };
          vm.orders.push(order_obj);
        });
      });
  },
  watch: {
    // menu_code(val) {
    //   if (val != null) {
    //     this.showOrders();
    //     // this.showFilteredOrder()
    //   }
    // },
    order_name(val) {
      if (val != null) {
        this.showFilteredOrder();
      }
    },
    order_type(val) {
      if (val != null) {
        this.showFilteredOrderType();
      }
    }
  },
  methods: {

    sendData(id) {
      this.$eventBus.$emit("send-data", id);
      console.log("Sending Data" + id);
    },
    addNewOrder() {
      this.orders = [];
      firebase.database
        .ref("global_menus")
        .child(this.menu_code)
        .child("orders")
        .push({
          order_number: this.newOrder.order_number,
          order_type: this.newOrder.order_type,
          amount: this.newOrder.amount,
          status: this.newOrder.status,
          created_at: new Date().getTime(),
          user_id: auth.currentUser.uid
        })
        .then(
          (this.text = "Order Added"),
          ((this.color = "success"), (this.snackbar = true))
        );

      firebase.database
        .ref("global_menus")
        .child(this.menu_code)
        .child("items")
        .push({
          item_name: this.newItem.item_name,
          item_amount: this.newItem.item_amount,
          order_number: this.newOrder.order_number,
          created_at: new Date().toUTCString(),
          user_id: auth.currentUser.uid
        })
        .then(
          (this.text = "Item Added"),
          ((this.color = "success"), (this.snackbar = true))
        );
    },

    showOrders() {
      // var order_obj = {};
      // this.orders = [];
      // var orderRef = db.ref("global_menus/" + this.menu_code + "/orders");
      // orderRef.orderByValue().on("value", data => {
      //   data.forEach(data => {
      //     order_obj = {
      //       icon: "folder",
      //       iconClass: "primary lighten-1 white--text",
      //       order_number: data.val().order_number,
      //       order_type: data.val().order_type,
      //       order_amount: data.val().amount,
      //       key: data.key
      //     };
      //     this.orders.push(order_obj);
      //   });
      // });
      // this.show_orders = true;
    },
    showFilteredOrder() {
      var order_obj = {};

      this.orders = [];

      var orderRef = db.ref("global_menus/" + this.menu_code + "/orders");
      orderRef
        .orderByChild("order_number")
        .equalTo(this.order_name)
        .on("value", data => {
          data.forEach(data => {
            order_obj = {
              icon: "folder",
              iconClass: "primary lighten-1 white--text",
              order_number: data.val().order_number,
              order_type: data.val().order_type,
              order_amount: data.val().amount,
              key: data.key
            };
            this.orders.push(order_obj);
            // console.log("Orders filtered: " + order_obj);
          });
        });
      this.show_orders = true;
    },

    showFilteredOrderType() {
      let vm = this;

      var order_obj = {};

      vm.orders = [];

      var orderRef = db.ref("global_menus/" + vm.menu_code + "/orders");
      orderRef
        .orderByChild("order_type")
        .equalTo(vm.order_type)
        .on("value", data => {
          data.forEach(data => {
            order_obj = {
              icon: "folder",
              iconClass: "primary lighten-1 white--text",
              order_number: data.val().order_number,
              order_type: data.val().order_type,
              order_amount: data.val().amount,
              key: data.key
            };
            vm.orders.push(order_obj);
          });
        });

      vm.show_orders = true;
    },

    deleteOrder(key) {
      this.orders = [];
      db.ref("global_menus/" + this.menu_code + "/orders")
        .child(key)
        .remove()
        .then(
          (this.text = "Order Deleted"),
          ((this.color = "success"), (this.snackbar = true))
        );
    },
    editOrder(key) {
      db.ref("global_menus/" + this.menu_code + "/orders")
        .orderByKey()
        .equalTo(key)
        .on("value", data => {
          data.forEach(data => {
            this.newOrder.order_number = data.val().order_number;
            this.newOrder.order_type = data.val().order_type;
            this.newOrder.amount = data.val().amount;
            this.newOrder.status = data.val().status;
          });
        });
    },
    UpdateOrder(key) {
      this.orders = [];

      db.ref("global_menus/" + this.menu_code + "/orders")
        .child(key)
        .update({
          order_number: this.newOrder.order_number,
          order_type: this.newOrder.order_type,
          amount: this.newOrder.amount,
          status: this.newOrder.status
        })
        .then(
          (this.text = "Order Updated"),
          ((this.color = "success"), (this.snackbar = true))
        );
    }
  }
};
</script>
<style>
</style>
