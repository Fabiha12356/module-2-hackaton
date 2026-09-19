const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);


let loginbtn = document.querySelector("#loginbtn");
let signupbtn = document.querySelector("#signupbtn");
let signupForm = document.querySelector("#signupForm");
let loginForm = document.querySelector("#loginForm");
let inputs =document.querySelectorAll("input");

console.log(loginForm);
console.log(signupForm);

console.log(loginbtn);
console.log(signupbtn);


 signupbtn && signupbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = "/signup.html"
})


loginbtn && loginbtn.addEventListener("click",(e)=>{
     e.preventDefault();
    window.location.href = "/login.html"
})


signupForm && signupForm.addEventListener("submit",async(e)=>{
      e.preventDefault()
    console.log("okkk")
    let userDta = new FormData(signupForm);
    let userInfo = Object.fromEntries(userDta);
    console.log(userInfo);
    console.log(userInfo.username);

    //Database insert:-
    const { error } = await client
        .from('Users-data')
        .insert({
            "name": userInfo.username,
        }
        )
        if(error){
            console.log(error)
        }else{
            console.log("okkkk")
        }

          //Auth
    const { data, error: usererror } = await client.auth.signUp({
        "email": userInfo.email,
        "password": userInfo.password,

        //metadata:-
        options: {
    data: {
        username: userInfo.username
    }
}
    })
    console.log(data);
    console.log(usererror);
    inputs.forEach((input) =>{
        input.value = "";
    })
       if(data){
        //sweetalert
        Swal.fire({
  title: "SignUp!",
  icon: "success",
  draggable: true
});



//nextpage:-
setTimeout(() =>{
 window.location.href = "dashboard.html"
},2000)
    }else{
         Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Try Again",
         });
    }


});


loginForm && loginForm.addEventListener("submit",async(e)=>{
      e.preventDefault()
    console.log("okkk")
    let userDta = new FormData(loginForm);
    let userInfo = Object.fromEntries(userDta);
    console.log(userInfo);

    
    //logIn:-
const { data, error } = await client.auth.signInWithPassword({
    email: userInfo.email,
    password: userInfo.password
});

console.log("LOGIN DATA:", data);
console.log("LOGIN ERROR:", error);

if (error) {
    Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message
    });
    return;
}

if (data.session) {
    Swal.fire({
        title: "LogIn!",
        icon: "success"
    });

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 2000);
}
    inputs.forEach((input) =>{
        input.value = "";
    })
});


let recipefrom = document.querySelector("#recipefrom");
console.log(recipefrom);


recipefrom && recipefrom.addEventListener("submit",(e)=>{
    e.preventDefault();


    let userDta =  new FormData(recipefrom)
console.log(userDta);
let userInfo = Object.fromEntries(userDta);
console.log(userInfo);

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
    window.location.href = "dashboard.html"


});






