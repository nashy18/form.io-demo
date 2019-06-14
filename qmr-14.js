let builderInstance={};
let formInstance = {};

function init() {
  Formio.icons = 'fontawesome'; 
}

async function getFormTemplate(params=null, type='r') {
  const data= await fetch(`/form.io-demo/${params}`).then(function(response) {
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

function builder(params) {
  Formio.builder(document.getElementById('builder'), params).then(function (builder) {
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
