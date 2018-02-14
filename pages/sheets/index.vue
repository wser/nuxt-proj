<template lang="pug">
#app
  v-app
    v-container(fluid)
      h1
        a(href='/') {{msg}}
      br

      v-layout(row)
        v-flex(xs8)
          v-text-field#id(name='ID' label='ID' ref='id' v-model="id")
          v-text-field#name(name='NAME' label='Name' ref='name' v-model="name")
          v-tooltip(bottom)
            v-btn(dark outline fab small color='indigo' slot='activator' @click='insert_value')
              v-icon edit
            span insert
          v-tooltip(bottom)
            v-btn(dark outline fab small color='indigo' slot='activator' @click='read_value')
              v-icon subject
            span read
          v-tooltip(bottom)
            v-btn(dark outline fab small color='indigo' slot='activator' @click='update_value')
              v-icon update
            span update
          v-tooltip(bottom)
            v-btn(dark outline fab small color='indigo' slot='activator' @click='delete_value')
              v-icon delete_forever
            span delete
      br

      v-flex(xs12, sm8, offset-sm2)
        v-card
          v-card-title
            | Google Spreadsheet
            v-spacer
            v-text-field(append-icon='search', label='Search', hide-details, v-model='search')
          
          v-data-table.elevation-1(
            :headers='headers', 
            :items='items', 
            :search='search', 
            v-model='selected',
            select-all, 
            :pagination.sync='pagination', 
            item-key='NAME')

            template(slot='headers', slot-scope='props')
              tr
                th
                  v-checkbox(primary, 
                    hide-details, 
                    @click.native='toggleAll', 
                    :input-value='props.all', 
                    :indeterminate='props.indeterminate')

                th(v-for='header in props.headers', 
                  :key='header.text', 
                  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']", 
                  @click='changeSort(header.value)')
                  v-icon arrow_upward
                  | {{ header.text }}

            template(slot='items', slot-scope='props')
              tr(:active="props.selected", @click="props.selected = !props.selected")
                td
                  v-checkbox(primary, hide-details, v-model='props.selected')
                td.text-xs-center
                  | {{ props.item.ID }}

                td.text-xs-center
                  v-edit-dialog(
                    @open='tmp = props.item.NAME, name = props.item.NAME, id = props.item.ID', 
                    @save='props.item.NAME = tmp || props.item.NAME, update_value() ',
                    @cancel='tmp = "", name = "", id = ""',
                    large, 
                    lazy)
                    div {{ props.item.NAME }}
                    .mt-3.title(slot='input') Update Name
                      v-text-field(slot='input', 
                        label='Edit', 
                        v-model='tmp', 
                        single-line, 
                        counter, 
                        autofocus, 
                        :rules='[max25chars]')
            
            template(slot='pageText', slot-scope='{ pageStart, pageStop }')
              | From {{ pageStart }} to {{ pageStop }}

        // #showData
</template>

<script>
import config from "@/-sensitive/config"
import axios from "axios"

export default {
  name: "app",
  data() {
    return {
      msg: "Reload",
      script_url: config.gmacros,
      id:'',
      name:'',
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      tmp: '',
      search: '',
      pagination: {
         sortBy: 'ID'
      },
      selected: [],
      headers: [
        {
          text: 'ID',
          align: 'left',
          value: 'ID'
        },
        { text: 'Name', value: 'NAME' },
      ],
      items: [
        {
          NAME: 'Eclair',
          ID: 1
        },
        {
          NAME: 'Cupcake',
          ID: 2
        },
        {
          NAME: 'Gingerbread',
          ID: 3
        },
      ]
    }
  },
  mounted(){
    this.read_value()
  },
  methods: {
    insert_value() {
      let id1 = this.id
      let name = this.name

      if (id1 > 0) {
        let url =
          this.script_url +
          "?callback" +
          "&name=" + name +
          "&id=" + id1 +
          "&action=insert" +
          "&sheetid=" + config.sheetName

        axios
          .get(url)
          .then(res => {
            console.log(res.data.result)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        alert("Id cannot be blank")
      }
    },

    read_value() {
      let url =
        this.script_url 
        + "?action=read" 
        + "&sheetid=" + config.sheetName

      axios
        .get(url, {
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          mode: "no-cors",
          credentials: "include"
        })
        .then(json => {
          // CREATE DYNAMIC TABLE.
          this.items = json.data.records       

      /* OLD WAY*/
        /*  var table = document.createElement("table")
            var header = table.createTHead()
            var row = header.insertRow(0)
            var cell1 = row.insertCell(0)
            var cell2 = row.insertCell(1)

            cell1.innerHTML = "<b>ID</b>"
            cell2.innerHTML = "<b>Name</b>"
            
            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < json.data.records.length; i++) {
              var tr = table.insertRow(-1)
              var tabCell = tr.insertCell(-1)
              tabCell.innerHTML = json.data.records[i].ID
              tabCell = tr.insertCell(-1)
              tabCell.innerHTML = json.data.records[i].NAME
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showData")
            divContainer.innerHTML = ""
            divContainer.appendChild(table) 
            */
      /********* */
        })
        .catch(error => {
          console.log(error)
        })
    },

    update_value() {
      let id1 = this.id
      let name = this.name

      let url =
        this.script_url +
        "?callback" +
        "&name=" + name +
        "&id=" + id1 +
        "&action=update" +
        "&sheetid=" + config.sheetName

      axios
        .get(url)
        .then(res => {
          console.log(res.data.result)
        })
        .catch(error => {
          console.log(error)
        })
    },

    delete_value() {
      let id1 = this.id
      let name = this.name

      let url =
        this.script_url +
        "?callback" +
        "&name=" + name +
        "&id=" + id1 +
        "&action=delete" +
        "&sheetid=" + config.sheetName

      axios
        .get(url)
        .then(res => {
          console.log(res.data.result)
        })
        .catch(error => {
          console.log(error)
        })
    },

    toggleAll () {
      if (this.selected.length){ this.selected = []}
      else {this.selected = this.items.slice()}
    },

    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  },
  computed: {}
}
</script>

<style>

</style> 