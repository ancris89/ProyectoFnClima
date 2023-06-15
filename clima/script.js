function consultarClima(){

    const ciudad= document.getElementById('ciudad').value; 
    const API_KEY= '08a9f4f7b0c0bdd8b4d69d6022b6eb8b';
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;

    fetch(url)
    .then(response =>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Error en la respuesta de la API');
        }
    })
    .then(data =>{
        //mostrar los resultados en la tabla
        const tabla= document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        const fila= tabla.insertRow();
        console.log(data);
        fila.insertCell().innerHTML= data.name;
        fila.insertCell().innerHTML= `${(data.main.temp -273.15).toFixed(1)}°C`;
        fila.insertCell().innerHTML= data.weather[0].description;
        fila.insertCell().innerHTML= data.main.pressure;
        fila.insertCell().innerHTML= data.main.humidity;
    })
    .catch(error =>{
        console.log('Error al consultar el clima',error);
    })
}

function consultarClimas(){
    const ciudades= document.getElementById('ciudades').value.split(',').map(ciudad=> ciudad.trim());
    const API_KEY= '08a9f4f7b0c0bdd8b4d69d6022b6eb8b';
    
    Promise.all(ciudades.map(ciudad =>{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;
        return fetch(url).then(response=>{
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error('Error en la respuesta de la API');
            }
        });
    }))
    .then(data =>{
        //mostrar resultados en la tabla
        const tabla= document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        data.forEach(ciudad=>{
            const fila= tabla.insertRow();
            fila.insertCell().innerHTML= ciudad.name;
            fila.insertCell().innerHTML= `${(ciudad.main.temp -273.15).toFixed(1)}°C`;
            fila.insertCell().innerHTML= ciudad.weather[0].description;
            fila.insertCell().innerHTML= ciudad.main.pressure;
            fila.insertCell().innerHTML= ciudad.main.humidity;
        });
    })
    .catch(error =>{
        console.log('Error al consultar el clima',error);
    });
}
function limpiarTabla(){
    //mostrar resultado en la tabla
    const tabla= document.getElementById('tabla-clima').getElementsByTagName('tbody');
    for(let i= 0; i<tabla.length; i++){
        tabla[i].innerHTML="";
    }
}
