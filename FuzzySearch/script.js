class Fuzzy {
  constructor(repositoryData) {
    this.state = {
      repositoryData
    };
  }

  getArrayOfRepoNames() {
    return this.state.repositoryData.map(obj => obj.name);
  }

  searchQuery(text, query) {
    query = query.replace(/\ /g, '').toLowerCase();
    let query_position = 0;
    for (let n = 0; n < text.length; n++) {
      let text_char = text[n];
      if(query_position < query.length && text_char.toLowerCase() == query[query_position]) {
        query_position += 1;
      }
    }
    if (query_position != query.length) {
      return false;
    }
    return true;
  }

  search(query) {
    const repoNames = this.getArrayOfRepoNames();
    const listOfIndexes = repoNames.reduce((accumulator, name, i) => {
      if (this.searchQuery(name, query)) {
        accumulator.push(i);
      }
      return accumulator;
    }, []);
    const result = listOfIndexes.reduce((accumulator, currVal) => {
      accumulator.push(this.state.repositoryData[currVal]);
      return accumulator;
    }, []);
    return result;
  }
}

(function() {
  const api = 'https://api.github.com/users/facebook/repos';
  document.getElementById('searchForm').addEventListener('submit', e => {
    e.preventDefault();
  });

  fetch(api)
    .then(function(response) {
      return response.json();
    })
    .then(function(repoData) {
      const fuzzy = new Fuzzy(repoData);
      document.getElementById('searchTextbox').oninput = (e) => {
        const val = e.target.value;
        const rootElement = document.getElementById('resultView');
        rootElement.innerHTML = '';
        if (val.length > 0 ) {
          const result = fuzzy.search(val);
          const resultElement = document.createElement('div');
          resultElement.className = 'list-view';
          if (result.length > 0) {
            for(let obj of result) {
              const item = document.createElement('div');
              item.className = 'item';
              const link = document.createElement('a');
              link.href = obj.svn_url;
              link.target = '_blank';
              link.innerHTML = obj.name;
              item.appendChild(link);
              resultElement.appendChild(item);
            }
          } else {
              const item = document.createElement('div');
              item.className = 'item';
              item.innerHTML = 'Your query did not match any repository, try a different keyword';
              resultElement.appendChild(item);
          }
          rootElement.appendChild(resultElement);
        }
      }
    })
    .catch((error) => {
      console.log(error)
    });
})();
