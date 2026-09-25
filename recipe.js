const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);




let recipefrom = document.querySelector("#recipefrom");
console.log(recipefrom);

let file;
let imageURL;
let  avatarFile ;
let user ;

let recipeImage = document.querySelector("#recipeImage");
let Recipe_imgdiv = document.querySelector("#Recipe-imgdiv");


//fuction:-
let getuser = async()=>{
    const { data: authData, error: authError } =
    await client.auth.getUser();

if (authError || !authData.user) {
    console.log("User login nahi hai");
    return;
}

 user = authData.user;
 console.log(user)
}
getuser();
recipeImage.addEventListener("change",()=>{
    console.log("okkkkkkk")
    console.log(recipeImage.files[0]);
       file = recipeImage.files[0];
      imageURL = URL.createObjectURL(file);
    console.log(imageURL);
console.log(file)
Recipe_imgdiv.innerHTML = `<img src="${imageURL}" alt="pic">`
})


recipefrom && recipefrom.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let userDta =  new FormData(recipefrom)
console.log(userDta);
let userInfo = Object.fromEntries(userDta);

  let flag = true;

    for (let value of Object.values(userInfo)) {

        if (typeof value === "string" && value.trim() === "") {
            flag = false;
            break;
        }

    }
    if (!flag) {
        alert("Please fill all fields");
        return;
    }

    // IMAGE:-
  avatarFile = recipeImage.files[0];
const { data, error:imageerror } = await client
  .storage
  .from('images')
  .upload(avatarFile.name, avatarFile, {
    cacheControl: '0',
    upsert: false
    })
  console.log(data);
  console.log(imageerror);
  
if(data){
    console.log("data come")
}else{
    console.log(imageerror);
}

    //RECIPE
    const { error } = await client
  .from('Receipe')
  .insert({ 
           "recipename": userInfo.recipename,
            "category": userInfo.category,
            "cookingTime": userInfo.cookingTime,
            "description": userInfo.description,
             "users-id": user.id
   })
//CONDITIONS:-
if(error){
    console.log(error);
     Swal.fire({
  icon: "error",
  title: "Something Went Wrong!",
  text: "Try Again",
         });
}else{
    console.log("okk");
    //sweetalert:-
            Swal.fire({
  title: "Add Recipe!",
  icon: "success",
  draggable: true
});
window.location.href = "dashboard.html";
}
});

