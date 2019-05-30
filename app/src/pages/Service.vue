<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Service</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <form>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field
                          v-model="service.name"
                          label="Service Name"
                          v-validate="'required'"
                          :error-messages="errors.collect('service name')"
                          data-vv-name="service name"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="service.helpPhone"
                          label="Contact No"
                          v-validate="'required'"
                          :error-messages="errors.collect('phoneno')"
                          data-vv-name="phoneno"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="service.helpURL"
                          label="URL"
                          v-validate="'required'"
                          :error-messages="errors.collect('url')"
                          data-vv-name="url"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                  <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-dialog>

          <v-toolbar dark color="primary">
            <v-toolbar-title>Services</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
          </v-toolbar>
          <v-data-table :headers="headers" :items="services" class="elevation-1">
            <template  v-slot:items="props">
              <tr>
              <td class="text-xs-right">{{ props.item.id }}</td>
              <td class="text-xs-right">{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.helpPhone }}</td>
              <td class="text-xs-right">{{ props.item.helpURL }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              </td>
              </tr>
            </template>
            <template v-slot:no-data>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
    <subservice :serviceId="1"></subservice>
  </div>
</template>
<script>
import serviceApi from "@/services/ServiceApi";
import SubService from '../pages/SubService.vue';

export default {
  components: {
      'subservice': SubService
    },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Service Id",
        align: "right",
        value: "id"
      },
      { text: "Service Name", value: "name", align: "right", sortable: false },
      {
        text: "Contact No",
        value: "helpPhone",
        align: "right",
        sortable: false
      },
      { text: "URL", value: "helpURL", align: "right", sortable: false },
      { text: "Actions", value: "actions", align: "right", sortable: false }
    ],
    services: [],
    isEdit: false,
    service: {
      id: "",
      name: "",
      helpPhone: "",
      helpURL: ""
    },
    defaultItem: {
      id: "",
      name: "",
      helpPhone: "",
      helpURL: ""
    }
  }),

  computed: {
    formTitle() {
      return this.isEdit === true ?  "Edit Service" : "New Service";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      serviceApi
        .fetchServiceCollection()
        .then(response => {
          this.services = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    editItem(item) {
      this.isEdit = true;
      this.dialog = true;
      this.service = Object.assign({}, item);
     
    },

    deleteItem(item) {
      const index = this.services.indexOf(item);
      serviceApi.deleteService(item.id).catch(error => {
        console.log(error);
      });
      this.services.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.service = Object.assign({}, this.defaultItem);
        this.isEdit = false;
      }, 300);
    },

    async save() {
      const result = await this.$validator.validateAll();
      if (result) {
       this.service = await serviceApi.saveService(this.service);  
        if (this.isEdit) {
          Object.assign(this.services[this.services.findIndex(el => el.id === this.service.id)], this.service);
        } else {
          this.services.push(this.service);
        }
        
        this.close();
      }
    },

  }
};
</script>