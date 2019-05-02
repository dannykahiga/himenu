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
      <v-toolbar-title>Orders</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <v-list two-line subheader>
      <v-container grid-list-md text-xs-center mt-5>
        <v-layout row wrap>
          <v-flex>
            <v-autocomplete
              v-model="order_number"
              item-text="order_number"
              :items="orders"
              label="Order by number"
              :search-input.sync="search_number"
              :loading="loading_number"
              cache-items
              clearable
              class="mx-3"
              outline
              hide-no-data
              hide-details
              solo
            ></v-autocomplete>
          </v-flex>
          <v-flex>
            <v-autocomplete
              v-model="order_type"
              item-text="order_type"
              :items="orders"
              label="Order by type"
              :search-input.sync="search_type"
              :loading="loading_type"
              cache-items
              clearable
              class="mx-3"
              outline
              hide-no-data
              hide-details
              solo
            ></v-autocomplete>
          </v-flex>
          <v-flex>
            <v-autocomplete
              v-model="order_status"
              item-text="order_status"
              :items="orders"
              label="Order by status"
              :search-input.sync="search_status"
              :loading="loading_status"
              cache-items
              clearable
              class="mx-3"
              outline
              hide-no-data
              hide-details
              solo
            ></v-autocomplete>
          </v-flex>
        </v-layout>
      </v-container>
      <v-subheader>{{order_status}} Orders</v-subheader>
      <div>
        <v-list-tile
          v-for="(order, index) in orders"
          :key="index['.key']"
          avatar
          @click="$router.push('/menu/'+$route.params.menu_id+'/hiorders/order/'+order.key) + sendData(order.key)"
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
          <v-list-tile-action></v-list-tile-action>

          <v-list-tile-action v-if="order.order_status == 'Active'">
            <v-btn flat icon color="green" @click="$router.push('/menu/'+$route.params.menu_id+'/hiorders/order/'+order.key+'/drivers/delivery')">
              <v-icon>timeline</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action v-else>
            <v-btn flat icon color>
              <v-icon></v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </div>
    </v-list>
  </v-container>
</template>


<script>
import { db, ordersRef, auth, code } from "../service/firebase";
import firebase from "../service/firebase";
import { functions } from "firebase";
export default {
  data() {
    return {
      order_type: "",
      order_number: "",
      order_status: "",
      orders: [],
      search_number: "",
      search_type: "",
      search_status: "",
      loading_number: false,
      loading_type: false,
      loading_status: false
    };
  },
  mounted() {
    console.log("Mounted" + this.$route.params.menu_id);

    let vm = this;
    var order_obj = {};
    vm.orders = [];
    vm.menu_code = this.$route.params.menu_id;

    var orderRef = db.ref(
      "global_menus/" + vm.$route.params.menu_id + "/orders"
    );
    orderRef.orderByValue().on("value", data => {
      data.forEach(data => {
        order_obj = {
          icon: "folder",
          iconButton: "home",
          iconClass: "primary lighten-1 white--text",
          iconButtonClass: "green lighten-1 white--text",
          order_number: data.val().order_number,
          order_type: data.val().order_type,
          order_amount: data.val().amount,
          order_status: data.val().status,
          key: data.key
        };
        vm.orders.push(order_obj);
      });
    });
  },
  watch: {
    order_number(val) {
      if (val != null) {
        this.filterOrdersByNumber();
      }
    },
    order_type(val) {
      if (val != null) {
        this.filterOrdersByType();
      }
    },
    order_status(val) {
      if (val != null) {
        this.filterOrdersByStatus();
      }
    },
  },
  methods: {
    filterOrdersByStatus() {
      let vm = this;

      var order_obj = {};

      vm.orders = [];

      var orderRef = db.ref(
        "global_menus/" + vm.$route.params.menu_id + "/orders"
      );
      orderRef
        .orderByChild("status")
        .equalTo(vm.order_status)
        .on("value", data => {
          data.forEach(data => {
            order_obj = {
              icon: "folder",
              iconClass: "primary lighten-1 white--text",
              order_number: data.val().order_number,
              order_type: data.val().order_type,
              order_amount: data.val().amount,
              order_status: data.val().status,
              key: data.key
            };
            vm.orders.push(order_obj);
          });
        });
      vm.show_orders = true;
    },
    filterOrdersByType() {
      let vm = this;

      var order_obj = {};

      vm.orders = [];

      var orderRef = db.ref(
        "global_menus/" + vm.$route.params.menu_id + "/orders"
      );
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
              order_status: data.val().status,
              key: data.key
            };
            vm.orders.push(order_obj);
          });
        });
      vm.show_orders = true;
    },
    filterOrdersByNumber() {
      let vm = this;

      var order_obj = {};

      vm.orders = [];

      var orderRef = db.ref(
        "global_menus/" + vm.$route.params.menu_id + "/orders"
      );
      orderRef
        .orderByChild("order_number")
        .equalTo(vm.order_number)
        .on("value", data => {
          data.forEach(data => {
            order_obj = {
              icon: "folder",
              iconClass: "primary lighten-1 white--text",
              order_number: data.val().order_number,
              order_type: data.val().order_type,
              order_amount: data.val().amount,
              order_status: data.val().status,
              key: data.key
            };
            vm.orders.push(order_obj);
          });
        });

      vm.show_orders = true;
    }
  }
};
</script>

<style>
</style>
