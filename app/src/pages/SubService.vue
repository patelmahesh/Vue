<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sub Services</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
          </v-toolbar>
          <v-data-table :headers="headers" :items="subservices" class="elevation-1">
            <template v-slot:items="props">
              <tr>
                <td class="text-xs-right">{{ props.item.id }}</td>
                <td class="text-xs-right">{{ props.item.name }}</td>
                <td class="justify-center layout px-0"></td>
              </tr>
            </template>
            <template v-slot:no-data></template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import subServiceApi from "@/services/SubServiceApi";
export default {
  props: {
    serviceId: String
  },
  data: () => ({
    headers: [
      {
        text: "Sub Service Id",
        align: "right",
        value: "id"
      },
      {
        text: "Sub Service Name",
        value: "name",
        align: "right",
        sortable: false
      },
      { text: "Actions", value: "actions", align: "right", sortable: false }
    ],
    subservices: [],
    isEdit: false,
    subservice: {
      id: "",
      name: ""
    }
  }),
  created() {
    this.initialize();
  },
  mounted() {},

  methods: {
initialize() {
      subServiceApi
        .fetchSubServiceCollection(this.serviceId)
        .then(response => {
          this.subservices = response;
        })
        .catch(error => {
          console.log(error);
        });

  }
  }
};
</script>