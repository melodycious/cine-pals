import { useNavigate } from "react-router-dom";


const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      usuario: {},
      userId: {},
      token: "",
      latestMovies: [],
      lista: {},
      listas: [],
      allInfo: [],
      movie: [],
      pelis: [],
      name: "",
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
          .then((response) => {
          /*   if (!response.ok) {
              throw new Error("La solicitud no fue exitosa");
            } */
            return response.json();
          })

          .then((result) => {
            setStore({ token: result.token });
            setStore({ userId: result.userId });
            console.log(result);
          })

          .catch((error) => console.log("error", error));
      },

      /* ESTE ES EL LOGOUT */

      getLogout: async (navigate, token) => {
        console.log("Saliendo");
        console.log(token);

        setStore({ token: "" });
       /*  navigate("/login"); */
      },



      /* PRUEBA PARA TRAER LAS ULTIMAS PELIS */

      getMoviesLanding: async () => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTUwZDQyNjQ2NGQxOGY0ZGRjMGM3ZWEwZjFjNTU2MyIsInN1YiI6IjY2NDI0ZTQ3M2MzMGM1ZjRhYzNhMWQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1qYEcWtzCfR7JEiJLg5B4Nn9WdrFrwydfN68kLVNf-o'
          }
        };
        
        try {
          const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1', options);
          const result = await response.json();
          setStore({ latestMovies: result.results });
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      },

    
    // prueba para buscador, busca pelis y series en la BBDD de la api

    
      getAllMoviesSeries: async (query) => {

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTUwZDQyNjQ2NGQxOGY0ZGRjMGM3ZWEwZjFjNTU2MyIsInN1YiI6IjY2NDI0ZTQ3M2MzMGM1ZjRhYzNhMWQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1qYEcWtzCfR7JEiJLg5B4Nn9WdrFrwydfN68kLVNf-o'
          }
        };

        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=es-ES&page=1`, options);
          const result = await response.json();
          setStore({ allInfo: result.results });
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      },


      // pruebas codigo Lucia

      getMovie: async (id) => { 
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTUwZDQyNjQ2NGQxOGY0ZGRjMGM3ZWEwZjFjNTU2MyIsInN1YiI6IjY2NDI0ZTQ3M2MzMGM1ZjRhYzNhMWQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1qYEcWtzCfR7JEiJLg5B4Nn9WdrFrwydfN68kLVNf-o'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, options)
          .then(response => response.json())
          .then((response) => {
            setStore({ movie: response });
            console.log(response);
          })
          .catch(err => console.error(err));
    
        /* try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, options);
            
            const data = await response.json();
            setStore({ movie: data });
        } catch (error) {
            console.error('Error fetching movie details:', error);
        } */
    },


    getEditUser: async (id, nombre, email, password) => {
      const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxOnQLzo-WJT0sdNJZNG7IgDqzf0wx2UZHMzZR7RT1nhj0nL-YWwVG3-6OezD5YyZU-yGJ-oLH0l59d7K3yqi1qPUhFDQR7qemGeagONwwzHiwMP_J6ygdX3kyv-ZbLpkaXpKct2nK31pQ3W0CAe6E53vJgkkD5OwK8unsX01i9OoOpc8Nq3K2QiCJi2-v3dXCjiN9I_aIjFXasSUpWzfmNrY-wb3pnWOk50P-oB6YDI9sKg9rOSAA2saBKqE26Xdy2cLLEcOGx6JOpD61bEKvf2zyljqMFC8KKDzNUHDNYa7UoMCZfaasXiTmKiLpfRomvnyvSlDEKJU9CVf9FYTWnoXxUvUxT87NwcsCU4rcXK3iZTfH4D-y8HNKJmgs5b9xYX7ObkSceZ3fc3lLeTR5UbgFLpC_oAQzC83xZdyoi2CcvuDttZxvZlZp-BQeK914GtjsUMOX52Z11jYYt1K2VYT3kfE6neBVCYRsOUEph1hH1vUO9VrHCNXgo8CX41VFvG-AptW4VfGd_hMsMNDuwra20aE7BMRr_b2MFv5DkDtGOvR6pwxnFZe1pWlqPsl3RKRnJcQjzLZDp8AIbw-xjvr04pd7vakywW3VX57OtjrljsMwjDcfqNjZwfcbGGNcC834e-PWgP1RwDIJImHStWHosYE3i5G6139n5SFYLp6gTdpxU1trh1aVJk5K3ov0S4L6t4sXQDZmMJfB-JPyKFcrOmYKuyzkA6PjRyWDzpXQIQd_HOhyxUIiiHt3WF7PE93KOcJ3mlRvS1fxr662rf7i2PFAJaM5XnArnrEuN4qlMd9iki6lATuYU2omXlbVTidSjTx_eag_nyXEfJdysUTa4fMKExJqEzzRv0rYkRMSE-PhbjAHUxQBHisVdTcdJ_Fmf2tDRAHzZsgupUeI3BHwjuK-B4T4lzwAyi3ReDNPgXnImSfn9vLW_2VzDfa0X9JIvcT9d-ZUY8EUotGQGa");

          const raw = JSON.stringify({
            "email": email,
            "password": password,
            "name": nombre
          });

          const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };

          fetch(`https://psychic-space-carnival-x55p5rqv6wvxc6gr7-3001.app.github.dev/api/users/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => setStore({ usuario: result }))
            .catch((error) => console.error(error));

    },

    getDeleteUser: async (id) => {
      const myHeaders = new Headers();
        myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxORm-9RVJfLsAAtN5lJiZYaB2XUzMRB5Zdr_Iw1KrO0yFWAzzt-zLjcTqenqh2VivhDRmQp-r_q1nVh0-RWYojbiNAXJEGXBiyrualJseX-5N-7Z9BSE_caxVtu8LtDBh7UVckO3dKZh_HSU21SrE5kSa5HW7jmJMM-Pk5_mlp_AZE8t5GOy9H1UfmXHxDBhx97xQMAq2jZIfaqQ0iQcQaabhUWFqdgX9qODzUAn9AkP-TGBnw38BVoEDOF2t1ZUeUoQ9zanuFZr14fnJACKrzpolhZjWPPkEtFokqEOqid2dgnqhFnUliVd-Bzdci3VyjYrG7EWDtqIcWTrxg8tb-wY1Re_hG_3XezLPeKf9ap9qicWZdAfGHOsJGUrFDPbOGSSX3e39M30UHlYyf7hphGlghcXAJqThQtBX1I8MA93TVyqEFi4UfZaoZHmecgecRyqRFisHtRVoKLLfg5DEgbRVDVSpUoJVaVZ9BBem-jRkXrDkUeTRyb7OwDLsiFFZ_bfHFTsH34qsWcuNsk5mRhx5drKK4qw4T37yo6fQRYUGWvPFqzGD647wT-Qhb8yvA5RoRC9ef1Vj7i6rY5dT6o6rzBEvL5Pm3AxLmAwSj2JyEjdWPefHeRDxabbDSV6kSfdjYFFijLRIyYTpU5oZAmsYiUQKU24g-epvrjqNJJaFp7f58MKYIFppIdkscG7oQHY15yvgOgJNbaJmPUv0SD3KlZtaZBoMIkt6Dqr4CjDKUt1ImlDbS8q1X--mIR3Z6Go04cl_qUnsiINVedkIgpEWOgUxxMxS6F87iBD1qNEfNLwELe9Uxh4teiocBCgSdqJmsi23Vsjq7JItFPAQSY2IyFHx4bDiT0OYKSjP8ZzNgNkGq894Nd_QxFgGVfh2U_tX_8cD6RaKA3uTYRrqBUWXhc0PYN8gJ_ps0umQWuClGFM1vm2F_s0WHpmwKpttqW-8z7M1vzTCvBEbwXM25P");

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow"
        };

        fetch(`https://psychic-space-carnival-x55p5rqv6wvxc6gr7-3001.app.github.dev/api/users/${id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => setStore({ usuario: result }))
          .catch((error) => console.error(error));
    },


      getCrearLista: async (name) => {
        const store = getStore();
        const token = store.token;
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        const raw = JSON.stringify({
            name: name,
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
    
        fetch(`${process.env.BACKEND_URL}/api/lists/${store.userId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => setStore({ lista: result }))
            .catch((error) => console.error(error));
    },
      
    getEditarLista: async (name, id) => {
      const store = getStore();
      const token = store.token;
  
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      const raw = JSON.stringify({
          name: name,
      });
  
      const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
      };
  
      fetch(`${process.env.BACKEND_URL}/api/lists/${id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
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
