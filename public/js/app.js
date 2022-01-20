
let username;
let socket = io();

do {
  username = prompt("Please Enter Your Name")
} while (!username);


const textarea = document.querySelector("#textarea");
const submitBtn = document.querySelector("#submitBtn");

const commentBox = document.querySelector(".comment__box");

submitBtn.addEventListener("click" , (e) => {
    e.preventDefault()
    let comment = textarea.value

    if(!comment){
        return
    }
    postComment(comment)
});

const postComment = (comment) => {
   //Append to dom
   let data = {
       username,
       comment
   }
    appendToDom(data)
    textarea.value = ""

   //BroadCast
    broadCastComment(data)

   //Sync with Mongo
    syncWithDb(data)

}


const appendToDom = (data) => {

    let lTag = document.createElement("li");
    lTag.classList.add("comment")

    let markup = `
            <div class="card border-light mb-3">
            <div class="card-body">
                <h6>${data.username}</h6>
                <p>${data.comment}</p>
                <div>
                    <img src="/img/clock.png" alt="clock">
                    <small>${moment(data.time).format("LT")}</small>
                </div>
            </div>
        </div>
    `

    lTag.innerHTML = markup
    commentBox.prepend(lTag)

}

//BroadCast

const broadCastComment = (data) => {
    //Socket
    socket.emit("comment",data)
}

socket.on("comment", (data) => {
    appendToDom(data)
})

// Recived typing event from server

let timerId = null

const debounce = (func, timer) => {
  
    if(timerId){
        clearTimeout(timerId)
    }

   timerId = setTimeout(() => {
     func()
   },timer)
}


let typingDiv = document.querySelector(".typing")

socket.on("typing", (data) => {
    typingDiv.innerText = `${data.username} is typing...`
    debounce(() => {
      typingDiv.innerText = ""
    }, 500)
})

// Event listner on textarea

textarea.addEventListener("keyup" , (e) => {
    socket.emit("typing", { username })
})

// Api Calls

const syncWithDb = (data) => {
    const headers = {
        "Content-Type" : "application/json"
    }

    fetch("/api/comments",{ method: "POST", body: JSON.stringify(data),headers})
    .then(response => response.json())
    .then(result => {
        console.log(result);
    })
}

// Fetch comment

const fetchComments = () => {
   fetch("api/comments").then(res => res.json()).then(result => {
       result.forEach((comment) => {
           comment.time = comment.createAt
           appendToDom(comment)
       })
   })
}


window.onload = fetchComments