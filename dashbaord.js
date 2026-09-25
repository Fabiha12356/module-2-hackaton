const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);


let span = document.querySelector("#userName");
let recipebtn = document.querySelector("#recipebtn");
// console.log(recipebtn);
// console.log(span);
// console.log(span.innerHTML);

let user;

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
    .select("")
     .eq("users-id", user.id);

console.log("RECIPES:", recipes);

console.log("RECIPES:", recipes[0].recipename);
console.log("ERROR:", error);


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

let mainid = document.querySelector("#mainid");
console.log(mainid.innerHTML);

 recipebtn && recipebtn.addEventListener("click",()=>{
    window.location.href = "recipe.html"
});

// if(window.location.pathname === "/dasboard.html"){
//      mainid.innerHTML +=`<div class="recipe-card">

//                 <div class="recipe-image pasta">
//                     ❤️
//                 </div>

//                 <div class="recipe-content">

//                     <span class="category">
//                         heart
//                     </span>

//                     <h3>Creamy Pasta</h3>

//                     <p>
//                         Delicious creamy pasta with fresh herbs.
//                     </p>

//                     <div class="recipe-bottom">
//                         <span>⭐ 4.9</span>
//                         <span>⏱ 25 min</span>
//                     </div>

//                 </div>

//             </div>
//     `

// }else{
//     console.log("okkkkkkk");
// }





// let getrecipe = async()=>{
//     const { data: recipes, error } = await client
//     .from("Receipe")
//     .select("*")
//      .eq("users-id", user.id);

// console.log("RECIPES:", recipes);
// console.log("ERROR:", error);
// }

// getrecipe();
