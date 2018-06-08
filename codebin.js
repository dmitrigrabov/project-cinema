// fetch call and returning elements to html

    // fetch API call
    fetch(createUrl())
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            let movieData = data.Search;
            console.log(Object.keys(data))
            call movieMap() function
            //     everything below this works
            return movieData.map(function(item){
                const itemKeys = Object.keys(item);
                const itemArr = Object.values(item);
                // console.log(itemKeys);
                console.log(itemArr);
                const newNode = createNode('li');
                newNode.innerHTML = itemArr[0] + ': ' + itemArr[1];
                returnedMovies.append(newNode);
                const newImg = createNode('img');
                newImg.src = itemArr[4];
                const newLink = createNode('a');
                const movieLink = itemArr[2]
                newLink.href = `https://www.imdb.com/title/${movieLink}/`;
                returnedMovies.append(newNode, newImg);
                returnedMovies.append(newImg, newLink);
                console.log( itemArr[0] );
            })

        }).catch(function (error) {
            console.log('unsuccessful' + error);
        })
