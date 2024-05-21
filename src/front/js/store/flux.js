import { useNavigate } from "react-router-dom";


const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      usuario: {},
      lista: {},
      listas: [],
      userId: {},
      token: "",
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
        navigate("/login");
      },



      getInfoUser: async () => {
        const uid = getStore().userId;
        if (!uid) return;
        fetch(`${process.env.BACKEND_URL}/api/users/${uid}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getStore().token}`,
          },
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setStore({ usuario: result });
          })
          .catch((error) => console.log("error", error));
      },

      getCrearLista: async (name) => {
        console.log(name);
        const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxOVUvWi4TCs7XIbJP1uHqhIvTU-rYsOeG0-Xl_GIOZm1W5nEqoiIYeEsHpC_BD2IpM-7kM_BT17nf0sb_690YiP9sOfsKECJFqprFL8oYl4uyDNEWLpwdXzEFj44Tgkb-vRccwfsSvh1WOe4N1USGKharXXv3OHM7W6RkdfyM2de203LBGgRI7npFHw1md5vzJwXaZzOgPXeuFJ6g5uPcde09Stl_tKSgG1TYj1egMCpGsMK8bgNNjAd3VtmAZqBniKwY9iSTw2REiF-d-l61DyKPziZiH6sWrQ9m-FTRjqJTrj_0U8uFJV4UPJo8Ft1I1AafTmbvRA8cjX3Ro-2ig1AM-hhPSYwvhyok7ldbiHKy6zdmnovjEG7HJWIhq4o8tllQIqSFOVz64lHwv9FKnPhGMD7OONSiHWrtu_L4fHqi_-YQWfVWCFYahz2Gac0oCFa4O21d4U9P7J-ytG5w1wdpqqe3Tb9ZmXSLpWJd3jPgkJKRBwdxz9qadwRPSWX43oAsfwY3uIHIvEFoVxlwFP1a_5OhcyZIrHhZWIbVI9jp6zv-Zjdy2HWNVa4nlzRSbx9kptL20iyYgqiZp5llu9cdXyWxcROUYTELvtN8Yid2v88C3WzwrGOyPgV9-GV9mevA9BIq_xyVKqGbbA75rwP0wGX0LGQAPimp8GWBXBJu3il9G5tYGRkPdfioJ07Puono234GwaKINnFhCWJL-dOmtrsaCaTuYcgGa-D-3bsqpFDLrwAL8VSoKj3jHm8MftzJgj1EKxj_bqOXzF_UQWklL-O8ekYnNP18MDB7Ti4ScQue7hVnqr0B11yE8-Z77mDmwHHNi4_YN_aPXnvKJyQkehcKIQ4aEsaIiO-C-r3WixdYQcX2-ENps6GWhaIzvHKFKCpilbDzkuM03BqJ-j9uNfWwHYfaNJJUr34aJpW8ZnBS2KWl4jeJKSJ5Z6pQxkoSiQgi1Jw3-Q0YKIgXB1");

          const raw = JSON.stringify({
            "name": name,
           /*  "user_id": id */
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };

          fetch(`https://psychic-space-carnival-x55p5rqv6wvxc6gr7-3001.app.github.dev/api/lists/${store.userId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => setStore({ lista: result }))
            .catch((error) => console.error(error));
        },
      
      getEditarLista: async (name, id) => {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxOxFN2xCLzezeysRm58pcuqpRyd-s4cgh7oMXb2F-OfCL1Z8rFeBzvEKMOBT2ARYH2gFBMV0-IanG5fjU8yhd6pRg_oWOr9FOhfSuGPkkZAY0tEQrra-wJ7ZLfRItKpQaPkxxWENcuhTeQXPNX3xNNEVmE7FqlwpPwj0hYkzJcv9rpY1CnsO1O0bkkVRhSQtnL0gkrRF_cTSjDfSrr_gN1dlJqf70-7paD4MktWANf-U3DTl2i5C75urqmEhr0Pj9L3VPu9bJ6JE7QGLADHRz8lpbkVT8OjZBWZrjzXf6jjOAcuVNujdN1-z04ajWvN5SdfK6lz4Swx8bNhaZRsNn0AmsEhhNpU01Wml4bEkGAuOvLTDTIFc8eDGCaT0ufIwAJIRxa6mfyCm25XNCty8VuTNpme_ekDty-E7kGbN_WTSoDgtrakqMJwH-2rYRxB_3x1EOEwujUGbi8FeOTblYORGQBFyt7w6oJ3YKksjNRQgCz0FqUwtJqITfvjvK5c1Z5Un3T1wVsXW0FmVkWLyHTtg-Yc8eX8DzM-Lt5Kw-a8WIBXQbH0dbSYXrBek9-dCRkaWjaXOMjX1cU__J0OHwoWoiGge5CRxr0yuDWFx0iJCbM63hMEsU10agplivie8Rhp5eOyDaWjSmUJqbcPRto9PMGsmQF6SYe29MRLx4XZkvVHT-DdquzYY94nXne0M-uRDIglfq0CH0JNinv3Nv4i8OXt7T2v5u_tzYqnILtrmeDrjCV1YrxWmsyqfg7HJbXSrzaNZekdzqccaMckK5GSa5vSMcx53Tyl6STJYlmKOLLKNV0TmMm8ln0T_TGPAfwtN9Stds537q8fzCec1rbFPE3jYhxynhsBYFqZjeSLNBVKQ-7-0mbIiMKzLPz114jdS2T0uCNN2Oqj3BzWl0YRIrMxxhR0HhqgdBYW6RMBxMJ-o6RSf6sZLEAzzlWFy0lKD3lCFICG5vyCHqFxpXyB");

            const raw = JSON.stringify({
              "name": name
            });

            const requestOptions = {
              method: "PUT",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
            };

            fetch(`https://psychic-space-carnival-x55p5rqv6wvxc6gr7-3001.app.github.dev/api/lists/${store.lista}`, requestOptions)
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
