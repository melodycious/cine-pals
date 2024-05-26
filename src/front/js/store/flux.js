import { useNavigate } from "react-router-dom";


const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      usuario: {},
      lista: {},
      listas: [],
      userId: {},
      token: {}
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
        navigate("/");
      },



      getTraerUsuario: async () => {
        const store = getStore();
        console.log("Token en getTraerUsuario:", store.token);
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/users/${store.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.token}`
                }
            });
    
            if (response.status !== 200) {
                throw new Error("Error al obtener el usuario");
            }
    
            const data = await response.json();
            console.log("Datos del usuario:", data);
            setStore({ usuario: data });
        } catch (error) {
            console.error("Error al obtener el usuario", error);
        }
    },

    getEditUser: async (editedProfile) => {
      const store = getStore();
      try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/users/${store.userId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${store.token}`
              },
              body: JSON.stringify(editedProfile)
          });
          if (response.status !== 200) {
              throw new Error("Error al editar usuario");
          } 
          const data = await response.json();
          setStore({ usuario: data });
          getActions().getTraerUsuario();
          console.log(data);
      } catch (error) {
          console.error("Error al editar usuario", error);
      }
  },

      getDeleteUser: async (navigate) => {
        const store = getStore();
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/users/${store.userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.token}`
                }
            });
    
            if (response.status !== 200) {
                throw new Error("Error al eliminar usuario");
            }
    
            const data = await response.json(data);
            setStore({ token: "", userId: ""});
            console.log(store);
            navigate(`/`);
        } catch (error) {
            console.error("Error al eliminar el usuario", error);
        }
    },


        getCrearLista: async (name) => {
          const store = getStore();
          const token = store.token;
      
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${token}`);
      
          const raw = JSON.stringify({
              name: name
          });
      
          const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
          };
      
          fetch(`${process.env.BACKEND_URL}/api/lists`, requestOptions)
              .then((response) => response.json())
              .then((result) => {
                setStore({ listas: [...store.listas, result] });
                getActions().getTraerUsuario();
              })
              .catch((error) => console.error(error));
      },
        
      getAñadirParticipante: async (email) => {
        const store = getStore();
        const token = store.token;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
            email: email
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`${process.env.BACKEND_URL}/api/lists/${store.listas}/share`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              setStore({ listas: store.listas.map(lista => lista.id === store.listas.id ? result : lista) });
            })
            .catch((error) => console.error(error));
    },

    getEditarLista: async (id, name) => {
      const store = getStore();
      const token = store.token;
      console.log(`Editing list with ID: ${id}`);
  
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      const raw = JSON.stringify({
          name: name
      });
  
      const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
      };
  
      fetch(`${process.env.BACKEND_URL}/api/lists/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
              setStore({
                  listas: store.listas.map(lista => lista.id === id ? result.list : lista)
              });
              getActions().getTraerUsuario();
          })
          .catch((error) => console.error(error));
  },

    getEliminarLista: async (id) => {
      const store = getStore();
      const token = store.token;
  
      try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/lists/${id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          });
  
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const updatedLists = store.listas.filter(lista => lista.id !== id);
          setStore({ listas: updatedLists });
          getActions().getTraerUsuario();
  
          const data = await response.json();
          console.log('List deleted:', data);
      } catch (error) {
          console.error('Error deleting list:', error);
      }
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
