function html5localStorage(localStorageIdentifier){
         this.saveData = saveData;
         this.resetAllData = resetAllData;
         this.displayData = displayData;
      }

      function saveData(item){
        localStorage.setItem(localStorageIdentifier, JSON.stringify(item));
        console.log(item + " - Saved!!!!")
      }

      function displayData(){
        return JSON.parse(localStorage.getItem(localStorageIdentifier));
      }

      function resetAllData(){
        localStorage.removeItem(localStorageIdentifier);
        console.log("Data erased!!!!");
      }
