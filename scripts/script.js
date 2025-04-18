const navBar = document.getElementById('nav-bar');
const bannerSection = document.getElementById('banner-section');
const mainSection = document.getElementById('main-section');
const faq = document.getElementById('faq');
const footerSection = document.getElementById('footer-section');
const logBtn = document.getElementById('log-btn');
const logoutBtn = document.getElementById('logout-btn');
const pass = document.getElementById('pass');
const userName = document.getElementById('user-name');
logBtn.addEventListener('click', () => {
        if(userName.value == ""){
            alert("You didn't write any User Name. please write any name");
        }
        
        else if(pass.value == 123456 && userName.value != ""){
            navBar.classList.remove('hidden');
            bannerSection.classList.add('hidden');
            mainSection.classList.remove('hidden');
            faq.classList.remove('hidden');
            alert("Login Successful")
        }
        else{
            alert("Your password is incorrect. Correct Password is 123456")
        }
})
logoutBtn.addEventListener('click', () => {
    navBar.classList.add('hidden');
    bannerSection.classList.remove('hidden');
    mainSection.classList.add('hidden');
    faq.classList.add('hidden');
})

document.getElementById('faq-btn').addEventListener('click', () => {
    document.getElementById('faq').scrollIntoView({
        behavior: 'smooth'
    });
});
document.getElementById('les-btn').addEventListener('click', () => {
    document.getElementById('main-section').scrollIntoView({
        behavior: 'smooth'
    });
});




const loadingMain = document.getElementById('loading-main');
const loadingGif = document.getElementById('loading-gif')



const lessonContainer = document.getElementById('lessons');
fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(response => response.json())
    .then(json => {
        json.data.forEach(ldata => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline btn-primary lessons-btn';
            btn.innerHTML = `<p><i class="fa-solid fa-book-open"></i> Lesson - ${ldata.level_no}</p>`;
            lessonContainer.appendChild(btn);
    })

    const lessonsBtn = document.querySelectorAll('.lessons-btn')
    lessonsBtn.forEach((lessonBtn, index) => {
        lessonBtn.addEventListener('click', (event) => {
            lessonsBtn.forEach(lAbtn => lAbtn.classList.remove('btn-active'));
            lessonBtn.classList.add('btn-active')
            const wordCardCon = document.getElementById('word-card-con')
            wordCardCon.innerHTML = ""
            wordCardCon.className = 'grid grid-cols-3 p-8 bg-[rgb(248,248,248)] gap-8 rounded-3xl'
            let urlWbl = `https://openapi.programming-hero.com/api/level/${index + 1}`
            loadingGif.classList.remove('hidden');
            loadingMain.classList.add('hidden');
            fetch(urlWbl)
            .then(response => response.json())
            .then(json => {
                loadingGif.classList.add('hidden');
                loadingMain.classList.remove('hidden');
                if(json.data.length !== 0){
                    json.data.forEach(wdata => {
                        const wordCard = document.createElement('div')
                        let wMeaning;
                        if(wdata.meaning !== null){
                            wMeaning = wdata.meaning;
                        }
                        else{
                            wMeaning = "অর্থ নেই"
                        }
                        wordCard.innerHTML = `
                            <div class="bg-white p-10 rounded-xl h-[372px] flex flex-col justify-between">
                                <div class="font-inter flex flex-col justify-center items-center gap-6">
                                    <h1 class="font-bold text-3xl">${wdata.word}</h1>
                                    <h1 class="text-xl font-medium">Meaning / Pronounciation</h1>
                                    <p class="font-hindSiliguri text-3xl">${wMeaning} / ${wdata.pronunciation}</p>
                                </div>
                                <div class="flex justify-between items-center">
                                    <div class="btn btn-soft btn-circle flex justify-center items-center word-details btn-info">
                                        <i id="${wdata.id}" class="fa-2x fa-solid fa-circle-info"></i>
                                    </div>
                                    <div class="btn btn-soft flex justify-center items-center btn-info">
                                        <i class="fa-2x fa-solid fa-volume-high"></i>
                                    </div>
                                </div>
                            </div>
                        `    
                        wordCardCon.appendChild(wordCard);
                    })
                }
                else{
                        wordCardCon.className = 'flex justify-center items-center p-8 bg-[rgb(248,248,248)] rounded-3xl'
                        const alertCard = document.createElement('div')
                        alertCard.innerHTML = `
                            <div class="flex flex-col items-center justify-center gap-4 font-hindSiliguri">
                                <img src="assets/alert-error.png" alt="alert-error">
                                <p class="text-base">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                                <h1 class="text-4xl">নেক্সট Lesson এ যান</h1>
                            </div>
                        `
                        wordCardCon.appendChild(alertCard)
                }

                const wordDetails = document.querySelectorAll('.word-details');
                wordDetails.forEach(item => {
                    item.addEventListener('click', (event) => {
                        let wordDetailsUrl = `https://openapi.programming-hero.com/api/word/${event.target.id}`
                        fetch(wordDetailsUrl)
                        .then(response => response.json())
                        .then(json => {
                            my_modal_3.showModal()
                            document.getElementById('syn-con').innerHTML = " "
                            document.getElementById('word').innerText = json.data.word;
                            document.getElementById('pronunciation').innerText = json.data.pronunciation;
                            const meaning = document.getElementById('meaning');
                            document.getElementById('example').innerText = json.data.sentence;
                            if(json.data.meaning !== null){
                                meaning.innerText = json.data.meaning;
                            }
                            else{
                                meaning.innerText = "অর্থ পাওয়া যায়নি"
                            }
                            const synCon = document.getElementById('syn-con');
                            json.data.synonyms.forEach(syn => {
                                document.getElementById('syn-con').innerHTML += `<button class="p-2 rounded-md cursor-text bg-[rgb(237,247,255)] border border-[rgb(215,228,239)]">${syn}</button>`
                
                            })
                            
                        })
                    });
                });
            })
        })
    })
})

