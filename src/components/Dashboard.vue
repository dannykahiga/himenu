<template>
  <v-container grid-list-md text-xs-center>
    <!-- <v-btn @click="$router.push('/menu/'+$route.params.menu_id+'/report')" color="success">Download nccjvnj</v-btn> -->

    <header class="text-left">Dashboard [ {{menu_code }} {{ refresh }} ]</header>

    <!-- <v-btn @click="DownloadPDF" color="success">Download</v-btn> -->

    <v-layout row wrap>
      <v-flex mt-5 style="width: 200px;">
        <v-card class="rounded-card">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="primary"
            elevation="3"
            max-width="calc(100% - 50px)"
          >
            <v-sparkline color="white" padding="16"></v-sparkline>

            <v-card flat color="white" width="150">
              <v-card-text>
                <v-layout justify-space-around>
                  <v-icon large color="orange darken-2">present_to_all</v-icon>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Delivery Orders</div>
            <div class="subheading font-weight-light grey--text">{{ deliveries }}</div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>mdi-clock</v-icon>
            <span class="caption grey--text font-weight-light">
              Number of orders ordered remotely.
              <v-btn
                @click="$router.push('/menu/'+$route.params.menu_id+'/report')"
                flat
                icon
                color="primary"
              >
                <v-icon>description</v-icon>
              </v-btn>
            </span>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex mt-5 style="width: 200px;">
        <v-card class="rounded-card">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="red"
            elevation="3"
            max-width="calc(100% - 50px)"
          >
            <v-sparkline color="white" padding="16"></v-sparkline>

            <v-card flat color="white" width="150">
              <v-card-text>
                <v-layout justify-space-around>
                  <v-icon large color="red darken-2">home</v-icon>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Inhouse Orders</div>
            <div class="subheading font-weight-light grey--text">{{ inhouse }}</div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>mdi-clock</v-icon>
            <span class="caption grey--text font-weight-light">
              Number of orders ordered locally.
              <v-btn flat icon color="red" @click="$router.push('/menu/'+$route.params.menu_id+'/report_inhouse')">
                <v-icon>description</v-icon>
              </v-btn>
            </span>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex mt-5 style="width: 200px;">
        <v-card class="rounded-card">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="green"
            elevation="3"
            max-width="calc(100% - 50px)"
          >
            <v-sparkline color="white" padding="16"></v-sparkline>

            <v-card flat color="white" width="150">
              <v-card-text>
                <v-layout justify-space-around>
                  <v-icon large color="green darken-2">money</v-icon>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Order Revenue</div>
            <div class="subheading font-weight-light grey--text">KES {{ total }}</div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>mdi-clock</v-icon>
            <span class="caption grey--text font-weight-light">
              Total revenue of orders .
              <v-btn flat icon color="green">
                <v-icon>description</v-icon>
              </v-btn>
            </span>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- <v-flex style="width: 400px;" mt-5>
        <v-card>
          <v-card-text>
            <v-sparkline
              :fill="fill"
              :gradient="gradient"
              :line-width="width"
              :padding="padding"
              :smooth="radius || false"
              :value="value"
              auto-draw
            ></v-sparkline>
          </v-card-text>
        </v-card>
      </v-flex>-->

      <v-flex style="width: 1000px;">
        <v-card class="rounded-card">
          <v-card-text>
            <!-- <div id="chart">
              <apexchart type="area" height="350" :options="chartOptions" :series="series"/>
            </div>-->
            <div>
              <canvas id="planet-chart"></canvas>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex style="width: 400px; height: 200px">
        <v-card class="rounded-card">
          <v-card-text>
            <!-- <div id="chart">
              <apexchart type="donut" width="380" :options="donutOptions" :series="series_donut"/>
            </div>-->
            <div>
              <canvas id="doughnut_chart"></canvas>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex mt-5 style="width: 200px;">
        <v-card class="rounded-card">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="blue"
            elevation="3"
            max-width="calc(100% - 50px)"
          >
            <v-sparkline color="white" padding="16"></v-sparkline>

            <v-card flat color="white" width="150">
              <v-card-text>
                <v-layout justify-space-around>
                  <v-icon large color="blue darken-2">vertical_split</v-icon>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Reviews</div>
            <div class="subheading font-weight-light grey--text">{{ reviews }}</div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>mdi-clock</v-icon>
            <span class="caption grey--text font-weight-light">Number of customer reviews.</span>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex mt-5 style="width: 200px;">
        <v-card class="rounded-card">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="orange"
            elevation="3"
            max-width="calc(100% - 50px)"
          >
            <v-sparkline color="white" padding="16"></v-sparkline>

            <v-card flat color="white" width="150">
              <v-card-text>
                <v-layout justify-space-around>
                  <v-icon large color="orange darken-2">star</v-icon>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Rating</div>
            <v-rating
              readonly
              v-model="rating"
              background-color="purple lighten-3"
              color="orange"
              small
            ></v-rating>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>mdi-clock</v-icon>
            <span class="caption grey--text font-weight-light">Your rating.</span>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- <v-flex>
        <v-card>
          <v-card-text>Fourth Card</v-card-text>
        </v-card>
      </v-flex>-->

      <!-- <v-flex>
        <v-card>
          <v-card-text>Fifth Card</v-card-text>
        </v-card>
      </v-flex>

      <v-flex>
        <v-card>
          <v-card-text>Sixth Card</v-card-text>
        </v-card>
      </v-flex>-->
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../service/firebase";
import VueApexCharts from "vue-apexcharts";
import firebase from "../service/firebase";
import { functions } from "firebase";
// import { planetChartData, label1 } from "../chart-data";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];
export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      pending: 0,
      active: 0,
      completed: 0,
      doughnutChartData: {
        type: "doughnut",
        data: {
          labels: ["Pending Orders", "Active Orders", "Completed Orders"],
          datasets: [
            {
              data: [],
              backgroundColor: ["#f44336", "#4caf50", "#3f51b5"],
              hoverBackgroundColor: ["#f44336", "#4caf50", "#3f51b5"]
            }
          ]
        },
        options: {
          responsive: true,

          title: {
            display: true,
            postion: "right",
            text: "Order Status Comparison"
          }
        }
      },

      order_type: "",
      planetChartData: {
        type: "line",
        data: {
          labels: [
            // "Jan",
            // "Feb",
            // "Mar",
            // "Apr",
            // "Jun",
            // "Jul",
            // "Aug",
            // "Sep",
            // "Oct",
            // "Nov",
            // "Dec"
          ],

          datasets: [
            {
              // one line graph
              label: "",
              data: [],
              backgroundColor: [
                // "rgba(54,73,93,.5)", // Blue
                // "rgba(54,73,93,.5)",
                // "rgba(54,73,93,.5)",
                // "rgba(54,73,93,.5)",
                // "rgba(54,73,93,.5)",
                // "rgba(54,73,93,.5)",
                // "rgba(54,73,93,.5)",
                // "rgba(54,73,93,.5)"

                "rgb(238, 137, 0, .5)"
              ],
              borderColor: [
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d"
              ],
              borderWidth: 1
            },
            {
              // another line graph
              label: "Inhouse",
              data: [],
              backgroundColor: [
                // "rgba(71, 183,132,.5)" // Green

                "rgb(233, 30, 99, .5)"
              ],
              borderColor: ["#47b784"],
              borderWidth: 1
            }
          ]
        },
        options: {
          title: {
            display: true,
            postion: "right",
            text: "Orders' revenue made this month"
          },
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25
                }
              }
            ]
          }
        }
      },
      order_name: "",
      menu_code: "1000",
      loading: false,
      search: null,
      menus: [],
      deliveries: "0",
      inhouse: 0,
      rating: 0,
      reviews: 0,
      total: 0
    };
  },
  mounted() {
    this.menu_code = this.$route.params.menu_id;
    this.getOrders();

    let vm = this;

    var order_obj = {};
    vm.orders = [];
    vm.menu_code = this.$route.params.menu_id;

    vm.createDoughnut("doughnut_chart", vm.doughnutChartData);

    db.ref("global_menus/" + vm.$route.params.menu_id + "/orders")
      .orderByChild("order_type")
      .equalTo("Delivery")
      .on("value", data => {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "July";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        var dateT = new Date().getUTCFullYear();

        data.forEach(data => {
          var date = new Date(data.val().created_at * -1);
          var monthName = month[date.getMonth()];
          var year = date.getUTCFullYear();

          vm.planetChartData.data.labels.push(monthName);
          vm.planetChartData.data.datasets[0].data.push(data.val().amount);

          if (year == dateT) {
            // console.log("YADA YADA");
          }

          vm.order_type = "Delivery";
        });

        vm.planetChartData.data.datasets[0].label = vm.order_type;
        vm.createChart("planet-chart", vm.planetChartData);
      });

    db.ref("global_menus/" + vm.$route.params.menu_id + "/orders")
      .orderByChild("order_type")
      .equalTo("Inhouse")
      .on("value", data => {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "July";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        var dateT = new Date().getUTCFullYear();

        data.forEach(data => {
          var date = new Date(data.val().created_at * -1);
          var monthName = month[date.getMonth()];
          var year = date.getW;

          // vm.planetChartData.data.labels.push(date.toLocaleDateString())
          vm.planetChartData.data.datasets[1].data.push(data.val().amount);

          if (year == dateT) {
            // console.log("YADA YADA");
          }
        });

        vm.createChart("planet-chart", vm.planetChartData);
      });
  },
  computed: {
    refresh: {
      get() {
        this.menu_code = this.$route.params.menu_id;
        this.getOrders();
        // this.createChart("planet-chart", this.planetChartData);
      }
    }
  },
  //     watch: {
  //     menu_code(val) {
  //       if (val != null) {
  //         this.getOrders();
  //       }
  //     }
  //   },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },

    createDoughnut(donoughtID, doughnutData) {
      const ctx = document.getElementById(donoughtID);
      const myChart = new Chart(ctx, {
        type: doughnutData.type,
        data: doughnutData.data,
        options: doughnutData.options
      });
    },
    getOrders() {
      let that = this;

      var total_amt = 0;

      // Order Revenue

      db.ref("global_menus/" + that.$route.params.menu_id + "/orders")
      .on("value", data => {
        data.forEach(data => {
          total_amt += data.val().amount++;
          that.total = total_amt;
        });
      });

      //Delivery

      var orderRef = db.ref(
        "global_menus/" + this.$route.params.menu_id + "/orders"
      );
      orderRef
        .orderByChild("order_type")
        .equalTo("Delivery")
        .on("value", data => {
          // data.forEach(data => {
          //   console.log("There are " + data.val().order_number + " ");
          // });
          that.deliveries = data.numChildren();
        });

      //Inhouse

      var orderRef2 = db.ref(
        "global_menus/" + this.$route.params.menu_id + "/orders"
      );
      orderRef2
        .orderByChild("order_type")
        .equalTo("Inhouse")
        .on("value", data => {
          that.inhouse = data.numChildren();
        });
      //Reviews

      var orderRef3 = db.ref("global_menus/" + this.$route.params.menu_id);
      orderRef3.on("value", data => {
        that.reviews = data.val().reviews;
        that.rating = parseInt(data.val().rating);
      });

      //Pending Orders
      var orderRef4 = db.ref(
        "global_menus/" + this.$route.params.menu_id + "/orders"
      );
      orderRef4
        .orderByChild("status")
        .equalTo("Pending")
        .on("value", data => {
          that.pending = data.numChildren();

          // console.log("Pending Orders: " + that.pending);
        });

      var orderRef5 = db.ref(
        "global_menus/" + this.$route.params.menu_id + "/orders"
      );
      orderRef5
        .orderByChild("status")
        .equalTo("Completed")
        .on("value", data => {
          that.completed = data.numChildren();
          // that.completed = parseInt(data.numChildren());
        });

      var orderRef6 = db.ref(
        "global_menus/" + this.$route.params.menu_id + "/orders"
      );
      orderRef6
        .orderByChild("status")
        .equalTo("Active")
        .on("value", data => {
          that.active = data.numChildren();
          // that.active = parseInt(data.numChildren());
        });

      that.doughnutChartData.data.datasets[0].data = [
        parseInt(that.active),
        parseInt(that.pending),
        parseInt(that.completed)
      ];

      db.ref("global_menus/" + this.menu_code + "/orders")
        .orderByChild("order_type")
        .equalTo("Inhouse")
        .on("value", data => {
          data.forEach(data => {
            // console.log(data.val().status);
          });
        });
    },
    DownloadPDF() {
      //   let pdfName = "test";
      //   var doc = new jsPDF();
      //   doc.text("Name", 10, 10);
      //   doc.save(pdfName + ".pdf");

      const doc = new jsPDF();
      /** WITH CSS */
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.content, { canvas: canvasElement }).then(function(
        canvas
      ) {
        const img = canvas.toDataURL("image/png");
        doc.addImage(img, "JPEG", 20, 20);
        doc.save("sample.pdf");
      });
    }
  }
};
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}

.rounded-card {
  border-radius: 10px;
}
</style>
