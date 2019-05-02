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
    <div xs-8 ref="invoice" class="invoice-box mt-5">
      <!-- <div class="text-right" mt-3>
        <img :src="img.hotel_logo" style="width:50% height:50%; max-width:50px;">
      </div> -->
      <h2 class="text-center">Delivery Orders</h2>
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="4">
            <table>
              <tr>
                <td class="title">
                  <img src="./logo1.png" style="width:100%; max-width:100px;">
                </td>
                <td>
                  Orders Report
                  <br>
                  Created: {{ todays_date }}
                  <br>Shows all delivery orders
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
                  {{ hotel_name }}
                  <br>
                  {{ location }}
                  <br>
                  Number of orders: {{ order_number }}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- <tr class="heading">
            <td colspan="3">Payment Method</td>
            <td>MPESA #</td>
          </tr>

          <tr class="details">
            <td colspan="3">KES</td>
            <td>1000</td>
        </tr>-->

        <!-- <tr class="heading">
          <td>Item</td>
          <td>Unit Cost</td>
          <td>Quantity</td>
          <td>Price</td>
        </tr>-->

        <!-- <tr class="item" v-for="item in items">
          <td>
            <input v-model="item.description">
          </td>
          <td>
            $
            <input type="number" v-model="item.price">
          </td>
          <td>
            <input type="number" v-model="item.quantity">
          </td>
          <td>${{ item.price * item.quantity | currency }}</td>
        </tr>-->

        <!-- <tr>
          <td colspan="4">
            <button class="btn-add-row" @click="addRow">Add row</button>
          </td>
        </tr>

        <tr class="total">
          <td colspan="3"></td>
          <td>Total: ${{ total | currency }}</td>
        </tr>-->
      </table>
      <v-divider></v-divider>
      <v-list two-line subheader>
        <div>
          <v-list-tile color="primary">
            <v-list-tile-content>
              <v-list-tile-title>Order Number</v-list-tile-title>
              <v-list-tile-sub-title></v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-list-tile-title>Order Amount</v-list-tile-title>
            </v-list-tile-action>
          </v-list-tile>
        </div>
      </v-list>
      <v-divider></v-divider>
      <v-list two-line subheader>
        <div>
          <v-list-tile v-for="(order, index) in orders" :key="index['.key']" avatar>
            <v-list-tile-avatar>
              <v-icon small color="primary">{{ order.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ order.order_number }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ order.status }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-list-tile-title>KES: {{ order.order_amount }}</v-list-tile-title>
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
    <div class="text-center">
      <v-btn depressed @click="printme" color="success">Download PDf</v-btn>
    </div>
  </v-container>
</template>

<script>
import { db, ordersRef, auth, code } from "../service/firebase";
import { functions } from "firebase";
export default {
  data: () => ({
    items: [
      { description: "Website design", quantity: 1, price: 300 },
      { description: "Website design", quantity: 1, price: 75 },
      { description: "Website design", quantity: 1, price: 10 },
      { divider: true, inset: true }
    ],
    orders: [],
    todays_date: "",
    location: "",
    hotel_name: "",
    order_number: "",
    total: '',
    img: {
         hotel_logo: ''
    },
  }),
  mounted() {
    let vm = this;
    var order_obj = {};
    vm.orders = [];
    vm.menu_code = this.$route.params.menu_id;

    var total_amt= 0;

    // console.log("Order Name: " + vm.menu_code);

    var orderRef = db.ref(
      "global_menus/" + vm.$route.params.menu_id + "/orders"
    );
    orderRef
      .orderByChild("order_type")
      .equalTo("Delivery")
      .on("value", data => {
        data.forEach(data => {
          total_amt += data.val().amount++
          vm.total = total_amt
          order_obj = {
            icon: "folder",
            order_number: data.val().order_number,
            order_type: data.val().order_type,
            order_amount: data.val().amount,
            status: data.val().status,
            key: data.key
          };
          vm.orders.push(order_obj);
        });
        vm.order_number = data.numChildren();
      });

    var menu_ref = db
      .ref("global_menus/" + vm.$route.params.menu_id)
      .on("value", data => {
        vm.location = data.val().location;
        vm.hotel_name = data.val().name;
        vm.img.hotel_logo = data.val().logoUrl
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
    addRow() {
      this.items.push({ description: "", quantity: 1, price: 0 });
    },

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
