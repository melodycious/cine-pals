import { useNavigate } from "react-router-dom";


const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      usuario: {},
      userId: "",
      token: "",
      pelis: [],
      name: "",
      series: [], 
      nombreUsuario: {}

     
    },
    actions: {
      
      /* ESTE ES EL REGISTRO */

      getCrearUsuario: async (email, password) => {
        const myHeaders = new Headers();
        myHeaders.append(
          "Cookie",
          ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxO30RoRPnzCyE2EvGPJ2_lFViz1YIAA-jEUGdcdelZBYTQFl53QaWCjaNhnc2kzjFZIutFf5dUAAWGas4QGqMYkD6-wtQAAHE-IPzWo7LDgT1Ea-RmCRJdbdxk_RdNt2gPZ66txhUxSwQ1fHqgIcKrd89ghUAXyX7WkcUFPLzG_cnv7lTaEKxks4QvxrspvZg1AE2i0QDzFit-umbebIcrlfLZe8r04ZvQ6hkZV8pX37qWVVq0szpedgLuqDzXy_Do9qRTSSdBd-OGc02pgmbH5lvNWumyipLPGw2ne3J8Q_21tzj6rng_EoSxiSIFZucLlZgT4BMX1Itcb97xfhUv19mHWH_T2bO3y8hfwEtA97-lzMdwKecrbR7JX94QLgeV8aSsiRfBkjEVYYjml51wJx3Mnst8kgzOBSWmSiqPb9Sk7zHh6bLnFfj_aNJmFEgc4Bc-O0E14rAxhDGpvx21iDc9vZ-bgFBsaGhe-7xEZQNLA8rvpxvcOY1Xg-NBXijVBYAmx9Y0WvA-L0w3FQPfHLJV3iNfr6pK6lwQyVz2YgRSYf3KmWcFqMo-nJC_FF757_XwlppbZyiIpXVYtWavlpNefyO4Hax3mxAMqDO32RSjdLCVnbXjqLplAUX2CvFf8Sy6rheHXgfgtVwPv-IH8s7lUtZZTkui3jtUWVDmuHrUlNzT7PHEs4-q3EwDehyjXQXbllqqKeXyzCjwq4rO56KBodCSgQ6Nyf3VLGy7p6SjjKFn2SN2I-doBCg0KAJ4PBLrbtMbhdwPbGBnehpoW93GQZY1BURjA4DR_6COupJZKv2vGRBZEyl05XtxY-4gNBqRWDpZVkDCFpwSgkDWwFdx7EciiP5YX_3N-JFucwDaTvWH3m9nSG63QQ200UDFy8jR89kUCDklNOR7QTa79UImovl1G9A0zdlAG9UAoAS7ROKCSZtYcRVVH2veqwdsakViRZ5sLkgRObMWc-lwn"
        );
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          email: email,
          password: password,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          `${process.env.BACKEND_URL}/api/signup`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      },

      /* ESTE ES EL LOGIN */

      getLogin: async (email, password) => {
        console.log(email, password)
        const myHeaders = new Headers();
       
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          email: email,
          password: password,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          `${process.env.BACKEND_URL}/api/login`,
          requestOptions
        )
        .then((response) => response.json())
        .then((result) => {
            setStore({ token: result.access_token, userId: result.userId });
            console.log('result: ' + JSON.stringify(result));
            // Llamar a getTraerUsuario justo después de obtener el token y el userId
            getActions().getTraerUsuario(result.userId);
        })
        .catch((error) => console.log("error", error));
      },

      /* ESTE ES EL LOGOUT */

      getLogout: async (navigate, token) => {
        console.log("Saliendo");
        console.log(token);

        setStore({ token: "" });
        navigate("/login");
      },


      /* ESTE ES EL GET DE LAS PELICULAS */

      getTraerPeliulas : async () => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzQ3OTJjYmM2M2QyNGVjMjE3Yzk0ZTExYWI0YjA2YyIsInN1YiI6IjY2M2Q0YWY0ZTBkNDdhNjc3YzMwMDU4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m8apju8RrkFJoZK8iTvLDshA6b6R-ehBfF8rstG_E8w'
          }
        };
        
        fetch('https://api.themoviedb.org/3/movie/now_playing', options)
          .then(response => response.json())
          .then((data) => setStore ({pelis: data.results}))
          .catch(err => console.error(err));
      },
      
      /* ESTE TE TRAER EL NOMBRE DE LA LISTA */

      getTraerTitulo : async () => {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxP7z1SIMXf07yfX787BPAhxukgyD3MYfMXC7R7A8Cw6FSW9H1bfykwAxOx9PUttUyEn3ITLYNOu6G-aape9TBM4cLNzLt4EnCW-e3ulkBkdwNEtSLjoFk1fk8keaf_tXs_PB7-ZgA0UtKgxK3lKM9-krBVIPdut6bbgbocB-qKvCMtgGgiYpwo7e1KbtSYEkIndRapjHZ4aP_j3sTzcNCmEJTPIKU7rZzaB2GKNQqF7pHHRcLSHBvEfxD1eI2K9NtTWhLderwvVnnMEgorl7IPbehVpF3zq7fBfN5s1CjMxnNX1YUMuSoo2lUlOteRw4Y1X-FdiHe9iPorhTwgUWCIvMIJ0fPHl0wUW4NNW6uzCzSRsy2qMWIyk3eOHQdJWx1Y2nBo6kL_33JhW12zd3wpdjMAEOy0D61dWRp_dh6QMKJEgiqMeouFU5OwFOUH3ZX8yf0ijY0GgZ57Bq8aE6V5A6AYVm3KaMFZUqJ8MGiAaQW1eMkgUcd_6bm6nuG7woAnsYkxlFADc1ClAGWiBjuMSwcUdFF8YezSLqWtC8RLopeWT52ujgkHNjYJbbX2OgfhjmxlGxMi7RaVH5rbR-lOJw4-WPUxo4QNAGPeJH-BzYEC-KQZIDIwWpmZ4wGM4Cdu6z7DNqRWNxIORWenwBnbwOhhs4qLFbW4zSH8u-JIXBdQZj59it8Dy3hlfRC-1n42KDEq5QU8se6MiJ9dYl19IXC7LXXj3r9kpcXTNdKsCMlfG3Z_Hq4IHc8ko2iEwCC-HchwtzItFFgVmiFJzgG-ElAz3RUOhtNmMa91Hpa4g78b6sKsiVXMMd_EVcl-TjB2_SXiAeyET_Ju-wAk3AnU9In0WeE-rn9K2zHUVieKncoDU5QyhnU_sVtzg1Y9moHOxrzCNW1bo1rYPrMJhCcwXP_C4fKIG7zYFsGOYmpsus_uKN9Wc32w2QNvZVJroxhevXwHCna6Ulh9O_YK5-T3yoYuV92na-i7ly7tfmjS6Gg");
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        await fetch(
          `${process.env.BACKEND_URL}/api/lists/7`,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => console.log(data))
          
          .catch((error) => console.log("error", error));

      },

      /* TRAE LAS SERIES*/

      getTraerSeries : async () => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzQ3OTJjYmM2M2QyNGVjMjE3Yzk0ZTExYWI0YjA2YyIsInN1YiI6IjY2M2Q0YWY0ZTBkNDdhNjc3YzMwMDU4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m8apju8RrkFJoZK8iTvLDshA6b6R-ehBfF8rstG_E8w'
          }
        };
        
        fetch('https://api.themoviedb.org/3/tv/on_the_air', options)
          .then(response => response.json())
          .then((data) => setStore ({series: data.results}))
          .catch(err => console.error(err));
      },

      /* trae usuario */

      getTraerUsuario : async () => {

        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        await fetch(
          `${process.env.BACKEND_URL}/api/users/1`,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => setStore ({nombreUsuario: data}))
          .catch((error) => console.log("error", error));

      },


 

       









      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
