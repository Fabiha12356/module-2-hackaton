const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);


let span = document.querySelector("#userName");
let recipebtn = document.querySelector("#recipebtn");
console.log(recipebtn);
console.log(span);
console.log(span.innerHTML);



//fuction
let getuser = async () => {

    const { data: authData, error: authError } =
        await client.auth.getUser();


    if (authError || !authData.user) {
        console.log("User login nahi hai");
        return;
    }

    const user = authData.user;

    console.log("USER:", user);
    console.log("USERNAME:", user.user_metadata.username);
    
    span.innerHTML = user.user_metadata.username;

};

getuser();



// events:


 logoutbtn.addEventListener("click",async()=>{
     const { error } = await client.auth.signOut()
if(error){
    console.log("okk");
}else{
    console.log("signout!");
    window.location.href = "index.html"
}
});


recipebtn.addEventListener("click",()=>{
    window.location.href = "recipe.html"
});

let mainid = document.querySelector("#mainid");
console.log(mainid.innerHTML);


