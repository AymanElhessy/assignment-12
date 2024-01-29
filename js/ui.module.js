const show = document.querySelector('#show');
const loader = document.querySelector('.loader');


// get all games
export async function getData() {
    loader.classList.remove('d-none');
    show.classList.add('d-none');
  const request = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games",
    {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': 'e24ee579ddmshd31c21eb3b6b0aap15bdfejsnfd70a35feebe',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
    }
  );
  if(request.status == 200){
    const result = await request.json();
    showData(result);
    loader.classList.add('d-none');
    show.classList.remove('d-none');
  };
};

// get games by category name
export async function getDataByType(type){
    loader.classList.remove('d-none');
    show.classList.add('d-none');
    const request = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${type}`,{
        method: 'GET',
	    headers: {
        'X-RapidAPI-Key': 'e24ee579ddmshd31c21eb3b6b0aap15bdfejsnfd70a35feebe',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
	}
    });
    if(request.status == 200){
        const result = await request.json();
        showData(result);
        // console.log(result);
        loader.classList.add('d-none');
        show.classList.remove('d-none');
    };
};


// display data on screen in html
export function showData(gamesList){
    let container = '';
    for(let i=0 ; i < gamesList.length ; i++ ){
        container += `
        <div class="col-xl-3 col-lg-4 col-md-6">
                    <div data-game-id=${gamesList[i].id} class="game-card rounded-2 text-white position-relative cursor-pointer">
                        <div data-game-id=${gamesList[i].id} class="m-3 overflow-hidden game-card-content">
                            <img data-game-id=${gamesList[i].id} class="w-100 game-card-image" src="${gamesList[i].thumbnail}" alt="${gamesList[i].title}">
                            <div data-game-id=${gamesList[i].id} class="d-flex justify-content-between align-items-center">
                                <h3 data-game-id=${gamesList[i].id} class="game-card-header mt-3">${gamesList[i].title}</h3>
                                <span data-game-id=${gamesList[i].id} class="free-btn btn">Free</span>
                            </div>
                            <p data-game-id=${gamesList[i].id} class="game-card-pragraph text-secondary mb-5 text-center">${gamesList[i].short_description}</p>
                        </div>
                        <div data-game-id=${gamesList[i].id} class="game-card-footer d-flex justify-content-between position-absolute">
                            <span data-game-id=${gamesList[i].id} class="game-type rounded-3">${gamesList[i].genre}</span>
                            <span data-game-id=${gamesList[i].id} class="game-workson rounded-3">${gamesList[i].platform}</span>
                        </div>
                    </div>
                </div>
        `
    };
    show.innerHTML = container;
};
