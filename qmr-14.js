function init() {
  Formio.icons = 'fontawesome'; 
}

async function getFormTemplate(params=null, type='r') {
  const data= await fetch(`/${params}`).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    if(type=='r') return renderForm(myJson);
    builder(myJson);
  });
}

function renderForm(params={}) {debugger
  Formio.createForm(document.getElementById('formio'), params).then(function (form) {
    form.on('submit', function (submission) {debugger
      console.log(submission);
    });
  });
}

function builder(params) {
  Formio.builder(document.getElementById('builder'), params).then(function (builder) {
    builder.on('saveComponent', function () {debugger
      console.log(builder.schema);
    });
  });
}

//on page load
init();