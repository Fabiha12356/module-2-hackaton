const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);




let recipefrom = document.querySelector("#recipefrom");
console.log(recipefrom);




recipefrom && recipefrom.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let userDta =  new FormData(recipefrom)
console.log(userDta);
let userInfo = Object.fromEntries(userDta);
console.log(userInfo);
console.log(userInfo.recipename);
console.log(userInfo.category);
console.log(userInfo.cookingTime);
console.log(userInfo.description);

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

    alert("All fields filled ✅");
    console.log(userInfo);
    const { error } = await client
  .from('Receipe')
  .insert({ 
           "recipename": userInfo.recipename,
            "category": userInfo.category,
            "cookingTime": userInfo.cookingTime,
            "description": userInfo.description
   })
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