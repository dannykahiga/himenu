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
      <v-toolbar-title>Back</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout row wrap xs6 md6 lg6 mt-5>
      <div xs-6 ref="invoice" class="invoice-box">
        <!-- <div class="text-right" mt-3>
        <img :src="img.hotel_logo" style="width:50% height:50%; max-width:50px;">
        </div>-->
        <h2 class="text-center">Fiscal Receipt</h2>
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="4">
              <table>
                <tr>
                  <td class="title">
                    <img src="./logo1.png" style="width:100%; max-width:100px;">
                  </td>
                  <td>
                    <small>Orders Receipt</small>
                    <br>
                    <small>Created: {{ todays_date }}</small>
                    <br>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="4">
              <table>
                <tr>
                  <td>
                    <small>{{ hotel_name }}</small>
                    <br>
                    <small>{{ location }}</small>
                    <br>
                    <small>Number of Items: {{ items_num }}</small>
                    <br>
                    <small>Order Number: {{ $route.params.order_number }}</small>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <v-divider></v-divider>
        <v-list two-line subheader>
          <div>
            <v-list-tile color="primary">
              <v-list-tile-content>
                <v-list-tile-title>Item</v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-title>Qty</v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-title>Amt</v-list-tile-title>
              </v-list-tile-action>
            </v-list-tile>
          </div>
        </v-list>
        <v-divider></v-divider>
        <v-list two-line subheader>
          <div>
            <v-list-tile v-for="(item, index) in items" :key="index['.key']" avatar>
              <!-- <v-list-tile-avatar>
              <v-icon color="primary" small>{{ order.icon }}</v-icon>
              </v-list-tile-avatar>-->
              <v-list-tile-content>
                <v-list-tile-title>{{ item.item_name }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-title>{{ item.qty }}</v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-title>KES: {{ item.item_amount }}</v-list-tile-title>
              </v-list-tile-action>
            </v-list-tile>
          </div>
        </v-list>
        <v-divider></v-divider>
        <v-list two-line subheader>
          <div>
            <v-list-tile color="primary">
              <v-list-tile-content>
                <v-list-tile-title>Total</v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-title>KES: {{ total }}</v-list-tile-title>
              </v-list-tile-action>
            </v-list-tile>
          </div>
        </v-list>
      </div>
    </v-layout>

    <div class="text-center mt-5">
      <v-form ref="form" v-model="valid" lazy-validation>
        <div>
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
            outline
            clearable
          ></v-text-field>
        </div>
        <v-btn depressed @click="printme" color="success">Download PDf</v-btn>
        <v-btn depressed color="primary">
          Send Email
          <v-icon dark right>email</v-icon>
        </v-btn>

          <v-btn
            v-if="delivery"
            @click="$router.push('/menu/'+$route.params.menu_id+'/hiorders/order/'+$route.params.order_number+'/'+$route.params.orderid+'/drivers')"
            depressed
            color="info"
          >Assign Driver?</v-btn>
          <v-btn v-else @click="$router.go(-1)" depressed color="info">Complete Order?</v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import { db, ordersRef, auth, code } from "../service/firebase";
import { functions } from "firebase";
export default {
  data: () => ({
    // items: [
    //   { description: "Website design", quantity: 1, price: 300 },
    //   { description: "Website design", quantity: 1, price: 75 },
    //   { description: "Website design", quantity: 1, price: 10 },
    //   { divider: true, inset: true }
    // ],
    orders: [],
    items: [],
    todays_date: "",
    location: "",
    hotel_name: "",
    order_number: "",
    total: "",
    items_num: "",
    order_status: "",
    email: "",
    order_type: "",
    delivery: false,

    rules: {
      required: value => !!value || "Required.",
      counter: value => value.length <= 20 || "Max 20 characters",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    },
    img: {
      hotel_logo: ""
    }
  }),
  mounted() {
    let vm = this;
    var item_obj = {};
    vm.orders = [];
    vm.menu_code = this.$route.params.menu_id;
    var total = 0;
    db.ref("global_menus/" + vm.$route.params.menu_id + "/items").on(
      "value",
      data => {
        vm.order_number = data.val().order_number;
        data.forEach(data => {});
      }
    );

     db.ref("global_menus/" + vm.$route.params.menu_id + "/orders").child(this.$route.params.orderid).on(
      "value",
      data => {
        vm.order_type = data.val().order_type;
        data.forEach(data => {});
      }
    );

    if (vm.order_type == "Delivery") {
        vm.delivery = true;
    }

    db.ref("global_menus/" + vm.$route.params.menu_id + "/items")
      .orderByChild("order_number")
      .equalTo(vm.$route.params.order_number)
      .on("value", data => {
        data.forEach(data => {
          total += data.val().item_amount++;
          vm.total = total;
          item_obj = {
            icon: "folder",
            item_name: data.val().item_name,
            qty: data.val().qty,
            item_amount: data.val().item_amount,
            key: data.key
          };
          vm.items.push(item_obj);
        });
        vm.items_num = data.numChildren();
      });

    var menu_ref = db
      .ref("global_menus/" + vm.$route.params.menu_id)
      .on("value", data => {
        vm.location = data.val().location;
        vm.hotel_name = data.val().name;
        vm.img.hotel_logo = data.val().logoUrl;
      });

    vm.todays_date = new Date().toUTCString();
  },
  computed: {
    // total() {
    //   return this.items.reduce(
    //     (acc, item) => acc + item.price * item.quantity,
    //     0
    //   );
    // }
  },
  filters: {
    currency(value) {
      return value.toFixed(2);
    }
  },
  methods: {
    // addRow() {
    //   this.items.push({ description: "", quantity: 1, price: 0 });
    // },

    printme() {
      // window.print();

      const doc = new jsPDF("p", "pt", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      /** WITH CSS */
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.invoice, { canvas: canvasElement }).then(function(
        canvas
      ) {
        var img = canvas.toDataURL("image/png");
        doc.addImage(img, "PNG", 0, 0);
        doc.save("sample.pdf");
      });

      //   var mywindow = window.open("", "PRINT", "height=400,width=600");

      // this.$htmlToPaper("invoice", options);

      //   const d = new Printd();
      //   d.print(document.getElementById("invoice"), [cssText]);

      // window.document.write(document.getElementById("invoice").innerHTML);

      // window.document.close();
      // window.print();
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
    }
  }
};
</script>

<style scoped>
.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(n + 2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.item input {
  padding-left: 5px;
}

.invoice-box table tr.item td:first-child input {
  margin-left: -5px;
  width: 100%;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

.invoice-box input[type="number"] {
  width: 60px;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
    sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}
</style>
