const loader = document.querySelector('.loader');
const post_container = document.querySelector('.posts');
const filter = document.querySelector('.filter');

let limit = 7;
let page = 1

async function fetchdata(){
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    let jsondata = await res.json();
    let data = await jsondata;

    return data;
}

function showdata(data){
    data.forEach(post =>{
        const postele = document.createElement('div');
        postele.classList.add('post');
        postele.innerHTML =`
        <div class="id">
                ${post.id}
            </div>
            <h2>
               ${post.title}
            </h2>
            <p>
                ${post.body}
            </p>
        `
        post_container.appendChild(postele);
    })
}

function updatedata(){
    loader.classList.add('active');

    setTimeout(async ()=>{
        let data = await fetchdata();
        showdata(data);
        loader.classList.remove('active');
    },500)
}

function filterupdatedata(){
    let term = filter.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post =>{
        let titledata = post.querySelector('h2').innerText.toUpperCase();
        let bodydata = post.querySelector('p').innerText.toUpperCase();

        if(titledata.includes(term) || bodydata.includes(term)){
            post.style.display = 'block';
        }else{
            post.style.display = 'none';
        }
    })
}


updatedata()

window.addEventListener('scroll',()=>{
    let top =  document.documentElement.scrollTop;
    let totalheight = document.documentElement.scrollHeight;
    let clientheight = document.documentElement.clientHeight;

    if(top + clientheight >= totalheight){
        page++;
        updatedata();
        filterupdatedata();
    }
})

filter.addEventListener('input',filterupdatedata);







