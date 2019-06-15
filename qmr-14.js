//https://github.com/formio/formio.js/wiki/JavaScript-API
let builderInstance = {};
let formInstance = {};

function init() {
  Formio.icons = 'fontawesome';
}

function getFormTemplate(params = null, type = 'r') {
  const data = fetch(`/form.io-demo/${params}`).then(function (response) {
    return response.json();
  })
    .then(function (myJson) {
      if (type == 'r') return renderForm(myJson);
      builder(myJson);
    });
}

function renderForm(params = {}) {
  debugger
  const data = localStorage.getItem("template");
  if (data) params = JSON.parse(data);
  Formio.createForm(document.getElementById('formio'), params).then(function (form) {
    formInstance = form;

    /*
      for edit
       form.submission = {
             data: results.data
           };
    */
    form.on('submit', function (submission) {
      debugger
      console.log(submission);
    });

    form.on('error', (errors) => {
      debugger
      console.log('We have errors!');
    })

    //custom event mapping
    form.on('saveRecord', function (submission) {
      debugger
      //const isFormValid = formInstance.checkValidity(submission);
      const chekk = formInstance;
      console.log(submission);
    });

  });
}
//https://formio.github.io/formio.js/docs/file/src/components/select/Select.js.html
//for custom components
const builderConfig = {
  builder: {
    custom: {
      title: 'Master Data Components',
      weight: 10,
      components: {
        supplier: {
          title: 'Supplier',
          key: 'supplier',
          icon: 'fa fa-th-list',
          schema: {
            type: 'select',
            label: 'Supplier',
            key: 'supplier',
            data: {
              values: [],
              json: '',
              url: 'https://jsonplaceholder.typicode.com/todos',
              resource: '',
              custom: ''
            },
            limit: 5000,
            dataSrc: 'url',
            valueProperty: 'id',
            test:'',
            filter: '',
            searchEnabled: true,
            searchField: '',
            minSearch: 0,
            readOnlyValue: false,
            authenticate: false,
            template: '<span>{{ item.title }}</span>',
            selectFields: '',
            searchThreshold: 0.4,
            fuseOptions: {},
            customOptions: {}
          }
        },
        plant: {
          title: 'Plant',
          key: 'plant',
          icon: 'fa fa-th-list',
          schema: {
            type: 'select',
            label: 'Plant',
            key: 'plant',
            data: {
              values: [],
              json: '',
              url: 'https://sfs-master-data.s3.ca-central-1.amazonaws.com/plants.json',
              resource: '',
              custom: ''
            },
            limit: 5000,
            dataSrc: 'url',
            valueProperty: 'id',
            test:'',
            filter: '',
            searchEnabled: true,
            searchField: '',
            minSearch: 0,
            readOnlyValue: false,
            authenticate: false,
            template: '<span>{{ item.name }}</span>',
            selectFields: '',
            searchThreshold: 0.4,
            fuseOptions: {},
            customOptions: {}
          }
        },
        productionLine: {
          title: 'Production Line',
          key: 'productionLine',
          icon: 'fa fa-th-list',
          schema: {
            type: 'select',
            label: 'Production Line',
            key: 'productionLine',
            data: {
              values: [],
              json: '',
              url: 'https://sfs-master-data.s3.ca-central-1.amazonaws.com/ProductionLine.json',
              resource: '',
              custom: ''
            },
            limit: 5000,
            dataSrc: 'url',
            valueProperty: 'id',
            test:'',
            filter: '',
            searchEnabled: true,
            searchField: '',
            minSearch: 0,
            readOnlyValue: false,
            authenticate: false,
            template: '<span>{{ item.name }}</span>',
            selectFields: '',
            searchThreshold: 0.4,
            fuseOptions: {},
            customOptions: {}
          }
        },
        itemCode: {
          title: 'Item Code',
          key: 'itemCode',
          icon: 'fa fa-th-list',
          schema: {
            type: 'select',
            label: 'Item Code',
            key: 'itemCode',
            data: {
              values: [],
              json: '',
              url: 'https://sfs-master-data.s3.ca-central-1.amazonaws.com/ItemCode.json',
              resource: '',
              custom: ''
            },
            limit: 5000,
            dataSrc: 'url',
            valueProperty: 'id',
            test:'',
            filter: '',
            searchEnabled: true,
            searchField: '',
            minSearch: 0,
            readOnlyValue: false,
            authenticate: false,
            template: '<span>{{ item.Itemcode }}</span>',
            selectFields: '',
            searchThreshold: 0.4,
            fuseOptions: {},
            customOptions: {}
          }
        }
        
      }
    }
  }
}

function builder(params) {
  const data = localStorage.getItem("template");
  if (data) params = JSON.parse(data);
  Formio.builder(document.getElementById('builder'), params, builderConfig).then(function (builder) {
    builderInstance = builder;
    builder.on('saveComponent', function () {
      debugger
      console.log(builder.schema);
    });
  });
}

function saveTemplate() {
  debugger;
  let data = builderInstance.schema;
  if (!data) return alert("Please add components first");
  localStorage.setItem("template", JSON.stringify(data));
  alert("Templated saved successfully");
}

//on page load
init();
