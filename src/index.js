console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', ()=>{
    //DOM elements
    const breedDropdownEl=document.getElementById('breed-dropdown')

    // global variables
    let dogImages=[]
    let allBreeds=[]

    //api
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    function renderImages(data){
        const dogImages=data.message.map(img=>{
            const div = document.createElement('div')
            div.className='dogsImg'
            div.innerHTML=`
                <img src=${img} alt='dog images'/>
            `
            document.getElementById('dog-image-container').appendChild(div)
        })
        return dogImages
    }

    function renderBreeds(breed){
        document.getElementById('dog-breeds').innerHTML=``
        const dogBreedsKeys = breed.map(ele=>{
                const li = document.createElement('li')
                li.textContent=ele
                li.style.cursor='pointer'
                li.addEventListener('click', ()=>{
                    li.style.color='red'
                })
                document.getElementById('dog-breeds').appendChild(li)
        })
        return dogBreedsKeys
    }

    // events
    function handleDropdownFilter(dropdown){
        dropdown.addEventListener('change', (e)=>{
            const letter = e.target.value
            const filteredBreeds = allBreeds.filter(breed=>breed.startsWith(letter))
            renderBreeds(filteredBreeds)
        })
    }    
    
    //fetch function
    async function fetchDogsImg(api){
        const res = await fetch(api)
        const data = await res.json()
        dogImages=data.message
        renderImages(dogImages)
        
    }

    async function fetchDogsBreeds(api){
        const res = await fetch(api)
        const data = await res.json()  
        allBreeds=Object.keys(data.message)
        renderBreeds(allBreeds)
    }


    fetchDogsImg(imgUrl)
    fetchDogsBreeds(breedUrl)
    handleDropdownFilter(breedDropdownEl)
})