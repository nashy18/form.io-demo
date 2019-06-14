let builderInstance={};
let formInstance = {};

function init() {
  Formio.icons = 'fontawesome'; 
}

function getFormTemplate(params=null, type='r') {
  const data= fetch(`/form.io-demo/${params}`).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    if(type=='r') return renderForm(myJson);
    builder(myJson);
  });
}

function renderForm(params={}) {debugger
  Formio.createForm(document.getElementById('formio'), params).then(function (form) {
    formInstance = form;
	
	/*
		for edit
		 form.submission = {
           data: results.data
         };
	*/
    form.on('submit', function (submission) {debugger
      console.log(submission);
    });
	
	form.on('error', (errors) => {debugger
		console.log('We have errors!');
	})
	
	//custom event mapping
	form.on('saveRecord', function (submission) {debugger
		//const isFormValid = formInstance.checkValidity(submission);
		const chekk = formInstance;
		console.log(submission);
    });
    
  });
}

//for custom components
const builderConfig = {
  builder: {
    custom: {
      title: 'Custom Components',
      weight: 10,
      components: {
        firstName: {
          title: 'First Name',
          key: 'firstName',
          icon: 'fa fa-terminal',
          schema: {
            label: 'First Name',
            type: 'textfield',
            key: 'firstName',
            input: true
          }
        },
        lastName: {
          title: 'Last Name',
          key: 'lastName',
          icon: 'fa fa-terminal',
          schema: {
            label: 'Last Name',
            type: 'textfield',
            key: 'lastName',
            input: true
          }
        },
        email: {
          title: 'Email',
          key: 'email',
          icon: 'fa fa-at',
          schema: {
            label: 'Email',
            type: 'email',
            key: 'email',
            input: true
          }
        },
        phoneNumber: {
          title: 'Mobile Phone',
          key: 'mobilePhone',
          icon: 'fa fa-phone-square',
          schema: {
            label: 'Mobile Phone',
            type: 'phoneNumber',
            key: 'mobilePhone',
            input: true
          }
        }
      }
    }
  }
}

function builder(params) {
  Formio.builder(document.getElementById('builder'), params, builderConfig).then(function (builder) {
    builderInstance = builder;
    builder.on('saveComponent', function () {debugger
      console.log(builder.schema);
    });
  });
}

function saveTemplate(){
	debugger;
	let data = builderInstance.schema;
	if(!data) return alert("Please add components first");
	localStorage.setItem("template", JSON.stringify(data));
}

//on page load
init();
