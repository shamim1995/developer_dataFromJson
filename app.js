const create_devs = document.getElementById('create_devs');
const skill_list = document.getElementById('skill_list');
const eskill_list = document.getElementById('eskill_list');
const add_devs = document.getElementById('add_devs');
const edit_devs = document.getElementById('edit_devs');
const clsBtn = document.getElementById('clsBtn');
const dev_modal_view = document.getElementById('dev_modal_view');
const devs_Alldata = document.querySelector('.devs_Alldata');



// skill loads from api

devsData();
function devsData() {

    axios.get('http://localhost:4040/skill').then(devs=>{
        let list = '';
        devs.data.map(skills=>{
             list += `<option value = "${skills.id}">${skills.name}</option>`
        });
        skill_list.insertAdjacentHTML('beforeend',list)
    })

}

// eskill loads from api
eskillData();
 function eskillData(){

    axios.get('http://localhost:4040/skill').then( eskill=>{
    let editSkill ='';
    eskill.data.map(data=>{
        editSkill += `<option value="${data.id}">${data.name}</option>`
    });

    eskill_list.insertAdjacentHTML('beforeend', editSkill);

    });

 }

// devs all data

const getDevelopers = () => {

    axios.get('http://localhost:4040/developers').then( res =>{
    let data_list='';
    res.data.map((devs,index)=> {
        data_list +=`<tr>
                            <td> ${index+1} </td>
                            <td>${devs.name}</td>
                            <td colspan="1">${devs.email}</td>
                           <td>${skillData(devs.skillId)}</td>
                            <td> <img style="object-fit:cover; width:40px; height: 40px" src="${devs.photo}" alt=""> </td>
                            <td>
                                <a class="btn btn-info btn-sm text-white" onclick="viewDeveloper(${devs.id})"  data-bs-toggle ="modal" href="#dev_modal_view"><i class="fa fa-eye"></i> </a>
                                <a class="btn btn-warning btn-sm text-white" onclick ="editDeveloper(${devs.id})" data-bs-toggle ="modal" href="#dev_modal_edit"><i class="fa fa-edit"></i> </a>
                                <a class="btn btn-danger btn-sm" onclick="deleteDeveloper(${devs.id})" href="#"> <i class="fa fa-trash"></i></a>
                            </td>
                        </tr>`
    });

    devs_Alldata.innerHTML = data_list;

    });
}

getDevelopers();

// devs add from add developer

add_devs.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let photo = document.getElementById('photo');
    let skill = document.getElementById('skill_list');

   
    if( name.value == '' || email.value == '' ||  skill.value == '' ){
        alert("All Fields Required")
    }else{

        axios.post('http://localhost:4040/developers',{
            id : "",
            name : name.value,
            email : email.value,
            photo : photo.value,
            skillId : skill.value 
        }).then(res=>{
            name.value ='';
            email.value ='';
            photo.value = '';
            skill.value = '';


            getDevelopers();
        });

    };
    
});


// this function for edit developer data

function editDeveloper(id){

     let name = document.getElementById('ename');
     let email = document.getElementById('eemail');
     let photo = document.getElementById('ephoto');
     let skill = document.getElementById('eskill_list');
     let preview = document.getElementById('preview');
     let edit_id = document.getElementById('edit_id');
   
    
axios.get(`http://localhost:4040/developers/${id}`).then( res=> {
    name.value = res.data.name
    email.value = res.data.email
    photo.value = res.data.photo
    skill.children[res.data.skillId].setAttribute('selected', true)
    preview.setAttribute('src', res.data.photo)
    edit_id.value=id;
    console.log(res.data.skillId);
})

}

// edit developers information

edit_devs.addEventListener('submit', function(e){
e.preventDefault();

     let name = document.getElementById('ename');
     let email = document.getElementById('eemail');
     let photo = document.getElementById('ephoto');
     let skill = document.getElementById('eskill_list');
     let edit_id = document.getElementById('edit_id');

    axios.patch(`http://localhost:4040/developers/${edit_id.value}`,{
            id: "",
            name: name.value,
            email: email.value,
            photo: photo.value,
            skillId: skill.value

    }).then(res=>{
        name.value = '';
        email.value = '';
        photo.value = '';
        skill.value = '';


        getDevelopers();

    });
});


// this function for delete developers

function deleteDeveloper(id){

    let conf = confirm('Are you sure');

    if(conf==true){
        axios.delete(`http://localhost:4040/developers/${id}`).then(res => {
            getDevelopers();
        })
    }else{
        false
    }

    
};


// view developer data
 

function viewDeveloper(id) {
    let listView = document.querySelector('.listView')
    
    axios.get(`http://localhost:4040/developers/${id}`).then( res=>{

        let list_view = '';

        list_view += ` <div class="row">
                            <div class="col-md-3">
                                <img style="width: 120px; height: 150px; object-fit: cover;" src="${res.data.photo}"
                                    alt="">
                            </div>
                            <div class="col-md-9">
                                <div class="card-body">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Skill</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>${res.data.name}</td>
                                                <td>${res.data.email}</td>
                                                <td>${skillData(res.data.skillId)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                      
                    </div>`
                    listView.innerHTML = list_view
    });

    
}

