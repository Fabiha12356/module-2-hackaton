const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);


let span = document.querySelector("#userName");
let recipebtn = document.querySelector("#recipebtn");


let user;
let path;

let mainid = document.querySelector("#mainid");
//fuction
let getuser = async () => {

    const { data: authData, error: authError } =
        await client.auth.getUser();

    if (authError || !authData.user) {
        console.log("User login nahi hai");
        return;
    }

     user = authData.user;

    console.log("USER:", user);
    console.log("USERNAME:", user.user_metadata.username);
    
    span.innerHTML = user.user_metadata.username;
    console.log("LOGGED IN USER ID:", user.id);

// User_recipe:-
     const { data: recipes, error } = await client
    .from("Receipe")
    .select("*")
     .eq("users-id", user.id);
console.log("RECIPES:", recipes);

console.log("RECIPES:", recipes);
console.log("ERROR:", error);


    //users-IMAGES:-

recipes.forEach((recipe) => {

    console.log(recipe);
    console.log(recipe.image_path)

        // Get:-
  const { data:userUrl } = client
  .storage
  .from('images')
  .getPublicUrl(recipe.image_path)
  console.log(userUrl.publicUrl);
  console.log(userUrl.publicUrl);
//   let imageurl = userUrl.publicUrl

    mainid.innerHTML += `
        <div class="recipe-card">

          <div class="recipe-image biryani">
                    <img src="${userUrl.publicUrl}?t=${Date.now()}" alt="pic">
                </div>


            <div class="recipe-content">

                <span class="category">
                    ${recipe.category}
                </span>

                <h3>${recipe.recipename}</h3>

                <p>${recipe.description}</p>

                <div class="recipe-bottom">
                    <span>⭐ 5.0</span>
                    <span>⏱ ${recipe.cookingTime}</span>
                </div>

                 <div class="recipe-bottom">
                       <button class="editbtn">Edit</button>
                       <button class="deletebtn">Delete</button>  
                    </div>
            </div>
        </div>
    `;
});

let editbtn = document.querySelectorAll(".editbtn");
let deletbtn = document.querySelectorAll(".deletebtn");

console.log(editbtn , deletbtn);

editbtn.forEach((btn , index) =>{
       btn.addEventListener("click",async()=>{
      let student = recipes[index];
      console.log(student);
  //sweets alerts :-
  const { value: formValues } = await Swal.fire({
  title: "Multiple inputs",
  html: `
    <input id="swal-input1" class="swal2-input" placeholder="Name" value="${student.category}">
    <input id="swal-input2" class="swal2-input" placeholder="Course" value="${student.recipename}">
    <input id="swal-input3" class="swal2-input" placeholder="Course" value="${student.description}">
    <input id="swal-input4" class="swal2-input" placeholder="Course" value="${student.cookingTime}">


  `,
  focusConfirm: false,
  preConfirm: () => {
    return [document.getElementById("swal-input1").value,
       document.getElementById("swal-input2").value,
       document.getElementById("swal-input3").value,
       document.getElementById("swal-input4").value
    ];
  }
}
);
console.log(formValues);

const updateDta ={
  category : formValues[0],
  recipename: formValues[1],
  description: formValues[2],
  cookingTime: formValues[3],
}

const { error } = await client
  .from('Receipe')
  .update(updateDta)
  .eq('id', student.id);

  window.location.reload();

})

})

deletbtn.forEach((btn,index) =>{
    btn.addEventListener("click",async(e)=>{
  e.preventDefault();
  let student = recipes[index];
  console.log(student.id);
  // Deleted
  const response = await client
  .from('Receipe')
  .delete()
  .eq('id', student.id);
  window.location.reload();
    })
})

};

getuser();



// events:

 logoutbtn && logoutbtn.addEventListener("click",async()=>{
     const { error } = await client.auth.signOut()
if(error){
    console.log("okk");
}else{
    console.log("signout!");
    window.location.href = "index.html"
}
});



 recipebtn && recipebtn.addEventListener("click",()=>{
    window.location.href = "recipe.html"
});




